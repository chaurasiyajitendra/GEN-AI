import React from 'react'
import { BsGear } from 'react-icons/bs'
import { MdStorefront } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'

const ProfileSidebar = ({ userStats, isOpen }) => {
  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-slate-900 to-blue-900 border-l border-blue-900/30 shadow-2xl z-40 pt-20 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* User Info */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-white">JD</span>
          </div>
          <h2 className="text-xl font-bold text-white">{userStats.name}</h2>
          <p className="text-blue-300">{userStats.email}</p>
          <div className="mt-3 inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold text-white">
            {userStats.tier}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
            <p className="text-blue-400 text-sm font-medium">Interviews</p>
            <p className="text-2xl font-bold text-white">{userStats.interviews}</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
            <p className="text-blue-400 text-sm font-medium">Reports</p>
            <p className="text-2xl font-bold text-white">{userStats.reports}</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
            <p className="text-blue-400 text-sm font-medium">Streak</p>
            <p className="text-2xl font-bold text-yellow-400">{userStats.streak}d</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
            <p className="text-blue-400 text-sm font-medium">Credits</p>
            <p className="text-2xl font-bold text-cyan-400">{userStats.credits}</p>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-white font-bold mb-3">Achievements</h3>
          <div className="grid grid-cols-2 gap-2">
            {userStats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg text-center transition-all ${
                  achievement.unlocked
                    ? 'bg-yellow-900/30 border border-yellow-700/50 cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20'
                    : 'bg-slate-800/30 border border-slate-700/30 opacity-50'
                }`}
              >
                <p className="text-2xl">{achievement.icon}</p>
                <p className="text-xs text-blue-200 mt-1">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-2 pt-4 border-t border-blue-700/30">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-900/30 transition-all">
            <BsGear className="text-lg" />
            <span>Account Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-900/30 transition-all">
            <MdStorefront className="text-lg" />
            <span>Subscription ({userStats.credits} credits)</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all">
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar
