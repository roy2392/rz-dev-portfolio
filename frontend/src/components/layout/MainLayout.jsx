import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, FileText, Mail, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { hash: '#hero', label: 'Home' },
  { hash: '#about', label: 'About' },
  { hash: '#expertise', label: 'Expertise' },
  { hash: '#projects', label: 'Projects' },
  { hash: '#blog', label: 'Blog' },
  { hash: '#chat', label: 'AI Chat' },
  { hash: '#contact', label: 'Contact' },
]

const scrollTo = (hash) => {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-parchment text-ink font-body">
      {/* ── FIXED LEFT SIDEBAR (desktop) ── */}
      <header className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] flex-col items-center bg-parchment-light border-r-2 border-ink/10 py-10 px-6 z-40 overflow-y-auto">
        {/* Photo */}
        <div className="w-36 h-36 rounded-full overflow-hidden border-[3px] border-ink mb-5 shadow-retro">
          <img src="/profile.jpg" alt="Roey Zalta" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-sans text-lg font-bold text-ink text-center mb-1">Roey Zalta</h1>
        <p className="text-sm text-ink-muted text-center mb-6">ML Engineer & AI Architect</p>

        {/* Nav */}
        <nav className="w-full mb-8">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ hash, label }) => (
              <li key={hash}>
                <a
                  href={hash}
                  onClick={(e) => { e.preventDefault(); scrollTo(hash) }}
                  className="block px-4 py-2 text-[13px] font-sans font-semibold text-ink-light rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="flex gap-3 mb-6">
          {[
            { href: 'https://github.com/roy2392', icon: Github, title: 'GitHub' },
            { href: 'https://linkedin.com/in/roeyzalta', icon: Linkedin, title: 'LinkedIn' },
            { href: 'https://medium.com/@roeyzalta', icon: FileText, title: 'Medium' },
          ].map(({ href, icon: Icon, title }) => (
            <a key={title} href={href} target="_blank" rel="noopener noreferrer" title={title}
              className="w-9 h-9 rounded-lg border-2 border-ink flex items-center justify-center text-ink hover:bg-accent hover:text-white hover:border-accent transition-all">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className="mt-auto text-[10px] text-ink-faint tracking-wider uppercase font-mono">
          &copy; {new Date().getFullYear()} Roey Zalta
        </div>
      </header>

      {/* ── MOBILE HEADER ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-parchment-light/95 backdrop-blur-sm border-b-2 border-ink/10 px-4 py-3 flex items-center justify-between">
        <span className="font-sans font-bold text-sm text-ink">R. Zalta</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5">
          {mobileOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
        </button>
      </div>

      {/* Mobile slide menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-parchment-light pt-16 px-6 overflow-y-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-ink mb-3">
              <img src="/profile.jpg" alt="Roey Zalta" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-sans font-bold text-ink">Roey Zalta</h2>
            <p className="text-sm text-ink-muted">ML Engineer</p>
          </div>
          <nav>
            <ul className="space-y-1">
              {NAV_LINKS.map(({ hash, label }) => (
                <li key={hash}>
                  <a
                    href={hash}
                    onClick={(e) => { e.preventDefault(); scrollTo(hash); setMobileOpen(false) }}
                    className="block px-4 py-3 text-sm font-sans font-semibold text-ink-light rounded-lg hover:bg-accent/10"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="lg:ml-[280px] min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 pt-16 lg:pt-0 pb-16">
          {children}
        </div>
      </main>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
} 