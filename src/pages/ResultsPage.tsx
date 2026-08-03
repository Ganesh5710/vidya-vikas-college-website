import React from 'react';
import { Award, Trophy, CheckCircle } from 'lucide-react';
import { INITIAL_STREAM_SUMMARY, INITIAL_TOPPERS } from '../constants/collegeData';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const ResultsPage: React.FC = () => {
  useSEO({
    title: "Board Exam Results & Top Rankers | SVVJC Madanapalle",
    description: "Check intermediate board exam pass percentages and top student rankers at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle."
  });

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
          <Trophy className="w-4 h-4" />
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
          <Award className="w-5 h-5 text-maroon-800" />
          <span>Stream-Wise Pass Percentage (2024-2025)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INITIAL_STREAM_SUMMARY.map((sum) => (
            <div key={sum.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded bg-navy-900 text-white">
                {sum.streamId ? sum.streamId.toUpperCase() : 'Overall College'}
              </span>
              <h4 className="text-4xl font-extrabold text-maroon-900">{sum.passPercentage}%</h4>
              <p className="text-xs text-slate-500 font-medium">Pass Percentage ({sum.academicYear})</p>
              <div className="pt-2 text-[11px] text-slate-600 flex justify-center gap-4 border-t border-slate-100">
                <span>Appeared: {sum.totalAppeared || 75}</span>
                <span>Passed: {sum.totalPassed || 74}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Toppers Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-900">College Top Rankers</h3>
            <p className="text-xs text-slate-500">Board Exam High Scorers & Competitive Exam Qualifiers</p>
          </div>
          <PlaceholderBadge checklistRef="Section 4 - Pass Percentage & Topper List" note="Topper List Flagged for Principal's Office Sign-off" />
        </div>

        {INITIAL_TOPPERS.length === 0 ? (
          <EmptyState 
            title="Toppers List Pending Official Approval"
            description="The verified list of board exam toppers and competitive exam rankers is currently undergoing sign-off by the Principal's Office."
            checklistRef="Section 4 - Pass Percentage & Topper List (last 2-3 yrs)"
            responsibleStaff="Exam Cell & Principal's Office"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TOPPERS.map((topper) => (
              <div key={topper.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={topper.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"} 
                    alt={topper.studentName}
                    className="w-full h-48 rounded-xl object-cover border"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-navy-950 font-extrabold text-xs px-2.5 py-1 rounded shadow">
                    {topper.marksPercentage}%
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-maroon-100 text-maroon-900">
                    {topper.rank}
                  </span>
                  <h4 className="font-extrabold text-navy-900 text-base pt-1">{topper.studentName}</h4>
                  <p className="text-xs text-slate-600 font-medium">{topper.examName}</p>
                </div>

                {topper.isCompetitiveQualifier && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Competitive Exam Ranker</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100">
                  <PlaceholderBadge checklistRef={topper.checklistRef} note={topper.note} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
