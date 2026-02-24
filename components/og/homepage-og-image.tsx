/**
 * Satori-compatible OG image template mirroring the homepage Hero layout.
 * Uses only inline styles (no Tailwind); flexbox-only layout.
 */
type HomepageOgImageProps = {
  title: string;
  description: string;
  ctaText?: string;
};

export function HomepageOgImage({
  title,
  description,
  ctaText = "Components",
}: HomepageOgImageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        backgroundColor: "#f4f4f5",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: "-0.025em",
          lineHeight: 1,
          textTransform: "uppercase",
          color: "#1a1a1a",
          textAlign: "center",
          margin: 0,
          marginBottom: 24,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 18,
          color: "#6b6b6b",
          textAlign: "center",
          maxWidth: 520,
          margin: 0,
          marginBottom: 28,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 16,
          fontWeight: 500,
          color: "#1a1a1a",
        }}
      >
        <span>{ctaText}</span>
        <span style={{ fontSize: 18 }}>→</span>
      </div>
    </div>
  );
}
