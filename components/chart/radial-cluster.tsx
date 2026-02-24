"use client";

import * as d3 from "d3";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Node {
  name: string;
  children?: Node[];
}

// --- Style interfaces ---

export interface NodeStyle {
  fill?: string;
  stroke?: string;
  r?: number;
  strokeWidth?: number;
  className?: string;
}

export interface ConnectorStyle {
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  className?: string;
}

// --- Default styles ---

const DEFAULT_NODE_STYLE: NodeStyle = {
  fill: "#f0a946",
  stroke: "white",
  r: 5,
  strokeWidth: 1.5,
};

const DEFAULT_CONNECTOR_STYLE: ConnectorStyle = {
  stroke: "#d08a20",
  strokeOpacity: 0.4,
  strokeWidth: 1.5,
};

// --- Context ---

interface RadialClusterContextValue {
  data: Node[];
  size: number;
  radius: number;
  styles: {
    rootNode: NodeStyle;
    innerRing: NodeStyle;
    outerRing: NodeStyle;
    leafNode: NodeStyle;
    branchConnector: ConnectorStyle;
  };
  mergeNodeStyle: (key: "rootNode" | "innerRing" | "outerRing" | "leafNode", style: Partial<NodeStyle>) => void;
  mergeConnectorStyle: (style: Partial<ConnectorStyle>) => void;
}

const RadialClusterContext = createContext<RadialClusterContextValue | null>(null);

// --- buildDataFromItems ---

function buildNodeFromChild(
  child: React.ReactElement,
  ItemComponent: React.ComponentType<{ name: string; children?: React.ReactNode }>,
  SubItemComponent: React.ComponentType<{ name: string; children?: React.ReactNode }>
): Node | null {
  if (child.type === ItemComponent || child.type === SubItemComponent) {
    const props = child.props as { name: string; children?: React.ReactNode };
    const { name } = props;
    const childChildren = React.Children.toArray(props.children);
    const children = childChildren
      .map((c) => buildNodeFromChild(c as React.ReactElement, ItemComponent, SubItemComponent))
      .filter((n): n is Node => n !== null);
    return { name, children: children.length > 0 ? children : undefined };
  }
  return null;
}

function buildDataFromItems(
  children: React.ReactNode,
  ItemComponent: React.ComponentType<{ name: string; children?: React.ReactNode }>,
  SubItemComponent: React.ComponentType<{ name: string; children?: React.ReactNode }>
): Node[] {
  const arr = React.Children.toArray(children);
  const rootNode = arr
    .map((c) => buildNodeFromChild(c as React.ReactElement, ItemComponent, SubItemComponent))
    .find((n): n is Node => n !== null);
  return rootNode ? [rootNode] : [];
}

function hasItemChildren(
  children: React.ReactNode,
  ItemComponent: React.ComponentType<{ name: string; children?: React.ReactNode }>,
  SubItemComponent: React.ComponentType<{ name: string; children?: React.ReactNode }>
): boolean {
  return React.Children.toArray(children).some(
    (c) =>
      React.isValidElement(c) &&
      (c.type === ItemComponent || c.type === SubItemComponent)
  );
}

function hasChartChild(
  children: React.ReactNode,
  ChartComponent: React.ComponentType
): boolean {
  return React.Children.toArray(children).some(
    (c) => React.isValidElement(c) && c.type === ChartComponent
  );
}

// --- Subcomponents ---

interface RadialClusterItemProps {
  name: string;
  children?: React.ReactNode;
}

function RadialClusterItem(_props: RadialClusterItemProps) {
  return null;
}

function RadialClusterSubItem(_props: RadialClusterItemProps) {
  return null;
}

function RadialClusterRootNode(props: Partial<NodeStyle>) {
  const ctx = useContext(RadialClusterContext);
  useEffect(() => {
    ctx?.mergeNodeStyle("rootNode", props);
  }, [ctx, props.fill, props.stroke, props.r, props.strokeWidth, props.className]);
  return null;
}

