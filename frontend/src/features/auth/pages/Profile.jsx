import React, { useContext, useEffect, useState } from 'react'
import { AuthContex } from '../Auth.contex'
import { FaUser, FaEnvelope, FaIdBadge, FaChartLine, FaFileAlt, FaCog, FaSignOutAlt, FaHome, FaEdit, FaCamera, FaMedal, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { IoMdTrophy, IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { useInterview } from '../../ai/hooks/useInterview';

const Profile = () => {
  const {user} = useContext(AuthContex);
  const {handleLogout} = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [reports, setReports] = useState([]);
  const {getAllReports} = useInterview();


  useEffect(() => {
    async function GetReports() {
      try {
        const res = await getAllReports();
        setReports(res)
      } catch (error) {
        console.log(error);
      }
    }
    GetReports();
  }, [])

  const avgScore =
  reports.length > 0
    ? reports.reduce((acc, curr) => acc + curr.matchScore, 0) / reports.length
    : 0;
  
    
  const recentActivities = [
    { id: 1, type: 'interview', title: 'Completed Frontend Developer Interview', date: '2 hours ago', score: 88 },
    { id: 2, type: 'resume', title: 'Generated Resume for Tech Corp', date: '1 day ago', status: 'success' },
    { id: 3, type: 'interview', title: 'Completed Full Stack Interview', date: '3 days ago', score: 92 },
  ];

  const achievements = [
    { id: 1, title: 'First Interview', description: 'Completed your first Reports', icon: <IoMdTrophy />, unlocked: reports?.length > 0 },
    { id: 2, title: 'Resume Master', description: 'Generated 5 professional resumes', icon: <FaFileAlt />, unlocked: reports?.length > 5 },
    { id: 3, title: 'High Scorer', description: 'Achieved 90%+ match score', icon: <FaChartLine />, unlocked: reports.some((report) => report.matchScore >= 90) },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
      {/* Navigation Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500">
                <GiStarsStack className="text-white text-lg" />
              </div>
              <h1 className="text-xl font-bold text-white">AI Interview Prep</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/home"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <FaHome className="text-cyan-400" />
                <span className="text-sm font-medium">Home</span>
              </Link>
              <Link to={`/edit/${user._id}`} className="flex  items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl hover:bg-cyan-500/20 transition-all duration-300">
                <FaEdit className="text-cyan-400" />
                <span className="text-sm font-medium">Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                  <FaUser className="text-white text-5xl" />
                </div>
                <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                  <FaCamera className="text-slate-400 text-sm" />
                </button>
              </div>
              <div className="text-center lg:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name || 'User'}!</h1>
                <p className="text-slate-400 mb-4 text-lg">Ready to ace your next interview?</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <FaEnvelope className="text-cyan-400" />
                    <span className="text-sm">{user?.email || 'user@example.com'}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                    <FaIdBadge className="text-purple-400" />
                    <span className="text-sm uppercase">ID: {user?._id || '123456'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-black/30 p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                <IoMdTrophy className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Reports Generated</p>
                <p className="text-2xl font-bold text-white">{reports.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-black/30 p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 group-hover:bg-amber-500/20 transition-colors">
                <GiStarsStack className="text-amber-400 text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Credits Remaining</p>
                <p className="text-2xl font-bold text-white">{user.credit}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-black/30 p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors">
                <FaChartLine className="text-cyan-400 text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Avg Match Score</p>
                <p className="text-2xl font-bold text-white">{avgScore.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-black/30 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <FaCalendarAlt className="text-cyan-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      activity.type === 'interview' ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-blue-500/10 border border-blue-500/30'
                    }`}>
                      {activity.type === 'interview' ? <FaChartLine className="text-cyan-400" /> : <FaFileAlt className="text-blue-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-slate-400 text-sm">{activity.date}</p>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold">{activity.score}%</p>
                        <p className="text-slate-500 text-xs">Match Score</p>
                      </div>
                    )}
                    {activity.status && (
                      <FaCheckCircle className="text-green-400 text-xl" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-black/30 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <FaMedal className="text-amber-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    achievement.unlocked
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      achievement.unlocked
                        ? 'bg-amber-500/20 border border-amber-500/40'
                        : 'bg-slate-600/20 border border-slate-600/40'
                    }`}>
                      <span className={achievement.unlocked ? 'text-amber-400' : 'text-slate-500'}>
                        {achievement.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-slate-500 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && <FaCheckCircle className="text-amber-400" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl shadow-black/30 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <FaCog className="text-cyan-400" />
            Account Settings
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-slate-400 text-sm">Receive updates about your interviews</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    notifications ? 'bg-cyan-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <p className="text-white font-medium">Profile Visibility</p>
                  <p className="text-slate-400 text-sm">Make your profile visible to recruiters</p>
                </div>
                <button
                  onClick={() => setProfileVisibility(!profileVisibility)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    profileVisibility ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profileVisibility ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white font-medium mb-2">Quick Actions</p>
                <div className="space-y-2">
                  <Link
                    to="/"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
                  >
                    <FaFileAlt className="text-lg" />
                    <span>Generate New Report</span>
                  </Link>
                  <button onClick={()=>{handleLogout()}} className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-300 font-semibold rounded-2xl hover:bg-red-500/20 hover:text-red-200 transition-all duration-300">
                    <FaSignOutAlt className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
               