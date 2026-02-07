import { useEffect } from 'react'

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

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (selector: string, attrs: Record<string, string>, content?: string) => {
      const existing = document.head.querySelector<HTMLMetaElement>(selector)
      if (!content) {
        if (existing) existing.remove()
        return
      }
      const meta = existing ?? document.createElement('meta')
      Object.entries(attrs).forEach(([key, value]) => meta.setAttribute(key, value))
      meta.setAttribute('content', content)
      if (!existing) document.head.appendChild(meta)
    }

    const setLink = (selector: string, attrs: Record<string, string>, href: string) => {
      const existing = document.head.querySelector<HTMLLinkElement>(selector)
      const link = existing ?? document.createElement('link')
      Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value))
      link.setAttribute('href', href)
      if (!existing) document.head.appendChild(link)
    }

    setMeta('meta[name="description"]', { name: 'description' }, description)
    setLink('link[rel="canonical"]', { rel: 'canonical' }, url)

    setMeta('meta[property="og:url"]', { property: 'og:url' }, url)
    setMeta('meta[property="og:type"]', { property: 'og:type' }, type)
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'PVETUI')
    setMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
  }, [fullTitle, description, url, type])

  return null
}
