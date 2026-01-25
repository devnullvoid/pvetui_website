import { Github, Terminal, Heart, Coffee, ExternalLink, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>by</span>
              <a 
                href="https://github.com/devnullvoid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                devnullvoid
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
            <div className="text-2xl font-bold text-primary">549</div>
            <div className="text-xs text-muted-foreground">GitHub Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">31</div>
            <div className="text-xs text-muted-foreground">Releases</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">6</div>
            <div className="text-xs text-muted-foreground">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">Go</div>
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
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20pvetui%20-%20a%20terminal%20UI%20for%20Proxmox%20VE!%20https%3A//github.com/devnullvoid/pvetui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
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
