import { Github, Terminal, Menu, X, BookOpen, Home } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  activeSection?: string
}

const homeNavItems = [
  { id: 'hero', label: 'Home', href: '/#hero' },
  { id: 'features', label: 'Features', href: '/#features' },
  { id: 'installation', label: 'Install', href: '/#installation' },
  { id: 'screenshots', label: 'Screenshots', href: '/#screenshots' },
]

const docsNavItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'config', label: 'Config', href: '/docs#config' },
  { id: 'usage', label: 'Usage', href: '/docs#usage' },
  { id: 'theming', label: 'Themes', href: '/docs#theming' },
  { id: 'plugins', label: 'Plugins', href: '/docs#plugins' },
]

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  // Reset scroll when navigating to docs page
  useEffect(() => {
    if (location.pathname === '/docs') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  const navItems = isHomePage ? homeNavItems : docsNavItems

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-primary group-hover:terminal-glow transition-all" />
            <span className="text-xl font-bold">
              <span className="text-primary">pve</span>
              <span className="text-foreground">tui</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {item.label}
              </a>
            ))}
            <Link
              to={isHomePage ? "/docs" : "/"}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                (isHomePage && location.pathname === '/docs') || (!isHomePage && location.pathname === '/')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {isHomePage ? (
                <>
                  <BookOpen className="w-4 h-4 mr-1 inline" />
                  Documentation
                </>
              ) : (
                <>
                  <Home className="w-4 h-4 mr-1 inline" />
                  Home
                </>
              )}
            </Link>
          </div>

          {/* GitHub Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <a
                href="https://github.com/devnullvoid/pvetui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <span className="text-xs text-muted-foreground">549 ★</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to={isHomePage ? "/docs" : "/"}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  (isHomePage && location.pathname === '/docs') || (!isHomePage && location.pathname === '/')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {isHomePage ? (
                  <>
                    <BookOpen className="w-4 h-4 mr-1 inline" />
                    Documentation
                  </>
                ) : (
                  <>
                    <Home className="w-4 h-4 mr-1 inline" />
                    Home
                  </>
                )}
              </Link>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mt-2 border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                <a
                  href="https://github.com/devnullvoid/pvetui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
