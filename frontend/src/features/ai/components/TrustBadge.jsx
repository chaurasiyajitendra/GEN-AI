import React from 'react'

const TrustBadge = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6 hover:border-blue-500/80 transition-all">
      <Icon className="text-4xl mb-3" />
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <p className="text-blue-300 text-sm">{description}</p>
    </div>
  )
}

export default TrustBadge
