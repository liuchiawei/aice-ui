"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UsagePropRow } from "@/lib/component-config";

export type { UsagePropRow };

interface UsageSectionProps {
  rows?: UsagePropRow[];
}

export function UsageSection({ rows = [] }: UsageSectionProps) {
  const t = useTranslations("ComponentPage");
  const tComponents = useTranslations("Components");
  const showItemColumn = rows.length > 0 && rows.some((row) => row.item != null);

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-6">
      <h2 className="text-lg font-bold">{t("usage.title")}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {t("usage.description")}
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {showItemColumn && (
                <TableHead>{t("usage.table.item")}</TableHead>
              )}
              <TableHead>{t("usage.table.prop")}</TableHead>
              <TableHead>{t("usage.table.type")}</TableHead>
              <TableHead>{t("usage.table.default")}</TableHead>
              <TableHead className="min-w-[12rem]">{t("usage.table.description")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={`${row.item ?? ""}-${row.name}`}>
                {showItemColumn && (
                  <TableCell className="font-mono text-xs">
                    {row.item ?? "—"}
                  </TableCell>
                )}
                <TableCell className="font-mono text-xs">{row.name}</TableCell>
                <TableCell className="font-mono text-xs">{row.type}</TableCell>
                <TableCell className="font-mono text-xs">
                  {row.default ?? "—"}
                </TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">
                  {row.descriptionKey
                    ? tComponents(row.descriptionKey)
                    : (row.description ?? "—")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
