import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, GraduationCap, ArrowRight } from 'lucide-react';
import { INITIAL_STREAMS } from '../constants/collegeData';
import { useSEO } from '../hooks/useSEO';
export const StreamsPage = ({ setActiveTab }) => {
    useSEO({
        title: "Intermediate Streams (MPC, BiPC, CEC, MEC, HEC) | SVVJC Madanapalle",
        description: "Detailed subject structure, eligibility, cut-off marks, and career paths for MPC, BiPC, CEC, MEC, and HEC streams at SRI VIDYA VIKAS JUNIOR COLLEGE."
    });
    const [selectedStreamId, setSelectedStreamId] = useState('mpc');
    const activeStream = INITIAL_STREAMS.find(s => s.id === selectedStreamId) || INITIAL_STREAMS[0];
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <BookOpen className="w-4 h-4"/>
          <span>ACADEMIC PROGRAMS (CLASS 11 & CLASS 12)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Intermediate Streams & Subject Structure
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          SRI VIDYA VIKAS JUNIOR COLLEGE offers comprehensive coaching in MPC, BiPC, CEC, MEC, and HEC streams aligned with the Board of Intermediate Education, Andhra Pradesh (BIEAP).
        </p>
      </section>

      {/* Stream Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-slate-200">
        {INITIAL_STREAMS.map((s) => (<button key={s.id} onClick={() => setSelectedStreamId(s.id)} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${selectedStreamId === s.id
                ? 'bg-maroon-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
            {s.name} ({s.fullName.split(',')[0]}...)
          </button>))}
      </div>

      {/* Active Stream Details Card */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-maroon-900 bg-maroon-100 px-3 py-1 rounded">
              {activeStream.name} Stream
            </span>
            <h3 className="text-2xl font-extrabold text-navy-900 mt-2">{activeStream.fullName}</h3>
            <p className="text-xs text-slate-500 mt-1">BIEAP 2-Year Intermediate Course</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Subjects Offered */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-maroon-800"/>
              Subjects Covered
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {activeStream.subjects.map((sub, idx) => (<li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0"/>
                  <span>{sub}</span>
                </li>))}
            </ul>
          </div>

          {/* Eligibility & Career Paths */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-navy-900 text-xs uppercase tracking-wider text-slate-500">
                Eligibility Criteria
              </h4>
              <p className="text-xs font-semibold text-slate-800">{activeStream.eligibility}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <h4 className="font-bold text-navy-900 text-xs uppercase tracking-wider text-slate-500">
                Career Paths & Competitive Exams
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">{activeStream.careerPaths}</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-semibold">
                <Clock className="w-4 h-4 text-amber-600"/>
                <span>{activeStream.timetable}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-slate-500">
            Need guidance choosing between {activeStream.name} and other streams? Speak with our admission counselors.
          </p>
          <button onClick={() => setActiveTab('admissions')} className="px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs flex items-center gap-2 transition-transform hover:scale-105">
            <span>Apply for {activeStream.name} Stream</span>
            <ArrowRight className="w-4 h-4 text-amber-400"/>
          </button>
        </div>
      </section>

      {/* Stream Comparison Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-navy-900">All Streams Overview</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_STREAMS.map((st) => (<div key={st.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-maroon-100 text-maroon-900">
                  {st.name}
                </span>
                <GraduationCap className="w-4 h-4 text-slate-400"/>
              </div>
              <h4 className="font-bold text-navy-900 text-base">{st.fullName}</h4>
              <p className="text-xs text-slate-600">{st.careerPaths}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                Eligibility: {st.eligibility}
              </div>
            </div>))}
        </div>
      </section>

    </div>);
};
