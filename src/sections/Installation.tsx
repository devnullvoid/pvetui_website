import { useState } from 'react'
import { Terminal, Download, Package, Apple, Monitor, Box, Shield } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const installationMethods = [
  {
    id: 'go',
    label: 'Go Install',
    icon: Terminal,
    title: 'Install via Go',
    description: 'Recommended for Go users. Requires Go 1.24+',
    command: 'go install github.com/devnullvoid/pvetui/cmd/pvetui@latest',
    note: 'Make sure $GOPATH/bin is in your PATH'
  },
  {
    id: 'binary',
    label: 'Binary',
    icon: Download,
    title: 'Pre-compiled Binaries',
    description: 'Download from GitHub Releases',
    command: '# Download from https://github.com/devnullvoid/pvetui/releases\n./pvetui',
    note: 'macOS users may need to bypass Gatekeeper warnings'
  },
  {
    id: 'arch',
    label: 'Arch Linux',
    icon: Package,
    title: 'Arch Linux (AUR)',
    description: 'Install via your favorite AUR helper',
    command: 'yay -S pvetui-bin',
    note: 'Available as pvetui-bin (recommended), pvetui, or pvetui-git'
  },
  {
    id: 'macos',
    label: 'macOS',
    icon: Apple,
    title: 'macOS (Homebrew)',
    description: 'Install via Homebrew Cask',
    command: 'brew install --cask devnullvoid/pvetui/pvetui',
    note: 'Auto-clones the devnullvoid/homebrew-pvetui tap'
  },
  {
    id: 'windows',
    label: 'Windows',
    icon: Monitor,
    title: 'Windows (Scoop)',
    description: 'Install via Scoop package manager',
    command: 'scoop bucket add pvetui https://github.com/devnullvoid/scoop-pvetui\nscoop install pvetui',
    note: 'Add the bucket first, then install'
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: Box,
    title: 'Docker',
    description: 'Run in a containerized environment',
    command: 'docker compose run --rm pvetui',
    note: 'Copy .env.example to .env and configure'
  },
  {
    id: 'source',
    label: 'Source',
    icon: Terminal,
    title: 'Build from Source',
    description: 'Clone and build the repository',
    command: 'git clone https://github.com/devnullvoid/pvetui.git\ncd pvetui\nmake install',
    note: 'Requires Go 1.24+ and make'
  }
]

export function Installation() {
  const [activeTab, setActiveTab] = useState('go')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <section id="installation" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Installation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose your preferred installation method. pvetui supports multiple platforms 
            and package managers for easy deployment.
          </p>
        </div>
        
        {/* Installation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent w-full">
            {installationMethods.map((method) => (
              <TabsTrigger
                key={method.id}
                value={method.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
              >
                <method.icon className="w-4 h-4 mr-2" />
                {method.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {installationMethods.map((method) => (
            <TabsContent key={method.id} value={method.id} className="w-full">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot bg-red-500" />
                    <div className="terminal-dot bg-yellow-500" />
                    <div className="terminal-dot bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">{method.title}</span>
                </div>
                <div className="terminal-content">
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <div className="relative">
                    <pre className="code-block bg-[#0d1117] border-[#30363d] text-foreground">
                      <code>{method.command}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(method.command)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    <span className="text-yellow-400">Note:</span> {method.note}
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Requirements */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="feature-card">
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Requirements
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Proxmox VE cluster access</li>
              <li>• SSH access for shell functionality</li>
              <li>• Go 1.24+ (for building from source)</li>
              <li>• Terminal with 256-color support</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Security Tips
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use API tokens instead of passwords</li>
              <li>• Set up SSH key authentication</li>
              <li>• Consider SOPS for config encryption</li>
              <li>• Restrict API token permissions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
