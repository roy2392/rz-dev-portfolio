import PropTypes from 'prop-types'
import { NavBar } from './NavBar'
import { EtherealBeams } from '../ui/EtherealBeams'
import { ScrollProgress } from '../ui/ScrollProgress'

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <EtherealBeams />
      <ScrollProgress />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03]" />
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