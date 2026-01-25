import { useState } from 'react'
import { Monitor, Server, LayoutGrid, ListTodo, ChevronLeft, ChevronRight, X } from 'lucide-react'

const screenshots = [
  {
    id: 'nodes',
    title: 'Node Management',
    description: 'Real-time cluster monitoring and control. View system resources, manage nodes, and monitor cluster health.',
    image: '/screenshot-nodes.png',
    icon: Server
  },
  {
    id: 'guests',
    title: 'Guest Management',
    description: 'Complete VM and container operations. Start, stop, migrate, and manage all your guests.',
    image: '/screenshot-guests.png',
    icon: Monitor
  },
  {
    id: 'global-menu',
    title: 'Global Menu',
    description: 'Access profile management, plugins, and global settings from the global menu.',
    image: '/screenshot-global-menu.png',
    icon: LayoutGrid
  },
  {
    id: 'tasks',
    title: 'Task Management',
    description: 'Monitor active tasks, view task history, and manage background operations.',
    image: '/screenshot-tasks.png',
    icon: ListTodo
  }
]

export function Screenshots() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const nextScreenshot = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevScreenshot = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section id="screenshots" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Screenshots
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See pvetui in action. A beautiful terminal interface that makes managing 
            your Proxmox infrastructure a breeze.
          </p>
        </div>
        
        {/* Main Screenshot Display */}
        <div className="relative mb-8">
          <div className="terminal-window overflow-hidden">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground ml-4">
                {screenshots[activeIndex].title}
              </span>
            </div>
            <div 
              className="relative cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={screenshots[activeIndex].image}
                alt={screenshots[activeIndex].title}
                className="w-full h-auto transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium">
                  Click to enlarge
                </span>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevScreenshot}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextScreenshot}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Screenshot Thumbnails */}
        <div className="flex justify-center gap-4 mb-8">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              onClick={() => setActiveIndex(index)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === index
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={screenshot.image}
                alt={screenshot.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        
        {/* Description */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            {(() => {
              const IconComponent = screenshots[activeIndex].icon
              return <IconComponent className="w-5 h-5 text-primary" />
            })()}
            <h3 className="text-xl font-semibold text-foreground">
              {screenshots[activeIndex].title}
            </h3>
          </div>
          <p className="text-muted-foreground">
            {screenshots[activeIndex].description}
          </p>
        </div>
        
        {/* Demo GIF */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold mb-8">
            <span className="gradient-text">Live Demo</span>
          </h3>
          <div className="terminal-window max-w-4xl mx-auto">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground ml-4">pvetui demo</span>
            </div>
            <div className="terminal-content p-0">
              <img
                src="/demo.gif"
                alt="pvetui demo"
                className="w-full h-auto rounded-b-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevScreenshot() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextScreenshot() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={screenshots[activeIndex].image}
            alt={screenshots[activeIndex].title}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
