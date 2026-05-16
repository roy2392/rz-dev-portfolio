import PropTypes from 'prop-types'
import { NavBar } from './NavBar'
import { AuroraBackground } from '../ui/AuroraBackground'

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AuroraBackground />
      <div className="fixed inset-0 bg-grid-pattern opacity-5" />
      <NavBar />
      <main className="relative pt-24 px-6 max-w-7xl mx-auto" style={{ zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
} 