import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
  path?: string
  type?: string
}

const DOMAIN = import.meta.env.VITE_CANONICAL_URL || 'https://pvetui.org'

export function SEO({ title, description, path = '', type = 'website' }: SEOProps) {
  const url = `${DOMAIN}${path}`
  const fullTitle = path === '/' ? title : `${title} | PVETUI`

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="PVETUI" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
