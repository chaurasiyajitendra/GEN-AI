import React from 'react'

const HeroSection = () => {
  return (
    <section className="mb-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 border border-blue-700/50 p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to the Future of Interview Prep
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Powered by cutting-edge AI technology, ace your interviews with real-time feedback and comprehensive analysis.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
              Start Interview
            </button>
            <button className="px-8 py-3 border border-blue-400 text-blue-300 font-bold rounded-lg hover:bg-blue-900/30 transition-all">
              Upload Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
