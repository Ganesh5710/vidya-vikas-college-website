import React, { useState } from 'react';
import { Award, Trophy, Maximize2, X } from 'lucide-react';
import { INITIAL_STREAM_SUMMARY } from '../constants/collegeData';
import { useData } from '../context/DataContext';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';
export const ResultsPage = () => {
    useSEO({
        title: "Board Exam Results & Top Rankers | SVVJC Madanapalle",
        description: "Check intermediate board exam pass percentages and top student rankers at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle."
    });
    const { toppers } = useData();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    // Smart score formatting function
    const formatTopperScore = (marks) => {
        if (!marks && marks !== 0)
            return '';
        const strVal = String(marks).trim();
        if (strVal.includes('/') || strVal.includes('%')) {
            return strVal;
        }
        const numVal = parseFloat(strVal);
        if (!isNaN(numVal)) {
            if (numVal <= 100) {
                return `${numVal}%`;
            }
            else {
                return `${numVal} Marks`;
            }
        }
        return strVal;
    };
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
          <Trophy className="w-4 h-4"/>
          <span>ACADEMIC EXCELLENCE & TOPPERS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Board Exam Results & Top Rankers
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Celebrating the outstanding achievements of SRI VIDYA VIKAS JUNIOR COLLEGE students in BIEAP Board Exams, EAMCET, NEET, and JEE Main.
        </p>
      </section>

      {/* Stream Pass Percentage Summary Cards */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-maroon-800"/>
          <span>Stream-Wise Pass Percentage (2024-2025)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INITIAL_STREAM_SUMMARY.map((sum) => (<div key={sum.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded bg-navy-900 text-white">
                {sum.streamId ? sum.streamId.toUpperCase() : 'Overall College'}
              </span>
              <h4 className="text-4xl font-extrabold text-maroon-900">{sum.passPercentage}%</h4>
              <p className="text-xs text-slate-500 font-medium">Pass Percentage ({sum.academicYear})</p>
              <div className="pt-2 text-[11px] text-slate-600 flex justify-center gap-4 border-t border-slate-100">
                <span>Appeared: {sum.totalAppeared || 75}</span>
                <span>Passed: {sum.totalPassed || 74}</span>
              </div>
            </div>))}
        </div>
      </section>

      {/* Student Toppers Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-900">College Top Rankers</h3>
            <p className="text-xs text-slate-500">Board Exam High Scorers & Competitive Exam Qualifiers</p>
          </div>
        </div>

        {toppers.length === 0 ? (<EmptyState title="No Topper Records Added Yet" description="Board exam toppers posted via the Staff Control Panel will instantly appear here."/>) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {toppers.map((topper) => (<div key={topper.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
                
                {/* Poster Container with Ambient Blurred Backdrop */}
                <div className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center p-1 group border border-slate-200 shadow-inner">
                  {/* Ambient Blurred Image Backdrop */}
                  {topper.photoUrl && (<img src={topper.photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-125 opacity-50 select-none pointer-events-none"/>)}

                  {/* Main Crisp Poster Image */}
                  <img src={topper.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"} alt={topper.studentName} className="relative z-10 w-full h-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-md"/>

                  {/* Score Tag */}
                  <div className="absolute top-3 right-3 z-20 bg-amber-500 text-navy-950 font-black text-xs px-3 py-1 rounded-full shadow border border-amber-300">
                    {formatTopperScore(topper.marksPercentage)}
                  </div>

                  {/* Fullscreen Expand Icon Button */}
                  <button onClick={() => setSelectedPhoto({ url: topper.photoUrl, title: topper.studentName })} className="absolute bottom-3 right-3 z-20 p-2 rounded-lg bg-navy-900/80 hover:bg-navy-900 text-white backdrop-blur shadow transition-all flex items-center gap-1 text-[11px] font-bold" title="Click to view full high-res poster">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400"/>
                    <span>View Full Poster</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-maroon-100 text-maroon-900 border border-maroon-200">
                    {topper.rank}
                  </span>
                  <h4 className="font-extrabold text-navy-900 text-lg pt-1">{topper.studentName}</h4>
                </div>

              </div>))}
          </div>)}
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL FOR POSTERS */}
      {selectedPhoto && (<div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            
            <button onClick={() => setSelectedPhoto(null)} className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 font-bold flex items-center gap-1 text-xs">
              <X className="w-6 h-6"/>
              <span>Close</span>
            </button>

            <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-h-[80vh] w-auto object-contain rounded-2xl border-2 border-white/20 shadow-2xl"/>

            <p className="text-white text-sm font-bold mt-3 text-center">
              {selectedPhoto.title} — Official Poster
            </p>
          </div>
        </div>)}

    </div>);
};
