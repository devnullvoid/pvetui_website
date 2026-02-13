import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  path?: string
  type?: string
  noIndex?: boolean
}

const DOMAIN = import.meta.env.VITE_CANONICAL_URL || 'https://pvetui.org'
const OG_IMAGE = import.meta.env.VITE_OG_IMAGE || '/social-card.png'

export function SEO({ title, description, path = '', type = 'website', noIndex = false }: SEOProps) {
  const baseUrl = DOMAIN.replace(/\/+$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${baseUrl}${path ? normalizedPath : ''}`
  const ogImageUrl = OG_IMAGE.startsWith('http') ? OG_IMAGE : `${baseUrl}${OG_IMAGE.startsWith('/') ? OG_IMAGE : `/${OG_IMAGE}`}`
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
    setMeta('meta[name="robots"]', { name: 'robots' }, noIndex ? 'noindex, nofollow' : 'index, follow')

    setMeta('meta[property="og:url"]', { property: 'og:url' }, url)
    setMeta('meta[property="og:type"]', { property: 'og:type' }, type)
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'PVETUI')
    setMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    setMeta('meta[property="og:image"]', { property: 'og:image' }, ogImageUrl)

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, ogImageUrl)
  }, [fullTitle, description, url, type, noIndex, ogImageUrl])

  return null
}
