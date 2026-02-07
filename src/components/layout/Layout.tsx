import { Outlet } from 'react-router-dom'
import { Navbar } from '@/sections/Navbar'
import { Footer } from '@/sections/Footer'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function Layout() {
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()
  
  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return

    let observer: IntersectionObserver | null = null

    const createObserver = () => {
      if (observer) observer.disconnect()

      const height = window.innerHeight
      // Create a 1px intersection line at 100px from the top
      // Top margin: -100px (moves top edge down to 100px)
      // Bottom margin: -(height - 101)px (moves bottom edge up to 101px)
      // This results in an intersection rect of [100, 101] relative to viewport top
      const bottomMargin = -(height - 101)
      const rootMargin = `-100px 0px ${bottomMargin}px 0px`

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        {
          rootMargin,
          threshold: 0,
        }
      )

      const sections = ['hero', 'features', 'installation', 'screenshots']
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) observer?.observe(element)
      })
    }

    createObserver()

    const handleResize = () => {
      createObserver()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      if (observer) observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar activeSection={activeSection} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
