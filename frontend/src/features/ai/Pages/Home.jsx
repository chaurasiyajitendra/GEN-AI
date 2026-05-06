import React, { useEffect, useState } from 'react'
import { FiBriefcase, FiTrendingUp, FiAward, FiSettings, FiLogOut } from 'react-icons/fi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'
import { BsCreditCard } from 'react-icons/bs'
import { BsLightbulb, BsBarChart, BsGear } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router'
import { useInterview } from '../hooks/useInterview'
import { useContext } from 'react'
import { AuthContex } from '../../auth/Auth.contex'
import { useAuth } from '../../auth/hooks/useAuth'



const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProfile, setShowProfile] = useState(false);
  const [interviewId, setinterviewId] = useState('');
  const [reports, setReports] = useState([]);

  const context = useContext(AuthContex);
  const {user} = context;
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {getAllReports} = useInterview();

  async function Logout(){
      await handleLogout();
  }

  useEffect(() => {
      const getData = async () => {
        try {
          const data = await getAllReports();
          setReports(data);
          } catch (error) {
          console.error("Error fetching reports:", error);
        }
        
      };
      
      async function switchReport(){
        if(interviewId)
        {
          // await getReportById(interviewId);
          navigate(`/inter/${interviewId}`)
        }
      }

      getData();
      switchReport();
    }, [interviewId]);

  // Mock data
  const userStats = {
    user,
    tier: 'Premium',
    achievements: [
      { id: 1, name: 'First Report', icon: '🎯', unlocked: reports?.length > 0 },
      { id: 2, name: 'Perfect Score', icon: '⭐', unlocked: reports?.some(report => report.matchScore >= 85) },
    ]
  }


  const aiFeatures = [
    {
      icon: <BsRobot className="text-4xl" />,
      title: 'AI Interview Coach',
      description: 'Real-time feedback during mock interviews with advanced NLP analysis'
    },
    {
      icon: <AiOutlineLoading3Quarters className="text-4xl" />,
      title: 'Resume Optimizer',
      description: 'AI-powered resume enhancement with ATS optimization'
    },
    {
      icon: <BsBarChart className="text-4xl" />,
      title: 'Analytics Dashboard',
      description: 'Track your progress with detailed performance metrics'
    },
    {
      icon: <FiTrendingUp className="text-4xl" />,
      title: 'Skill Predictions',
      description: 'AI recommendations for skill development paths'
    },
    {
      icon: <FiTrendingUp className="text-4xl" />,
      title: 'Job Match Score',
      description: 'Get matched with ideal positions based on your profile'
    },
    {
      icon: <AiOutlineLoading3Quarters className="text-4xl" />,
      title: 'Continuous Learning',
      description: 'Adaptive learning paths powered by machine learning'
    }
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <BsRobot className="text-2xl text-white" />
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

      {/* Profile Sidebar */}
      {showProfile && (
        <div className="fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-slate-900 to-blue-900 border-l border-blue-900/30 shadow-2xl z-40 pt-20 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-white">JD</span>
              </div>
              <h2 className="text-xl font-bold text-white">{userStats.user.name}</h2>
              <p className="text-blue-300">{userStats.user.email}</p>
              <div className="mt-3 inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold text-white">
                {userStats.tier}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
                <p className="text-blue-400 text-sm font-medium">Reports</p>
                <p className="text-2xl font-bold text-white">{reports.length}</p>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
                <p className="text-blue-400 text-sm font-medium">Credits</p>
                <p className="text-2xl font-bold text-cyan-400">{userStats.user.credit}</p>
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
              <Link to='/profile' className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-900/30 transition-all">
                <BsGear className="text-lg" />
                <span>Account Settings</span>
              </Link>
              <Link to={`/pay/${userStats.user._id}`} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-900/30 transition-all">
                <BsCreditCard className="text-lg" />
                <span>Subscription ({userStats.user.credit} credits)</span>
              </Link>
              <button onClick={Logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all">
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${showProfile ? 'mr-80' : ''}`}>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
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
                    <Link
                    to="/" 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust & Credibility Section */}
            <section className="mb-16">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6 hover:border-blue-500/80 transition-all">
                  <BsRobot className="text-4xl text-cyan-400 mb-3" />
                  <h3 className="text-white font-bold text-lg">Enterprise AI</h3>
                  <p className="text-blue-300 text-sm">Military-grade encryption</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6 hover:border-blue-500/80 transition-all">
                  <FiTrendingUp className="text-4xl text-emerald-400 mb-3" />
                  <h3 className="text-white font-bold text-lg">99.9% Accuracy</h3>
                  <p className="text-blue-300 text-sm">Industry-leading precision</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6 hover:border-blue-500/80 transition-all">
                  <FiAward className="text-4xl text-purple-400 mb-3" />
                  <h3 className="text-white font-bold text-lg">50K+ Users</h3>
                  <p className="text-blue-300 text-sm">Trusted by professionals</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6 hover:border-blue-500/80 transition-all">
                  <BsLightbulb className="text-4xl text-yellow-400 mb-3" />
                  <h3 className="text-white font-bold text-lg">AI Models</h3>
                  <p className="text-blue-300 text-sm">Latest GPT-4 technology</p>
                </div>
              </div>
            </section>

            {/* AI Features Grid */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Advanced AI Capabilities</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {aiFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 hover:border-cyan-500/80 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
                    <p className="text-blue-300">{feature.description}</p>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Reports Preview */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Recent Highlights</h2>
                <button onClick={()=>{
                  setActiveTab("reports")
                }} className="text-cyan-400 hover:text-cyan-300 font-bold">View All →</button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {reports.slice(0, 3).map((report) => (
                  <div
                    onClick={()=>{setinterviewId(report._id);}}
                    key={report._id}
                    className={`border rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer hover:scale-105 ${getScoreBgColor(
                      report.matchScore
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-blue-400 text-sm font-medium">Resume Analysis</p>
                        <h3 className="text-white font-bold">{report.title}</h3>
                      </div>
                      <div
                        className={`w-26 h-16 rounded-full bg-gradient-to-br ${getScoreColor(
                          report.matchScore
                        )} flex items-center justify-center font-bold text-white text-xl shadow-lg`}
                      >
                        {report.matchScore}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-blue-300">
                        <span className="font-semibold">Status:</span> {getScoreStatus(report.matchScore)}
                      </p>
                      <p className="text-xs text-blue-400 pt-2">{new Date(report.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-8">All Reports</h2>

            {/* Filters */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                All Reports
              </button>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`border rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer ${getScoreBgColor(
                    report.matchScore
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-20 h-20 rounded-full bg-gradient-to-br ${getScoreColor(
                            report.matchScore
                          )} flex items-center justify-center font-bold text-white text-2xl`}
                        >
                          {report.matchScore}
                        </div>
                        <div>
                          <p className="text-blue-400 text-sm font-medium">{report.type}</p>
                          <h3 className="text-white font-bold text-lg">{report.title}</h3>
                          <p className="text-blue-300 text-sm mt-2">{report.insights}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-300 text-sm">{new Date(report.createdAt).toLocaleDateString()}</p>
                      <button onClick={()=>{setinterviewId(report._id)}} className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home