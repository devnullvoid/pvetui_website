import { useState } from 'react'
import { Keyboard, Settings, Flag, Info, Power, Search, RefreshCw, Globe, Monitor, HelpCircle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const keyBindings = [
  { key: 'h/j/k/l', action: 'Navigate (Vim-style)', category: 'Navigation' },
  { key: '↑↓←→', action: 'Arrow key navigation', category: 'Navigation' },
  { key: 'Enter', action: 'Select/Confirm', category: 'Navigation' },
  { key: 'Alt+1/2/3', action: 'Switch views', category: 'Navigation' },
  { key: '[]', action: 'Previous/Next view', category: 'Navigation' },
  { key: '/', action: 'Search', category: 'Actions' },
  { key: 's', action: 'SSH Shell', category: 'Actions' },
  { key: 'v', action: 'VNC Console', category: 'Actions' },
  { key: 'm', action: 'Context Menu', category: 'Actions' },
  { key: 'g', action: 'Global Menu', category: 'Actions' },
  { key: 'a', action: 'Auto-refresh', category: 'Actions' },
  { key: '?', action: 'Help', category: 'System' },
  { key: 'q', action: 'Quit', category: 'System' },
  { key: 'Ctrl+C', action: 'Cancel/Exit', category: 'System' },
]

const commandLineFlags = [
  { flag: '--config, -c', description: 'Path to YAML config file', example: 'pvetui --config ~/my-config.yml' },
  { flag: '--profile, -p', description: 'Connection profile to use', example: 'pvetui --profile work' },
  { flag: '--no-cache, -n', description: 'Disable caching', example: 'pvetui --no-cache' },
  { flag: '--version, -v', description: 'Show version information', example: 'pvetui --version' },
  { flag: '--config-wizard, -w', description: 'Launch config wizard', example: 'pvetui --config-wizard' },
  { flag: '--addr', description: 'Proxmox API URL', example: 'pvetui --addr https://pve:8006' },
  { flag: '--user', description: 'Proxmox username', example: 'pvetui --user root' },
  { flag: '--password', description: 'Proxmox password', example: 'pvetui --password secret' },
  { flag: '--token-id', description: 'API token ID', example: 'pvetui --token-id mytoken' },
  { flag: '--token-secret', description: 'API token secret', example: 'pvetui --token-secret secret' },
  { flag: '--realm', description: 'Proxmox realm', example: 'pvetui --realm pam' },
  { flag: '--insecure', description: 'Skip TLS verification', example: 'pvetui --insecure' },
  { flag: '--ssh-user', description: 'SSH username', example: 'pvetui --ssh-user admin' },
  { flag: '--debug', description: 'Enable debug logging', example: 'pvetui --debug' },
]

const environmentVars = [
  { var: 'PVETUI_ADDR', description: 'Proxmox API URL' },
  { var: 'PVETUI_USER', description: 'Proxmox username' },
  { var: 'PVETUI_PASSWORD', description: 'Proxmox password' },
  { var: 'PVETUI_TOKEN_ID', description: 'API token ID' },
  { var: 'PVETUI_TOKEN_SECRET', description: 'API token secret' },
  { var: 'PVETUI_REALM', description: 'Proxmox realm' },
  { var: 'PVETUI_SSH_USER', description: 'SSH username' },
  { var: 'PVETUI_DEBUG', description: 'Enable debug mode' },
]

export function Usage() {
  const [activeTab, setActiveTab] = useState('keys')

  return (
    <section id="usage" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Usage & Key Bindings
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Master pvetui with intuitive Vim-style navigation and powerful command-line options. 
            Everything you need to efficiently manage your Proxmox infrastructure.
          </p>
        </div>
        
        {/* Usage Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            <TabsTrigger value="keys" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Keyboard className="w-4 h-4 mr-2" />
              Key Bindings
            </TabsTrigger>
            <TabsTrigger value="commands" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Flag className="w-4 h-4 mr-2" />
              Command Line
            </TabsTrigger>
            <TabsTrigger value="env" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Settings className="w-4 h-4 mr-2" />
              Environment
            </TabsTrigger>
            <TabsTrigger value="examples" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Info className="w-4 h-4 mr-2" />
              Examples
            </TabsTrigger>
          </TabsList>
          
          {/* Key Bindings Tab */}
          <TabsContent value="keys">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Navigation */}
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Navigation</h3>
                </div>
                <div className="space-y-3">
                  {keyBindings
                    .filter(k => k.category === 'Navigation')
                    .map((binding, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border/50">
                        <kbd className="font-mono text-sm text-foreground">{binding.key}</kbd>
                        <span className="text-sm text-muted-foreground">{binding.action}</span>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-6">
                  <Power className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold">Actions</h3>
                </div>
                <div className="space-y-3">
                  {keyBindings
                    .filter(k => k.category === 'Actions')
                    .map((binding, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border/50">
                        <kbd className="font-mono text-sm text-foreground">{binding.key}</kbd>
                        <span className="text-sm text-muted-foreground">{binding.action}</span>
                      </div>
                    ))}
                </div>
                
                <div className="flex items-center gap-3 mb-6 mt-8">
                  <HelpCircle className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold">System</h3>
                </div>
                <div className="space-y-3">
                  {keyBindings
                    .filter(k => k.category === 'System')
                    .map((binding, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border/50">
                        <kbd className="font-mono text-sm text-foreground">{binding.key}</kbd>
                        <span className="text-sm text-muted-foreground">{binding.action}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Tips */}
            <div className="mt-8 feature-card">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold">Tips for Better Experience</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use SSH keys for authentication (avoid password-based SSH)</li>
                  <li>• Set up passwordless <span className="text-cyan-400 font-mono">pct</span> access with sudoers rules</li>
                  <li>• Customize keys via the <span className="text-cyan-400 font-mono">key_bindings</span> config section</li>
                </ul>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• macOS users: Configure Opt key support in Terminal settings</li>
                  <li>• Use <span className="kbd">/</span> for quick search across VMs and containers</li>
                  <li>• Press <span className="kbd">a</span> to toggle auto-refresh mode</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* Command Line Tab */}
          <TabsContent value="commands">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground ml-4">Command Line Options</span>
              </div>
              <div className="terminal-content">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold text-foreground">Flag</th>
                        <th className="text-left py-3 pr-4 font-semibold text-foreground">Description</th>
                        <th className="text-left py-3 font-semibold text-foreground">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commandLineFlags.map((flag, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-mono text-cyan-400">{flag.flag}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{flag.description}</td>
                          <td className="py-3 font-mono text-xs text-foreground">{flag.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Environment Variables Tab */}
          <TabsContent value="env">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold">Environment Variables</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  All command-line flags can be set via environment variables with <span className="text-cyan-400 font-mono">PVETUI_</span> prefix:
                </p>
                <div className="space-y-3">
                  {environmentVars.map((env, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/50">
                      <kbd className="font-mono text-sm text-cyan-400">{env.var}</kbd>
                      <span className="text-sm text-muted-foreground">{env.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Environment Example</h3>
                </div>
                <pre className="code-block text-xs">
                  <code>{`# Set environment variables
export PVETUI_ADDR="https://proxmox.local:8006"
export PVETUI_USER="root"
export PVETUI_TOKEN_ID="mytoken"
export PVETUI_TOKEN_SECRET="secret"
export PVETUI_REALM="pam"

# Run pvetui (will use env vars)
pvetui`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-4">
                  Environment variables take precedence over config file values.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Examples Tab */}
          <TabsContent value="examples">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold">Common Examples</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Basic usage with default config:</p>
                    <pre className="code-block text-xs"><code>pvetui</code></pre>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Use specific profile:</p>
                    <pre className="code-block text-xs"><code>pvetui --profile work</code></pre>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Quick connect with env vars:</p>
                    <pre className="code-block text-xs"><code>PVETUI_ADDR=https://pve:8006 \
PVETUI_TOKEN_ID=mytoken \
PVETUI_TOKEN_SECRET=secret \
pvetui</code></pre>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Launch config wizard:</p>
                    <pre className="code-block text-xs"><code>pvetui --config-wizard</code></pre>
                  </div>
                </div>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">Advanced Usage</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Debug mode with custom config:</p>
                    <pre className="code-block text-xs"><code>pvetui --config ~/debug-config.yml --debug</code></pre>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Disable caching for fresh data:</p>
                    <pre className="code-block text-xs"><code>pvetui --no-cache</code></pre>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Group mode (multi-cluster):</p>
                    <pre className="code-block text-xs"><code>pvetui --profile all-clusters</code></pre>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skip TLS verification (not recommended):</p>
                    <pre className="code-block text-xs"><code>pvetui --insecure</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
