import { Github, Terminal, Heart, Coffee, ExternalLink, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    title: 'Documentation',
    links: [
      { label: 'Installation', href: '/#installation' },
      { label: 'Configuration', href: '/docs#config' },
      { label: 'Usage Guide', href: '/docs#usage' },
      { label: 'Theming', href: '/docs#theming' },
      { label: 'Plugins', href: '/docs#plugins' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/devnullvoid/pvetui', external: true },
      { label: 'Releases', href: 'https://github.com/devnullvoid/pvetui/releases', external: true },
      { label: 'Issues & Bugs', href: 'https://github.com/devnullvoid/pvetui/issues', external: true },
      { label: 'Contributing', href: 'https://github.com/devnullvoid/pvetui/blob/master/CONTRIBUTING.md', external: true },
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Sponsor Project', href: 'https://github.com/sponsors/devnullvoid', external: true },
      { label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/devnullvoid', external: true },
      { label: 'Ko-fi', href: 'https://ko-fi.com/devnullvoid', external: true },
    ]
  }
]

import { useGithubStats } from '@/hooks/use-github-stats'

export function Footer() {
  const { stars, totalReleases, contributors, language } = useGithubStats()
  const shareUrl = 'https://pvetui.org'
  const shareText = 'Check out pvetui - a terminal UI for Proxmox VE'

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'pvetui',
          text: shareText,
          url: shareUrl,
        })
        return
      }

      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      toast.success('Share link copied to clipboard')
    } catch {
      toast.error('Unable to share right now')
    }
  }

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">
                <span className="text-primary">pve</span>
                <span className="text-foreground">tui</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A powerful Terminal User Interface for Proxmox Virtual Environment.
              Manage your infrastructure from the comfort of your terminal.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>by</span>
              <a
                href="https://github.com/devnullvoid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline whitespace-nowrap"
              >
                Jon Rogers (devnullvoid)
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 py-8 border-y border-border/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stars}</div>
            <div className="text-xs text-muted-foreground">GitHub Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalReleases}</div>
            <div className="text-xs text-muted-foreground">Releases</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{contributors}</div>
            <div className="text-xs text-muted-foreground">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{language}</div>
            <div className="text-xs text-muted-foreground">Primary Language</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold mb-4">Enjoying pvetui?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Consider supporting the project to help fund development and new features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <a
                href="https://github.com/sponsors/devnullvoid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Sponsor on GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <a
                href="https://buymeacoffee.com/devnullvoid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                Buy Me a Coffee
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <a
                href="https://ko-fi.com/devnullvoid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Ko-fi
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/devnullvoid/pvetui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View pvetui on GitHub"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://mastodon.social/@devnullvoid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Follow devnullvoid on Mastodon"
              title="Mastodon"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.43 7.17c0-4.06-2.67-5.25-2.67-5.25C17.42 1.3 15.14 1 12.02 1h-.05c-3.12 0-5.4.3-6.74.92 0 0-2.66 1.19-2.66 5.25 0 .93-.02 2.04.01 3.2.11 3.91.72 7.77 4.33 8.72 1.66.43 3.09.52 4.25.46 2.1-.12 3.28-.77 3.28-.77l-.07-1.54s-1.5.47-3.19.41c-1.67-.06-3.43-.18-3.71-2.2a4.2 4.2 0 0 1-.04-.56s1.64.4 3.72.5c1.27.06 2.46-.08 3.67-.22 2.32-.27 4.33-1.66 4.59-2.93.42-2.07.39-5.05.39-5.05Zm-3.18 5.16h-1.86V7.8c0-.96-.4-1.45-1.2-1.45-.88 0-1.32.57-1.32 1.7v2.48h-1.85V8.05c0-1.13-.44-1.7-1.32-1.7-.8 0-1.2.49-1.2 1.45v4.53H7.63V7.66c0-.96.24-1.72.72-2.29.5-.56 1.14-.86 1.93-.86.92 0 1.62.35 2.08 1.06l.45.75.45-.75c.46-.71 1.16-1.06 2.08-1.06.79 0 1.43.3 1.93.86.48.57.72 1.33.72 2.29v4.67Z" />
              </svg>
            </a>
            <a
              href="https://bsky.app/profile/dev-nullvoid.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Follow devnullvoid on Bluesky"
              title="Bluesky"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 600 530">
                <path d="M131.6 35.2C197.2 84 267.8 183 300 249.2 332.2 183 402.8 84 468.4 35.2c47.3-35.1 124-62.2 124 25.2 0 17.4-10 146.2-15.8 167.1-20.1 72.6-93.4 91.1-158.6 80l-12.6-2.2 12.6 2.2c95.2 16.4 119.4 70.6 67 124.8-99.6 102.9-143.1-25.8-154.3-58.8l-2.1-6.2-2.1 6.2c-11.2 33-54.7 161.7-154.3 58.8-52.4-54.2-28.2-108.4 67-124.8l12.6-2.2-12.6 2.2c-65.2 11.1-138.5-7.4-158.6-80C17.6 206.6 7.6 77.8 7.6 60.4c0-87.4 76.7-60.3 124-25.2Z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Share pvetui"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2025 pvetui. Not affiliated with Proxmox Server Solutions GmbH.</p>
            <p className="mt-1">
              Proxmox® is a registered trademark of Proxmox Server Solutions GmbH.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
