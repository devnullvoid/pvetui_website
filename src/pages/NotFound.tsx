import { Link } from 'react-router-dom'
import { Terminal, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'

export function NotFound() {
  return (
    <>
      <SEO
        title="404 Not Found"
        description="The page you are looking for does not exist."
      />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <Terminal className="w-24 h-24 text-primary mx-auto mb-8 opacity-80" />

          <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-foreground">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-primary">
            Page Not Found
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            The requested page could not be found. It might have been moved, deleted, or you may have mistyped the address.
          </p>

          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
