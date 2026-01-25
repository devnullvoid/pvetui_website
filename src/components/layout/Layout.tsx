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
    const handleScroll = () => {
      if (location.pathname !== '/') return
      
      const sections = ['hero', 'features', 'installation', 'screenshots']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