function RadialClusterInnerRing(props: Partial<NodeStyle>) {
  const ctx = useContext(RadialClusterContext);
  useEffect(() => {
    ctx?.mergeNodeStyle("innerRing", props);
  }, [ctx, props.fill, props.stroke, props.r, props.strokeWidth, props.className]);
  return null;
}

function RadialClusterOuterRing(props: Partial<NodeStyle>) {
  const ctx = useContext(RadialClusterContext);
  useEffect(() => {
    ctx?.mergeNodeStyle("outerRing", props);
  }, [ctx, props.fill, props.stroke, props.r, props.strokeWidth, props.className]);
  return null;
}

function RadialClusterLeafNode(props: Partial<NodeStyle>) {
  const ctx = useContext(RadialClusterContext);
  useEffect(() => {
    ctx?.mergeNodeStyle("leafNode", props);
  }, [ctx, props.fill, props.stroke, props.r, props.strokeWidth, props.className]);
  return null;
}

function RadialClusterBranchConnector(props: Partial<ConnectorStyle>) {
  const ctx = useContext(RadialClusterContext);
  useEffect(() => {
    ctx?.mergeConnectorStyle(props);
  }, [ctx, props.stroke, props.strokeOpacity, props.strokeWidth, props.className]);
  return null;
}

// --- Chart ---

function RadialClusterChart() {
  const ctx = useContext(RadialClusterContext);
  const ref = useRef<SVGSVGElement | null>(null);
  const isMobile = useIsMobile();

  const { data, size, radius, styles } = ctx ?? {
    data: [],
    size: 900,
    radius: 450,
    styles: {
      rootNode: DEFAULT_NODE_STYLE,
      innerRing: DEFAULT_NODE_STYLE,
      outerRing: DEFAULT_NODE_STYLE,
      leafNode: DEFAULT_NODE_STYLE,
      branchConnector: DEFAULT_CONNECTOR_STYLE,
    },
  };

  const getNodeStyle = useCallback(
    (d: d3.HierarchyPointNode<Node>): NodeStyle => {
      const { rootNode, innerRing, outerRing, leafNode } = styles;
      const isLeaf = !d.children || d.children.length === 0;
      if (d.depth === 0) return { ...DEFAULT_NODE_STYLE, ...rootNode };
      if (d.depth === 1) return { ...DEFAULT_NODE_STYLE, ...innerRing };
      if (d.depth === 2) return { ...DEFAULT_NODE_STYLE, ...outerRing };
      if (isLeaf) return { ...DEFAULT_NODE_STYLE, ...leafNode };
      return { ...DEFAULT_NODE_STYLE, ...outerRing };
    },
    [styles]
  );

  useEffect(() => {
    if (!data?.length || isMobile) return;

    const svg = d3.select(ref.current);
    if (!svg.node()) return;
    svg.selectAll("*").remove();

    const root = d3.hierarchy<Node>(data[0]);
    const cluster = d3.cluster<Node>().size([2 * Math.PI, radius - 60]);
    const clusterData = cluster(root);

    const project = (d: d3.HierarchyPointNode<Node>) => {
      const r = d.depth * (radius / 4);
      const a = d.x - Math.PI / 1;
      return [r * Math.cos(a), r * Math.sin(a)];
    };

    const connectorStyle = { ...DEFAULT_CONNECTOR_STYLE, ...styles.branchConnector };

    svg
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`)
      .selectAll("path")
      .data(clusterData.links())
      .join("path")
      .attr("d", (d: d3.HierarchyPointLink<Node>) => {
        const source = project(d.source) as [number, number];
        const target = project(d.target) as [number, number];
        return d3.line().curve(d3.curveBumpX)([source, target] as [
          number,
          number
        ][]);
      })
      .attr("fill", "none")
      .attr("stroke", connectorStyle.stroke ?? "none")
      .attr("stroke-opacity", connectorStyle.strokeOpacity ?? 1)
      .attr("stroke-width", connectorStyle.strokeWidth ?? 1)
      .attr("class", connectorStyle.className ?? "");

    const nodes = svg
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`)
      .selectAll<SVGGElement, d3.HierarchyPointNode<Node>>("g")
      .data(clusterData.descendants())
      .join("g")
      .attr("transform", (d: d3.HierarchyPointNode<Node>) => `translate(${project(d)})`);

    nodes.each(function (this: SVGGElement, d: d3.HierarchyPointNode<Node>) {
      const style = getNodeStyle(d);
      const g = d3.select<SVGGElement, d3.HierarchyPointNode<Node>>(this);
      g.append("circle")
        .attr("r", style.r ?? 5)
        .attr("fill", style.fill ?? "currentColor")
        .attr("stroke", style.stroke ?? "white")
        .attr("stroke-width", style.strokeWidth ?? 1.5)
        .attr("class", style.className ?? "");
      g.append("text")
        .attr("dy", (n: d3.HierarchyPointNode<Node>) => (n.x > Math.PI ? "1.5em" : "-1.5em"))
        .attr("text-anchor", "middle")
        .text((n: d3.HierarchyPointNode<Node>) => n.data.name)
        .style("text-align", "center");
    });
  }, [data, size, radius, styles, getNodeStyle, isMobile]);

  if (isMobile) return null;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      className="mx-auto text-foreground *:fill-foreground *:text-md"
    />
  );
}

