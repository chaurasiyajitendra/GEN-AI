import React, { } from 'react'
import { GiStarsStack } from "react-icons/gi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useInterview } from '../hooks/useInterview';
import { AuthContex } from '../../auth/Auth.contex';
import { toast } from 'react-toastify';

function GenResume({panelSet,interviewId}) {

  const { loading, getResume } = useInterview();
  

  

  async function handleGEN() {
    const res = await getResume(interviewId);
    if (res) {
      toast.success("Check in dawonloads...")
      panelSet(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-slate-950/90 p-8 text-center shadow-2xl shadow-black/40">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
            <GiStarsStack className="text-white text-3xl animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Generating Resume</h2>
          <p className="text-slate-400 mb-6">Your resume is being prepared. Please wait a moment.</p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-bounce"></span>
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '100ms' }}></span>
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '200ms' }}></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='h-screen transform transition-transform duration-500 w-full flex items-center justify-center bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 p-4'>
        <div className='bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl shadow-black/30 backdrop-blur-sm w-full max-w-lg flex flex-col items-center justify-center text-white p-8 space-y-6 hover:scale-105 transition-all duration-500 ease-out'>
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
              <GiStarsStack className="text-white text-2xl" />
            </div>
            <h1 className='text-3xl font-bold text-white'>Generate Resume</h1>
            <p className='text-slate-400 text-sm mt-2'>AI-Powered Resume Creation</p>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <p className='text-lg text-slate-300'>Ready to create a professional resume tailored to your profile?</p>
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <p className='text-slate-400 text-sm'>This action will consume <span className="text-cyan-400 font-semibold">100 credits</span> from your account.</p>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex gap-4 w-full justify-center'>
            <button disabled={loading} onClick={handleGEN} className='flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-110 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:shadow-none'>
              <FaCheck className="text-lg" />
              Generate Resume
            </button>
            <button 
              className='flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 text-slate-300 font-semibold rounded-2xl border border-slate-700 hover:bg-slate-700 hover:text-white hover:scale-110 transition-all duration-300'
              onClick={() => panelSet(false)}
            >
              <FaTimes className="text-lg" />
              Cancel
            </button>
          </div>
        </div>
    </div>
  )
}

export default GenResume