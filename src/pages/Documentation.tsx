import { Settings, Terminal, Palette, Puzzle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Configuration } from '@/sections/Configuration'
import { Usage } from '@/sections/Usage'
import { Theming } from '@/sections/Theming'
import { Plugins } from '@/sections/Plugins'
import { Link } from 'react-router-dom'
import { BackToTop } from '@/components/BackToTop'

export function Documentation() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="mb-12">
        <Button
          variant="ghost"
          asChild
          className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know to get started with pvetui. 
            From installation to advanced configuration and theming.
          </p>
        </div>
      </div>
      
      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <a
          href="#config"
          className="feature-card flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Configuration</h3>
            <p className="text-sm text-muted-foreground">Setup & profiles</p>
          </div>
        </a>
        
        <a
          href="#usage"
          className="feature-card flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Terminal className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Usage</h3>
            <p className="text-sm text-muted-foreground">Key bindings & commands</p>
          </div>
        </a>
        
        <a
          href="#theming"
          className="feature-card flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Palette className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Theming</h3>
            <p className="text-sm text-muted-foreground">Colors & styles</p>
          </div>
        </a>
        
        <a
          href="#plugins"
          className="feature-card flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-lg bg-green-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Puzzle className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Plugins</h3>
            <p className="text-sm text-muted-foreground">Extensions</p>
          </div>
        </a>
      </div>
      
      {/* Documentation Sections */}
      <section id="config" className="mb-24">
        <Configuration />
      </section>
      
      <section id="usage">
        <Usage />
      </section>
      
      <section id="theming">
        <Theming />
      </section>
      
      <section id="plugins">
        <Plugins />
      </section>
      
      <BackToTop />
    </div>
  )
}
