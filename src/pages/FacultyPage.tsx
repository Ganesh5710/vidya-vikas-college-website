import React, { useState } from 'react';
import { Users, Mail, Briefcase, GraduationCap, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const FacultyPage: React.FC = () => {
  useSEO({
    title: "Faculty Directory | SRI VIDYA VIKAS JUNIOR COLLEGE Madanapalle",
    description: "Meet the experienced educators, lecturers, and competitive exam mentors at SRI VIDYA VIKAS JUNIOR COLLEGE in Prasanth Nagar, Madanapalle."
  });

  const { faculty } = useData();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredFaculty = selectedSubject === 'all'
    ? faculty
    : faculty.filter(f => f.subject.toLowerCase().includes(selectedSubject.toLowerCase()));

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <Users className="w-4 h-4" />
          <span>EXPERIENCED EDUCATORS & SUBJECT MENTORS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Faculty Directory
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Our dedicated educators at SRI VIDYA VIKAS JUNIOR COLLEGE are committed to academic rigor, conceptual clarity, and individual student guidance in Prasanth Nagar, Madanapalle.
        </p>
      </section>

      {/* Filter Options */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          Filter by Subject:
        </span>
        {['all', 'physics', 'mathematics', 'chemistry', 'biology', 'commerce'].map((subj) => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
              selectedSubject === subj
                ? 'bg-maroon-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Faculty Cards Grid or Empty State */}
      {filteredFaculty.length === 0 ? (
        <EmptyState 
          title="No Faculty Records Added Yet"
          description="Faculty profiles posted via the Staff Control Panel will instantly appear here."
          checklistRef="Section 4 - Faculty Details Spreadsheet"
          responsibleStaff="Department Heads & Principal's Office"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={member.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow"
                  />
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 capitalize">
                      {member.subject}
                    </span>
                    <h3 className="text-lg font-extrabold text-navy-900 mt-1">{member.name}</h3>
                    <p className="text-xs text-maroon-900 font-semibold">{member.designation}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{member.qualification}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{member.experienceYears}+ Years Teaching Experience</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{member.email}</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <PlaceholderBadge checklistRef="Section 4 - Faculty Details Spreadsheet" note="Faculty Details Confirmed" />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
