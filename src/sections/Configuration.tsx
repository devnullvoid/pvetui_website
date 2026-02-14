import { useState } from 'react'
import { Settings, Shield, Terminal, Key, RefreshCw, FileText, Lock, Server, Cpu } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const configExample = `profiles:
  default:
    addr: "https://your-proxmox-host:8006"
    user: "your-user"
    realm: "pam"
    # Choose one authentication method:
    password: "your-password"          # Method 1: Password auth
    # OR
    token_id: "your-token-id"          # Method 2: API token (recommended)
    token_secret: "your-secret"
    insecure: false
    ssh_user: "your-ssh-user"
    vm_ssh_user: "vm-login-user"      # Optional override for VM shells
    ssh_jump_host:                    # Optional bastion host
      addr: "jump.example.com"
      user: "jumpuser"
      keyfile: "/path/to/jump.key"
      port: 2222
    groups:
      - all-servers
  
  work:
    addr: "https://work-proxmox:8006"
    user: "workuser"
    token_id: "worktoken"
    token_secret: "worksecret"
    realm: "pam"
    insecure: false
    ssh_user: "workuser"
    vm_ssh_user: "work-vm-user"
    groups:
      - all-servers

default_profile: "all-servers"         # Can be profile or group name
debug: false
show_icons: true                       # Toggle icons/emojis in UI`

const sopsExample = `profiles:
  default:
    addr: "https://your-proxmox-host:8006"
    user: "your-user"
    realm: "pam"
    password: ENC[AGE_KEY_FILE,age1ql3z7...]  # Encrypted by SOPS
    insecure: false
    ssh_user: "your-ssh-user"`

const pluginsExample = `plugins:
  enabled:
    - "community-scripts"    # Community Scripts installer
    - "command-runner"       # Execute whitelisted commands
    - "guest-insights"       # Guest Insights (filter/sort/jump)`

const groupExample = `profiles:
  home-server:
    # ... home server config
    groups: ["homelab"]
  
  work-prod:
    # ... work production config
    groups: ["production"]
  
  work-dev:
    # ... work dev config  
    groups: ["development"]

default_profile: "all-clusters"  # Group name for unified view`

