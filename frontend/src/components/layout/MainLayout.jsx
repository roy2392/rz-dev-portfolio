import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import { MenuBar } from '../mac/MenuBar'

export const MainLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden font-sans relative">
      {/* Desktop background gradient — matching reference */}
      <div className="absolute inset-0 bg-[#2D3748]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 opacity-80" />

      {/* Menu bar */}
      <MenuBar />

      {/* Desktop area */}
      <div className="relative h-full w-full">
        {children}
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
} 