// --- Root ---

interface RadialClusterRootProps {
  data?: Node[];
  size?: number;
  radius?: number;
  className?: string;
  children?: React.ReactNode;
}

function RadialClusterRoot({
  data: dataProp,
  size = 900,
  radius: radiusProp,
  className,
  children,
}: RadialClusterRootProps) {
  const radius = radiusProp ?? size / 2;
  const hasItems = children ? hasItemChildren(children, RadialClusterItem, RadialClusterSubItem) : false;
  const dataFromItems = children
    ? buildDataFromItems(children, RadialClusterItem, RadialClusterSubItem)
    : [];
  const data = hasItems && dataFromItems.length > 0 ? dataFromItems : dataProp ?? [];
  const needsChart = !children || !hasChartChild(children, RadialClusterChart);

  const [styles, setStyles] = useState({
    rootNode: DEFAULT_NODE_STYLE,
    innerRing: DEFAULT_NODE_STYLE,
    outerRing: DEFAULT_NODE_STYLE,
    leafNode: DEFAULT_NODE_STYLE,
    branchConnector: DEFAULT_CONNECTOR_STYLE,
  });

  const mergeNodeStyle = useCallback(
    (key: "rootNode" | "innerRing" | "outerRing" | "leafNode", style: Partial<NodeStyle>) => {
      setStyles((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...style },
      }));
    },
    []
  );

  const mergeConnectorStyle = useCallback((style: Partial<ConnectorStyle>) => {
    setStyles((prev) => ({
      ...prev,
      branchConnector: { ...prev.branchConnector, ...style },
    }));
  }, []);

  const contextValue = useMemo<RadialClusterContextValue>(
    () => ({
      data,
      size,
      radius,
      styles,
      mergeNodeStyle,
      mergeConnectorStyle,
    }),
    [data, size, radius, styles, mergeNodeStyle, mergeConnectorStyle]
  );

  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <RadialClusterContext.Provider value={contextValue}>
      <div
        className={cn(
          "overflow-hidden flex justify-center items-center",
          className
        )}
      >
        {children}
        {needsChart && <RadialClusterChart />}
      </div>
    </RadialClusterContext.Provider>
  );
}

// --- Export compound component ---

RadialClusterRoot.Item = RadialClusterItem;
RadialClusterRoot.SubItem = RadialClusterSubItem;
RadialClusterRoot.Chart = RadialClusterChart;
RadialClusterRoot.RootNode = RadialClusterRootNode;
RadialClusterRoot.InnerRing = RadialClusterInnerRing;
RadialClusterRoot.OuterRing = RadialClusterOuterRing;
RadialClusterRoot.LeafNode = RadialClusterLeafNode;
RadialClusterRoot.BranchConnector = RadialClusterBranchConnector;

export const RadialCluster = RadialClusterRoot;
