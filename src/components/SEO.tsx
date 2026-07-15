import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
  type?: "website" | "article";
}

/**
 * Componente central de SEO — define título, meta description, OG e JSON-LD.
 * Use uma vez por página, no topo do JSX.
 */
export function SEO({
  title,
  description,
  canonical,
  image,
  jsonLd,
  type = "website",
}: SEOProps) {
  const fullTitle = title.includes("Viva Leve") ? title : `${title} | Viva Leve`;
  const url =
    canonical ??
    (typeof window !== "undefined" ? window.location.href : "https://vivaleve.app");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
