import { useState } from 'react'
import { Palette, Sun, Monitor, Sparkles, Paintbrush, Terminal } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const themes = [
  {
    name: 'Dracula',
    type: 'Dark',
    colors: ['#282a36', '#44475a', '#f8f8f2', '#6272a4', '#50fa7b', '#ffb86c', '#ff79c6', '#bd93f9'],
    description: 'Popular dark theme with vibrant accents'
  },
  {
    name: 'Nord',
    type: 'Dark',
    colors: ['#2e3440', '#3b4252', '#eceff4', '#434c5e', '#a3be8c', '#ebcb8b', '#bf616a', '#5e81ac'],
    description: 'Arctic-inspired color palette'
  },
  {
    name: 'Solarized Dark',
    type: 'Dark',
    colors: ['#002b36', '#073642', '#839496', '#586e75', '#859900', '#b58900', '#dc322f', '#268bd2'],
    description: 'Precision colors for machines and people'
  },
  {
    name: 'Gruvbox Dark',
    type: 'Dark',
    colors: ['#282828', '#3c3836', '#ebdbb2', '#7c6f64', '#b8bb26', '#fabd2f', '#fb4934', '#83a598'],
    description: 'Retro groove color scheme'
  },
  {
    name: 'One Dark',
    type: 'Dark',
    colors: ['#282c34', '#3e4451', '#abb2bf', '#5c6370', '#98c379', '#e5c07b', '#e06c75', '#61afef'],
    description: 'Atom editor default theme'
  },
  {
    name: 'Solarized Light',
    type: 'Light',
    colors: ['#fdf6e3', '#eee8d5', '#657b83', '#93a1a1', '#859900', '#b58900', '#dc322f', '#268bd2'],
    description: 'Light variant of precision colors'
  }
]

const themeConfigExample = `theme:
  name: "custom"
  colors:
    background: "#282a36"
    foreground: "#f8f8f2"
    primary: "#50fa7b"
    secondary: "#6272a4"
    accent: "#ff79c6"
    muted: "#44475a"
    border: "#6272a4"
    success: "#50fa7b"
    warning: "#ffb86c"
    error: "#ff5555"
    info: "#8be9fd"`

const autoThemeExample = `# pvetui automatically adapts to terminal colors
# No configuration needed for basic theming

# Just set your terminal theme and pvetui follows:
- Dracula, Nord, Solarized, Gruvbox
- One Dark, Catppuccin, Tokyo Night
- And many more...`

export function Theming() {
  const [activeTab, setActiveTab] = useState('auto')
  const [selectedTheme, setSelectedTheme] = useState(0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <section id="theming" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Theming
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            pvetui supports semantic theming with automatic adaptation to your terminal's 
            color scheme. Beautiful out of the box, customizable when you need it.
          </p>
        </div>
        
        {/* Theming Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            <TabsTrigger value="auto" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Auto-Theming
            </TabsTrigger>
            <TabsTrigger value="built-in" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="w-4 h-4 mr-2" />
              Built-in Themes
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Paintbrush className="w-4 h-4 mr-2" />
              Custom Themes
            </TabsTrigger>
          </TabsList>
          
          {/* Auto-Theming Tab */}
          <TabsContent value="auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-semibold">Automatic Theme Detection</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  pvetui automatically adapts to your terminal emulator's color scheme. 
                  No configuration needed - just set your favorite terminal theme!
                </p>
                <div className="relative">
                  <pre className="code-block text-xs">
                    <code>{autoThemeExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(autoThemeExample)}
                    className="absolute top-2 right-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">Supported Terminal Themes</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  pvetui works beautifully with popular terminal themes:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-foreground">Dracula</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-foreground">Nord</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-foreground">Solarized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-foreground">Gruvbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-foreground">One Dark</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500" />
                    <span className="text-foreground">Catppuccin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-foreground">Tokyo Night</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                    <span className="text-foreground">And many more...</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Built-in Themes Tab */}
          <TabsContent value="built-in">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Theme Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTheme(index)}
                    className={`feature-card text-left transition-all ${
                      selectedTheme === index ? 'border-primary shadow-lg shadow-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{theme.name}</h4>
                        <p className="text-xs text-muted-foreground">{theme.type}</p>
                      </div>
                      <div className="flex gap-1">
                        {theme.colors.slice(0, 4).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{theme.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      {theme.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Selected Theme Preview */}
            <div className="terminal-window max-w-4xl mx-auto">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground ml-4">{themes[selectedTheme].name} Theme Preview</span>
              </div>
              <div className="terminal-content text-xs">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Foreground</div>
                    <div 
                      className="p-2 rounded"
                      style={{ 
                        backgroundColor: themes[selectedTheme].colors[0],
                        color: themes[selectedTheme].colors[2]
                      }}
                    >
                      Proxmox Node
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Success</div>
                    <div 
                      className="p-2 rounded"
                      style={{ 
                        backgroundColor: themes[selectedTheme].colors[0],
                        color: themes[selectedTheme].colors[4]
                      }}
                    >
                      Running
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Warning</div>
                    <div 
                      className="p-2 rounded"
                      style={{ 
                        backgroundColor: themes[selectedTheme].colors[0],
                        color: themes[selectedTheme].colors[5]
                      }}
                    >
                      Warning
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Error</div>
                    <div 
                      className="p-2 rounded"
                      style={{ 
                        backgroundColor: themes[selectedTheme].colors[0],
                        color: themes[selectedTheme].colors[6]
                      }}
                    >
                      Stopped
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-muted-foreground mb-2">Resource Usage</div>
                  <div className="flex gap-2">
                    <div 
                      className="h-2 flex-1 rounded"
                      style={{ backgroundColor: themes[selectedTheme].colors[4] }}
                    />
                    <div 
                      className="h-2 flex-1 rounded opacity-50"
                      style={{ backgroundColor: themes[selectedTheme].colors[7] }}
                    />
                    <div 
                      className="h-2 flex-1 rounded opacity-30"
                      style={{ backgroundColor: themes[selectedTheme].colors[4] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Custom Themes Tab */}
          <TabsContent value="custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Paintbrush className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold">Custom Theme Configuration</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Define your own color scheme in the configuration file:
                </p>
                <div className="relative">
                  <pre className="code-block text-xs">
                    <code>{themeConfigExample}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(themeConfigExample)}
                    className="absolute top-2 right-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">Color Reference</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-cyan-400 font-mono">background</span>
                    <span className="text-muted-foreground block">Main terminal background</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-mono">foreground</span>
                    <span className="text-muted-foreground block">Primary text color</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-mono">primary</span>
                    <span className="text-muted-foreground block">Highlight and selection</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-mono">secondary</span>
                    <span className="text-muted-foreground block">Secondary elements</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-mono">accent</span>
                    <span className="text-muted-foreground block">Accent highlights</span>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-mono">success/warning/error/info</span>
                    <span className="text-muted-foreground block">Status indicators</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Theme Tips */}
            <div className="mt-8 feature-card">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Theming Tips</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use high contrast for readability</li>
                  <li>• Test with both light and dark terminal themes</li>
                  <li>• Consider colorblind accessibility</li>
                  <li>• Use semantic colors consistently</li>
                </ul>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Auto-detection works with most terminal themes</li>
                  <li>• Custom themes override auto-detection</li>
                  <li>• Share your custom themes with the community</li>
                  <li>• Check docs/THEMING.md for advanced options</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
