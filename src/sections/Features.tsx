import { 
  Zap, 
  Server, 
  Shield, 
  Terminal, 
  Monitor, 
  Palette, 
  Puzzle, 
  Layers,
  Globe,
  Key,
  Activity,
  HardDrive,
  Network,
  Command,
  Database,
  Play,
  CheckSquare,
  History
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Intelligent caching and optimized API calls ensure responsive performance even with large clusters.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10'
  },
  {
    icon: Command,
    title: 'CLI Subcommands',
    description: 'Use pvetui as a non-interactive CLI for scripts and automation. List nodes, guests, and exec commands directly.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    icon: Activity,
    title: 'Async Task Queue',
    description: 'Non-blocking operations with background processing. Queue multiple actions without UI freezes.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10'
  },
  {
    icon: Server,
    title: 'Complete Management',
    description: 'Full control over VMs, containers, nodes, and cluster resources. Start, stop, migrate, and monitor with ease.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: Database,
    title: 'Storage Management',
    description: 'First-class storage browser. Manage ISOs, templates, and backups. Download directly from URLs or OCI registries.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10'
  },
  {
    icon: Play,
    title: 'Ansible Integration',
    description: 'Opt-in plugin to generate inventory from your Proxmox clusters and run playbooks directly from the terminal.',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10'
  },
  {
    icon: Layers,
    title: 'Multi-Profile Support',
    description: 'Manage multiple Proxmox connections with seamless profile switching. Perfect for home lab and work environments.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10'
  },
  {
    icon: Globe,
    title: 'Group Mode',
    description: 'Combine multiple Proxmox profiles into unified multi-cluster views. Route actions per cluster seamlessly.',
    color: 'text-teal-400',
    bgColor: 'bg-teal-400/10'
  },
  {
    icon: CheckSquare,
    title: 'Batch Operations',
    description: 'Multi-select guests and perform lifecycle actions in bulk. Scale your management tasks effortlessly.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10'
  },
  {
    icon: History,
    title: 'Backup & Restore',
    description: 'Comprehensive backup management. Create, delete, and restore backups for VMs and containers with task tracking.',
    color: 'text-violet-400',
    bgColor: 'bg-violet-400/10'
  },
  {
    icon: HardDrive,
    title: 'Enhanced Monitoring',
    description: 'View disk SMART status and pending system updates directly in the node details panel.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10'
  },
  {
    icon: Network,
    title: 'SSH Jump Host',
    description: 'Securely access private Proxmox clusters through a bastion host with native jump host support.',
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10'
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'API tokens or password-based auth with auto-encryption. Built-in support for encrypted configs with SOPS.',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  {
    icon: Terminal,
    title: 'Integrated Shells',
    description: 'SSH directly to nodes, VMs, and containers. Seamless shell access without leaving the TUI.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10'
  },
  {
    icon: Monitor,
    title: 'VNC Console Access',
    description: 'Embedded noVNC client with automatic authentication. Access VM consoles directly from your terminal.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  },
  {
    icon: Puzzle,
    title: 'Plugin System',
    description: 'Opt-in extensions including Community Scripts installer. Enable plugins via UI or config file.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10'
  },
  {
    icon: Key,
    title: 'Modern Interface',
    description: 'Vim-style navigation with customizable key bindings. Intuitive h/j/k/l movement and familiar shortcuts.',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10'
  },
  {
    icon: Palette,
    title: 'Flexible Theming',
    description: 'Automatic adaptation to terminal emulator color schemes. Full semantic theming support.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10'
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage your Proxmox infrastructure from the terminal. 
            Built for speed, security, and ease of use.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
