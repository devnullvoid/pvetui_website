import { Puzzle, Settings, Terminal, Download, Code, Users, FileCode, BookOpen } from 'lucide-react'

const plugins = [
  {
    id: 'community-scripts',
    name: 'Community Scripts',
    description: 'Adds the popular Proxmox Community Scripts installer to node context menus. Easily install applications and services with curated community scripts.',
    icon: Download,
    category: 'Utility',
    enabledByDefault: false,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  {
    id: 'command-runner',
    name: 'Command Runner',
    description: 'Execute whitelisted commands on Proxmox hosts via SSH. Requires SSH key setup for authentication. Perfect for automated maintenance tasks.',
    icon: Terminal,
    category: 'Automation',
    enabledByDefault: false,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10'
  },
  {
    id: 'demo-guest-list',
    name: 'Guest Insights',
    description: 'Enhanced guest management with full guest insights modal. Features advanced filtering, sorting, and quick jump-to-guest functionality.',
    icon: Settings,
    category: 'Management',
    enabledByDefault: false,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  }
]

const pluginApiExample = `package main

import (
    "github.com/devnullvoid/pvetui/pkg/plugin"
)

type MyPlugin struct {
    plugin.BasePlugin
}

func (p *MyPlugin) Init() error {
    // Initialize your plugin
    return nil
}

func (p *MyPlugin) Name() string {
    return "my-plugin"
}

func (p *MyPlugin) Description() string {
    return "My custom pvetui plugin"
}

// Register the plugin
func init() {
    plugin.Register(&MyPlugin{})
}`

export function Plugins() {
  return (
    <section id="plugins" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Plugin System
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Extend pvetui with powerful plugins. Opt-in extensions for enhanced functionality, 
            from community scripts to custom automation tools.
          </p>
        </div>
        
        {/* Built-in Plugins */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="gradient-text">Built-in Plugins</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((plugin) => (
              <div key={plugin.id} className="feature-card group">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${plugin.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <plugin.icon className={`w-6 h-6 ${plugin.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{plugin.name}</h4>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {plugin.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {plugin.description}
                </p>
                <div className="flex items-center justify-between">
                  <code className="text-xs text-cyan-400 font-mono">{plugin.id}</code>
                  <span className={`text-xs ${plugin.enabledByDefault ? 'text-green-400' : 'text-yellow-400'}`}>
                    {plugin.enabledByDefault ? 'Enabled by default' : 'Disabled by default'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enabling Plugins */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Enabling Plugins</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Plugins are disabled by default and must be explicitly enabled. Choose your preferred method:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Method 1: UI Dialog (Recommended)</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Press <span className="kbd">g</span> to open the Global Menu</li>
                  <li>2. Select <span className="text-cyan-400">Manage Plugins</span></li>
                  <li>3. Navigate with arrow keys or <span className="kbd">j</span>/<span className="kbd">k</span></li>
                  <li>4. Press <span className="kbd">Space</span> to toggle plugins on/off</li>
                  <li>5. Press <span className="kbd">Enter</span> to save changes</li>
                  <li>6. Restart pvetui for changes to take effect</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Method 2: Configuration File</h4>
                <pre className="code-block text-xs">
                  <code>{`plugins:
  enabled:
    - "community-scripts"
    - "command-runner"
    - "demo-guest-list"`}</code>
                </pre>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold">Plugin Requirements</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-400" />
                  Community Scripts
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• No additional requirements</li>
                  <li>• Integrates with Proxmox Community Scripts repository</li>
                  <li>• Access via node context menus</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Command Runner
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SSH key-based authentication required</li>
                  <li>• Commands must be whitelisted in config</li>
                  <li>• Configure allowed commands securely</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-400" />
                  Guest Insights
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• No additional requirements</li>
                  <li>• Enhanced guest list with filtering</li>
                  <li>• Quick jump to any guest by name or ID</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Plugin Development */}
        <div className="feature-card">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-orange-400" />
            <h3 className="text-2xl font-semibold">Plugin Development</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                Build your own pvetui plugins with the Go plugin API. Create powerful extensions 
                that integrate seamlessly with the TUI interface.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Simple Go interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Full TUI integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Puzzle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Event-driven architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Config and keybinding support</span>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="https://github.com/devnullvoid/pvetui/blob/master/docs/PLUGINS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Read Plugin Development Guide</span>
                </a>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-4">Basic plugin structure:</p>
              <pre className="code-block text-xs">
                <code>{pluginApiExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
