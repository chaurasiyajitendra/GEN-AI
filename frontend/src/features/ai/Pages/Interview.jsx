import React, { useEffect, useState } from "react";
import { IoCodeSlashSharp } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { FiTarget } from "react-icons/fi";
import { FaHome, FaUser, FaFileAlt, FaPlus } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { useInterview } from "../hooks/useInterview";
import { useParams, Link } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import GenResume from "../components/GenResume";

const Interview = () => {
  const [active, setActive] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [genResume, setGenResume] = useState(false)

  const {interviewId} = useParams();


  const {report,getReportById,loading} = useInterview();
  useEffect(() => {
    const fetchData = async () => {
      if(interviewId)
      {
        // window.location.reload();
        console.log('he');
        
        await getReportById(interviewId); // id pass karo
      }
    };

    fetchData();
  }, [interviewId]);

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
    <div className={`min-h-screen relative overflow-x-hidden bg-slate-950 text-slate-100`}>
      <div className={` ${genResume ? 'h-screen' : ''} mx-auto max-w-7xl px-4 py-10`}>
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">

          {/* SIDEBAR */}
          <div className="rounded-3xl border h-fit border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                <GiStarsStack className="text-white text-xl" />
              </div>
              <h3 className="text-sm font-semibold text-white">Interview AI</h3>
              <p className="text-xs text-slate-400">Smart Prep Assistant</p>
            </div>

            {/* Navigation */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">Navigation</p>
              <nav className="space-y-1">
                <Link
                  to="/home"
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-all hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <FaHome className="text-cyan-300 text-lg transition-colors group-hover:text-cyan-200" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/profile"
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-all hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <FaUser className="text-cyan-300 text-lg transition-colors group-hover:text-cyan-200" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/"
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-all hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <FaPlus className="text-cyan-300 text-lg transition-colors group-hover:text-cyan-200" />
                  <span>Generate New Report</span>
                </Link>
                <button
                  // to="/"
                  onClick={()=>{
                    setGenResume(true)
                  }}
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-all hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <FaFileAlt className="text-cyan-300 text-lg transition-colors group-hover:text-cyan-200" />
                  <span>Generate New Resume</span>
                </button>
              </nav>
            </div>

            {/* Sections */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">Report Sections</p>
              {[
                { key: "technical", name: "Technical", icon: <IoCodeSlashSharp />, count: report?.technicalQuestions?.length ?? 0 },
                { key: "behavioral", name: "Behavioral", icon: <TiMessages />, count: report?.behavioralQuestions?.length ?? 0 },
                { key: "roadmap", name: "Roadmap", icon: <FiTarget />, count: report?.preparationPlan?.length ?? 0 }
              ].map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setActive(s.key);
                    setOpenIndex(null);
                  }}
                  className={`group w-full flex items-center justify-between rounded-2xl px-4 py-3 mb-2 text-left text-sm font-medium transition-all ${
                    active === s.key
                      ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-white shadow-lg shadow-cyan-500/10"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-lg transition-colors ${active === s.key ? "text-cyan-200" : "text-cyan-300 group-hover:text-cyan-200"}`}>
                      {s.icon}
                    </span>
                    <span>{s.name}</span>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-bold transition-colors ${
                    active === s.key
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "bg-slate-700 text-slate-400 group-hover:bg-slate-600"
                  }`}>
                    {s.count}
                  </span>
                </button>
              ))}
            </div>

          </div>

          <div className="space-y-6">
            <div className={`${active !== "" ? 'hidden' : 'visible'} rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-black/20`}>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white">Interview Report</h1>
                <p className="mt-2 text-slate-400">Your personalized preparation insights</p>
                <div className="mt-8 flex justify-center items-center gap-12">
                  <div className="text-center">
                    <div className="relative inline-flex">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border-4 border-cyan-500/30">
                        <span className="text-2xl font-bold text-cyan-400">{report?.matchScore}</span>
                      </div>
                      <span className="absolute -top-1 -right-1 text-xs text-cyan-400 font-semibold">%</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 uppercase tracking-wide">Match Score</p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 border-4 border-amber-500/30">
                      <span className="text-2xl font-bold text-amber-400">{report?.skillGaps?.length ?? 0}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 uppercase tracking-wide">Skill Gaps</p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10 border-4 border-purple-500/30">
                      <span className="text-2xl font-bold text-purple-400">{(report?.technicalQuestions?.length ?? 0) + (report?.behavioralQuestions?.length ?? 0)}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 uppercase tracking-wide">Total Questions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={` ${active === '' ? 'hidden' : 'visible'} relative rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-black/10 overflow-hidden`}>
              <div onClick={()=>{
                setActive('')
              }} className=" absolute right-10 text-2xl"><RiCloseCircleFill className=" fill-lime-400" /></div>
              {active === "technical" && (
                <>
                  <h2 className="text-3xl font-semibold text-white mb-5">Technical Questions</h2>
                  <div className="space-y-4">
                    {report?.technicalQuestions.map((q, i) => (
                      <div
                        key={i}
                        className="rounded-3xl border border-slate-800 bg-slate-950/80 overflow-hidden transition hover:border-cyan-400"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenIndex(openIndex === i ? null : i)}
                          className="w-full p-6 flex items-center justify-between gap-4 text-left"
                        >
                          <span className="text-white text-lg font-medium">{q.question}</span>
                          <span className="text-cyan-300 text-3xl">{openIndex === i ? "−" : "+"}</span>
                        </button>
                        {openIndex === i && (
                          <div className="border-t border-slate-800 bg-slate-950/90 p-6 text-sm space-y-4">
                            <p className="text-slate-300">
                              <span className="text-cyan-400 font-semibold">Answer:</span> {q.answer}
                            </p>
                            <p className="text-slate-400">
                              <span className="text-slate-300 font-semibold">Intent:</span> {q.intention}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {active === "behavioral" && (
                <>
                  <h2 className="text-3xl font-semibold text-white mb-5">Behavioral Questions</h2>
                  <div className="space-y-4">
                    {report?.behavioralQuestions.map((q, i) => (
                      <div
                        key={i}
                        className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 transition hover:border-cyan-400"
                      >
                        <p className="text-white text-lg font-medium">{q.question}</p>
                        <p className="text-slate-300 mt-3 text-sm">{q.answer}</p>
                        <p className="text-slate-400 text-sm mt-3">{q.intention}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {active === "roadmap" && (
                <>
                  <h2 className="text-3xl font-semibold text-white mb-5">Preparation Plan</h2>
                  <div className="space-y-4">
                    {report?.preparationPlan.map((day, i) => (
                      <div
                        key={i}
                        className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 transition hover:border-purple-400"
                      >
                        <p className="text-cyan-300 font-semibold">Day {day.day}</p>
                        <h3 className="text-white text-xl mt-2">{day.focus}</h3>
                        <ul className="text-slate-300 text-sm mt-4 list-disc space-y-2 pl-5">
                          {day?.tasks.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="rounded-3xl border h-fit border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-black/20">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Match Score</p>
              <div className="mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500 text-3xl font-bold text-slate-950 shadow-xl shadow-cyan-500/20">
                {report?.matchScore}
              </div>
              <p className="mt-3 text-slate-400">Your compatibility rating for this interview</p>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Top Skill Gaps</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {report?.skillGaps.map((s, i) => (
                    <span
                      key={i}
                      className={`rounded-full px-3 py-2 text-xs font-semibold ${
                        s.severity === "high"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {s.skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Quick Focus</p>
                <p className="mt-3 text-slate-300 text-sm">Use the selected section to review questions and improve your prep without ever losing momentum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      { genResume &&(
        <div className="absolute top-0 left-0 h-screen w-screen"> 
          <GenResume panelSet={setGenResume} interviewId={interviewId}/>
        </div>
      )}
    </div>
  );
};

export default Interview;