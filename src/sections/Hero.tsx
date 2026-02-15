import { ArrowDown, Zap, Server, Terminal, Shield, Keyboard, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '10rem' }}>
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Version Badge */}
        <Badge 
          variant="outline" 
          className="mb-6 border-primary/30 text-primary bg-primary/5 px-3 py-1"
        >
          <Zap className="w-3 h-3 mr-1" />
          v1.0.18 - Lightning Fast
        </Badge>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-foreground">$ </span>
          <span className="text-primary terminal-glow">pvetui</span>
          <span className="terminal-cursor text-primary">_</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          A Terminal User Interface for{' '}
          <span className="text-primary font-semibold">Proxmox Virtual Environment</span>
        </p>
        
        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
          Manage your Proxmox VE cluster from the comfort of your terminal. 
          Complete VM, container, and node management with Vim-style navigation.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Multi-Profile Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-muted-foreground">API Token Auth</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Integrated SSH</span>
          </div>
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-muted-foreground">Vim Keybindings</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            <a href="#installation">
              <Terminal className="w-4 h-4 mr-2" />
              Get Started
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <Link to="/docs" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <a href="https://github.com/devnullvoid/pvetui" target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </Button>
        </div>
        
        {/* Screenshot Preview */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="terminal-window shadow-2xl shadow-primary/10">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground ml-4">pvetui - Node Management</span>
            </div>
            <div className="terminal-content p-0">
              <img
                src="/screenshot-nodes.png"
                alt="pvetui Node Management"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <a href="#features" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs mb-2">Explore Features</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
