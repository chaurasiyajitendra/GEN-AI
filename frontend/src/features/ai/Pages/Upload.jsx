import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiTargetBold } from "react-icons/pi";
import { FaHouseUser, FaUser } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { FiUploadCloud } from "react-icons/fi";
import { useInterview } from "../hooks/useInterview";
import { useRef } from "react";

const Upload = () => {

  const { loading, genrateReport} = useInterview();


  const navigate = useNavigate();
  
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef()

  const handleSubmit = async () => {

    const resumeFile = resumeInputRef.current.files[0]
    const data = await genrateReport({jobDescription,selfDescription,resumeFile});    
    navigate(`/home`)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <GiStarsStack className="text-cyan-400 text-3xl animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Generating Your Report
          </h2>
          <p className="text-slate-400 mb-6 text-lg">
            Analyzing your profile and job requirements...
          </p>
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
          </div>
          <div className="text-sm text-slate-500">
            <span className="inline-block animate-pulse">Please wait...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
      <div className=" absolute top-10 right-20">
        <Link to="/home" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition">
           Home
         </Link>
       </div>
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            <span className="block text-slate-100">Create Your Custom </span>
            <span className="block text-cyan-400 drop-shadow-md">Interview Plan</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Let our AI analyze the job requirements and your unique profile.
          </p>
        </div>

        <div className="rounded-4xl border border-blue-800/70 bg-slate-950/80 shadow-2xl shadow-blue-950/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6">

            <div className="space-y-5 rounded-3xl bg-blue-950/70 border border-blue-800/60 p-4 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-white text-lg md:text-xl font-semibold flex items-center gap-2">
                  <PiTargetBold className="text-cyan-400 text-xl md:text-2xl" />
                  Target Job Description
                </h2>
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-[11px] text-red-300 font-semibold">
                  REQUIRED
                </span>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="h-48 md:h-64 w-full rounded-3xl border border-blue-800/60 bg-slate-900/90 p-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 resize-none"
              />

              <p className="text-right text-[11px] text-slate-500">
                0 / 5000 chars
              </p>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl bg-slate-900/90 border border-blue-800/60 p-4 md:p-6">
              <div>
                <h2 className="text-white text-lg md:text-xl font-semibold flex items-center gap-2 mb-4">
                  <FaUser className="text-cyan-400 text-xl md:text-2xl" />
                  Your Profile
                </h2>

                <div className="rounded-3xl border border-blue-800/50 bg-blue-950/70 p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-slate-300 text-sm font-medium">Upload Resume</p>
                    <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-[10px] text-cyan-200">
                      BEST RESULTS
                    </span>
                  </div>

                  <label
                    htmlFor="fileUpload"
                    className="flex h-24 md:h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-blue-700/60 bg-slate-950/80 px-4 text-center transition hover:border-cyan-400 hover:bg-slate-900"
                  >
                    <FiUploadCloud className="text-xl md:text-2xl text-cyan-400" />
                    <p className="text-sm text-slate-200">Click to upload or drag & drop</p>
                    <p className="text-[11px] text-slate-400">PDF (Max 3MB)</p>
                  </label>

                  <input id="fileUpload" type="file" hidden ref={resumeInputRef} />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <div className="h-px flex-1 bg-blue-800/50" />
                OR
                <div className="h-px flex-1 bg-blue-800/50" />
              </div>

              <div className="flex flex-col flex-1 gap-3 rounded-3xl border border-blue-800/50 bg-blue-950/70 p-4 md:p-5">
                <label className="text-slate-300 text-sm font-medium">Quick Self-Description</label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your experience, skills..."
                  className="h-32 md:h-40 w-full rounded-3xl border border-blue-800/60 bg-slate-900/90 p-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 resize-none"
                />
                <p className="text-[11px] text-slate-500">Either resume or description is required</p>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full md:w-auto mt-2 rounded-3xl bg-linear-to-r from-cyan-500 to-blue-500 py-3 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-xl"
              >
                Generate My Interview Strategy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;