import React from 'react'
import { MdOutlineAI } from 'react-icons/md'

const Header = ({ activeTab, setActiveTab, setShowProfile, showProfile }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <MdOutlineAI className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AIInterviewPro
          </h1>
        </div>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-blue-200 hover:text-blue-100 hover:bg-blue-900/30'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'text-blue-200 hover:text-blue-100 hover:bg-blue-900/30'
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="relative group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              <span className="text-white font-bold">JD</span>
            </div>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
