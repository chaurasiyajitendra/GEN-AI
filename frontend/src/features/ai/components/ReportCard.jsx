import React from 'react'

const ReportCard = ({ report, isExpandedView = false }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'from-emerald-400 to-teal-500'
    if (score >= 80) return 'from-blue-400 to-cyan-500'
    if (score >= 70) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-pink-500'
  }

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-emerald-900/20 border-emerald-700/50'
    if (score >= 80) return 'bg-blue-900/20 border-blue-700/50'
    if (score >= 70) return 'bg-yellow-900/20 border-yellow-700/50'
    return 'bg-red-900/20 border-red-700/50'
  }

  const getScoreStatus = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    return 'Needs Improvement'
  }

  const score = report.score ?? report.matchScore

  if (isExpandedView) {
    return (
      <div className={`border rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer ${getScoreBgColor(score)}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div
                className={`w-20 h-20 rounded-full bg-linear-to-br ${getScoreColor(
                  score
                )} flex items-center justify-center font-bold text-white text-2xl`}
              >
                {score}
              </div>
              <div>
                <p className="text-blue-400 text-sm font-medium">{report.type}</p>
                <h3 className="text-white font-bold text-lg">{report.title}</h3>
                <p className="text-blue-300 text-sm mt-2">{report.insights}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-300 text-sm">{report.date}</p>
            <button className="mt-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
              View Details
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`border rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer hover:scale-105 ${getScoreBgColor(
        score
      )}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-blue-400 text-sm font-medium">{report.type}</p>
          <h3 className="text-white font-bold">{report.title}</h3>
        </div>
        <div
          className={`w-16 h-16 rounded-full bg-linear-to-br ${getScoreColor(
            score
          )} flex items-center justify-center font-bold text-white text-xl shadow-lg`}
        >
          {score}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-blue-300">
          <span className="font-semibold">Status:</span> {getScoreStatus(score)}
        </p>
        <p className="text-sm text-blue-300">
          <span className="font-semibold">Insight:</span> {report.insights}
        </p>
        <p className="text-xs text-blue-400 pt-2">{report.date}</p>
      </div>
    </div>
  )
}

export default ReportCard
