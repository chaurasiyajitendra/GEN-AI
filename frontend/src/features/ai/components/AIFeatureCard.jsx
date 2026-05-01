import React from 'react'

const AIFeatureCard = ({ feature }) => {
  return (
    <div className="group relative bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 hover:border-cyan-500/80 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
        {feature.icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
      <p className="text-blue-300">{feature.description}</p>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all"></div>
    </div>
  )
}

export default AIFeatureCard