export function Configuration() {
  const [activeTab, setActiveTab] = useState('wizard')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <section id="configuration" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Configuration
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Flexible configuration with multi-profile support, encrypted secrets, and 
            group mode for managing multiple clusters.
          </p>
        </div>
        
        {/* Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-auto flex flex-wrap justify-center gap-1 mb-8 bg-transparent h-auto">
            <TabsTrigger value="wizard" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <Terminal className="w-4 h-4 mr-2" />
              Config Wizard
            </TabsTrigger>
            <TabsTrigger value="profiles" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <Server className="w-4 h-4 mr-2" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <Shield className="w-4 h-4 mr-2" />
              Authentication
            </TabsTrigger>
            <TabsTrigger value="encryption" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <Lock className="w-4 h-4 mr-2" />
              Encryption
            </TabsTrigger>
            <TabsTrigger value="plugins" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <Settings className="w-4 h-4 mr-2" />
              Plugins
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <RefreshCw className="w-4 h-4 mr-2" />
              Group Mode
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3">
              <Cpu className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>
          
          {/* Config Wizard Tab */}
          <TabsContent value="wizard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Interactive Config Wizard</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  On first run, pvetui offers to create and edit a config file in a user-friendly TUI wizard. 
                  Launch the wizard anytime with:
                </p>
                <div className="relative">
                  <pre className="code-block">
                    <code>pvetui --config-wizard</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard('pvetui --config-wizard')}
                    className="absolute top-2 right-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
                <ul className="text-sm text-muted-foreground mt-4 space-y-2">
                  <li>• Create and manage multiple connection profiles</li>
                  <li>• Live validation of form values</li>
                  <li>• Edit, validate, and save with confirmation</li>
                  <li>• Supports SOPS-encrypted files</li>
                </ul>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">Configuration File Location</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  pvetui automatically detects configuration files at standard locations:
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Linux/macOS:</span>
                    <pre className="code-block text-xs mt-1">
                      <code>~/.config/pvetui/config.yml</code>
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Custom location:</span>
                    <pre className="code-block text-xs mt-1">
                      <code>pvetui --config /path/to/config.yml</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Profiles Tab */}
          <TabsContent value="profiles">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground ml-4">config.yml - Multi-Profile Configuration</span>
              </div>
              <div className="terminal-content">
                <p className="text-muted-foreground mb-4">
                  Modern multi-profile format supporting multiple Proxmox connections:
                </p>
                <div className="relative">
                  <pre className="code-block text-xs">
                    <code>{configExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(configExample)}
                    className="absolute top-2 right-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Auth Tab */}
          <TabsContent value="auth">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold">API Token Setup (Recommended)</h3>
                </div>
                <ol className="text-sm text-muted-foreground space-y-3">
                  <li>1. In Proxmox web interface: <span className="text-foreground">Datacenter → Permissions → API Tokens</span></li>
                  <li>2. Click <span className="text-foreground">Add</span> → Set user (e.g., <span className="text-cyan-400">root</span>) → Enter token ID</li>
                  <li>3. Copy the generated <span className="text-cyan-400">Token ID</span> and <span className="text-cyan-400">Secret</span></li>
                  <li>4. Configure pvetui with the token parts:</li>
                </ol>
                <pre className="code-block text-xs mt-4">
                  <code>{`profiles:
  default:
    addr: "https://your-proxmox-host:8006"
    user: "root"                    # from user@realm!tokenid
    realm: "pam"                    # from user@realm!tokenid
    token_id: "mytoken"             # from user@realm!tokenid
    token_secret: "YOUR_SECRET"`}</code>
                </pre>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-semibold">Password Authentication</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  While supported, password authentication is less secure than API tokens. 
                  Use only for testing or in trusted environments.
                </p>
                <pre className="code-block text-xs">
                  <code>{`profiles:
  default:
    addr: "https://your-proxmox-host:8006"
    user: "your-user"
    realm: "pam"
    password: "your-password"       # Plain text (not recommended)
    insecure: false`}</code>
                </pre>
                <p className="text-xs text-yellow-400 mt-4">
                  ⚠️ Warning: pvetui will auto-encrypt password values on successful connection
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Encryption Tab */}
          <TabsContent value="encryption">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold">SOPS Encryption</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  pvetui supports SOPS-encrypted configuration files for enhanced security:
                </p>
                <pre className="code-block text-xs">
                  <code>{sopsExample}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-4">
                  Point to an encrypted YAML file with <span className="text-cyan-400">--config</span> and it will decrypt automatically.
                </p>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">Auto-Encryption</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Not using SOPS yet? pvetui automatically detects cleartext passwords and token secrets:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Auto-detects cleartext sensitive values</li>
                  <li>• Rewrites config with encrypted blobs</li>
                  <li>• Updates running config seamlessly</li>
                  <li>• Keeps legacy configs safe</li>
                </ul>
                <div className="mt-4 p-3 bg-green-400/10 border border-green-400/20 rounded-md">
                  <p className="text-sm text-green-400">
                    ✓ Zero configuration required for encryption upgrade
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Plugins Tab */}
          <TabsContent value="plugins">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Built-in Plugins</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  pvetui includes opt-in plugins (disabled by default):
                </p>
                <ul className="text-sm text-muted-foreground space-y-3">
                  <li>
                    <span className="text-cyan-400 font-mono">community-scripts</span>
                    <span className="block text-xs">Adds Community Scripts installer to node context menus</span>
                  </li>
                  <li>
                    <span className="text-cyan-400 font-mono">command-runner</span>
                    <span className="block text-xs">Execute whitelisted commands via SSH (requires SSH keys)</span>
                  </li>
                  <li>
                    <span className="text-cyan-400 font-mono">guest-insights</span>
                    <span className="block text-xs">Full guest insights modal (filter/sort/jump-to-guest)</span>
                  </li>
                </ul>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">Enabling Plugins</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Enable plugins via the Manage Plugins dialog or config file:
                </p>
                <div className="relative">
                  <pre className="code-block text-xs">
                    <code>{pluginsExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(pluginsExample)}
                    className="absolute top-2 right-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Method 1: Press <span className="kbd">g</span> → Manage Plugins → Toggle with <span className="kbd">Space</span>
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Groups Tab */}
          <TabsContent value="groups">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Group Mode (Multi-Cluster)</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Combine multiple profiles into named groups for unified cluster views:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• See combined CPU, memory, storage, and tasks</li>
                  <li>• View all guests across clusters</li>
                  <li>• Actions routed to source profile/cluster</li>
                  <li>• Migration targets limited to VM's own cluster</li>
                </ul>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold">Group Configuration</h3>
                </div>
                <div className="relative">
                  <pre className="code-block text-xs">
                    <code>{groupExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(groupExample)}
                    className="absolute top-2 right-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Launch directly into a group: <span className="text-cyan-400 font-mono">pvetui --profile="my-group"</span>
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-semibold">Hardware Monitoring</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Enhanced monitoring capabilities for Proxmox nodes:
                </p>
                <ul className="text-sm text-muted-foreground space-y-3">
                  <li>
                    <span className="text-foreground font-semibold">Disk SMART Info</span>
                    <span className="block text-xs mt-1">View health status, model, type (SSD/HDD), and SMART data for all attached disks directly in the Node Details panel.</span>
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">System Updates</span>
                    <span className="block text-xs mt-1">See pending system package updates with version details. Helpful for keeping nodes secure and up-to-date.</span>
                  </li>
                </ul>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Advanced Config</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-3">
                  <li>
                    <span className="text-foreground font-semibold">SSH Jump Host</span>
                    <span className="block text-xs mt-1">Route connections through a bastion host. Configure via <span className="text-cyan-400">ssh_jump_host</span> block in config or CLI flags.</span>
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Guest Tags</span>
                    <span className="block text-xs mt-1">Edit tags in the VM/LXC configuration form. Use semicolon-separated format (e.g., <span className="font-mono">prod;db;backup</span>).</span>
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Icon Toggle</span>
                    <span className="block text-xs mt-1">Disable UI icons with <span className="text-cyan-400">show_icons: false</span> or <span className="text-cyan-400">--show-icons=false</span> if your font doesn't support them.</span>
                  </li>
                  <li>
                    <span className="text-foreground font-semibold">Age Key Directory</span>
                    <span className="block text-xs mt-1">Override encryption key location with <span className="text-cyan-400">age_dir</span> config or <span className="text-cyan-400">--age-dir</span> flag.</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
