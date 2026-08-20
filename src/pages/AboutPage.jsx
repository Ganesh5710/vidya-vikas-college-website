import React from 'react';
import { Building2, Target, History, ShieldCheck, Users } from 'lucide-react';
import { COLLEGE_DETAILS } from '../constants/collegeData';
import { useSEO } from '../hooks/useSEO';
export const AboutPage = () => {
    useSEO({
        title: "About Us | SRI VIDYA VIKAS JUNIOR COLLEGE Madanapalle",
        description: "Learn about the history, vision, mission, and BIEAP board recognition of SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle."
    });
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
            <Building2 className="w-4 h-4"/>
            <span>ESTABLISHED NOVEMBER 2024</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About SRI VIDYA VIKAS JUNIOR COLLEGE
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Located in Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College), delivering excellence in Class 11 & Class 12 education, character building, and entrance exam preparation.
          </p>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6"/>
          </div>
          <h3 className="text-xl font-bold text-navy-900">Our Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            To be recognized as a premier intermediate educational institution in Madanapalle and Chittoor region, empowering young minds with strong academic foundations, ethical values, and competitive edge to succeed in higher education and professional careers.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6"/>
          </div>
          <h3 className="text-xl font-bold text-navy-900">Our Mission</h3>
          <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside leading-relaxed">
            <li>Provide rigorous BIEAP board exam preparation across MPC, BiPC, CEC, MEC, HEC streams.</li>
            <li>Deliver integrated coaching for EAMCET, NEET, and JEE Main from Day 1.</li>
            <li>Maintain state-of-the-art laboratories and a nurturing learning environment.</li>
            <li>Ensure holistic personal development and career guidance for every student.</li>
          </ul>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <History className="w-6 h-6 text-maroon-800"/>
          <div>
            <h3 className="text-xl font-bold text-navy-900">College History & Growth</h3>
            <p className="text-xs text-slate-500">Milestones of SRI VIDYA VIKAS JUNIOR COLLEGE</p>
          </div>
        </div>

        <div className="space-y-6 relative border-l-2 border-slate-200 ml-4 pl-6">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-maroon-900 border-2 border-white"></div>
            <span className="text-xs font-extrabold text-maroon-900 bg-maroon-100 px-2.5 py-0.5 rounded">
              November 2024
            </span>
            <h4 className="font-bold text-navy-900 text-base mt-1">Founding & Establishment</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              SRI VIDYA VIKAS JUNIOR COLLEGE was officially established in Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College) with modern classroom infrastructure and laboratory setup.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white"></div>
            <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">
              Academic Year 2024-2025
            </span>
            <h4 className="font-bold text-navy-900 text-base mt-1">BIEAP Affiliation & First Batch</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Commenced classes for First & Second Year Intermediate students across MPC, BiPC, CEC, MEC, and HEC streams with a stellar 5.0-star rating based on 45 reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Board Affiliation & Management Committee */}
      <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-navy-900"/>
            <div>
              <h3 className="text-xl font-bold text-navy-900">Board Affiliation & Management</h3>
              <p className="text-xs text-slate-500">Board of Intermediate Education, Andhra Pradesh (BIEAP)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy-900">Principal & Correspondent</p>
            <p className="text-maroon-900 font-extrabold">{COLLEGE_DETAILS.principalName}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy-900">Board Recognition</p>
            <p className="text-slate-600">{COLLEGE_DETAILS.boardAffiliation}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy-900">Institution Location</p>
            <p className="text-slate-600">Prasanth Nagar Extension, Madanapalle</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy-900">Public Rating</p>
            <p className="text-amber-600 font-bold">5.0 Stars (45 Reviews)</p>
          </div>
        </div>
      </section>

    </div>);
};
