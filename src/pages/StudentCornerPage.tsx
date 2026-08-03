import React, { useState } from 'react';
import { BookOpen, Calendar, Download, ExternalLink, FileText, Search, ShieldAlert } from 'lucide-react';
import { INITIAL_STUDY_MATERIALS } from '../constants/collegeData';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { useSEO } from '../hooks/useSEO';

export const StudentCornerPage: React.FC = () => {
  useSEO({
    title: "Exam Timetables & Study Material | SVVJC Madanapalle",
    description: "Download BIEAP board exam timetables, hall ticket instructions, and model question papers for MPC, BiPC, CEC, MEC, HEC at SRI VIDYA VIKAS JUNIOR COLLEGE."
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = INITIAL_STUDY_MATERIALS.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
          <BookOpen className="w-4 h-4" />
          <span>STUDENT & EXAM CORNER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Exam Timetables & Study Materials
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Access official BIEAP board exam schedules, model question papers, hall ticket instructions, and results links for SRI VIDYA VIKAS JUNIOR COLLEGE students.
        </p>
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-navy-900 text-base">Exam Timetables</h3>
          <p className="text-xs text-slate-600">Download BIEAP Board & Unit Test schedules in PDF format.</p>
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Exam timetable PDF download initiated."); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:underline pt-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download BIEAP Schedule PDF</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-navy-900 text-base">Seating & Hall Tickets</h3>
          <p className="text-xs text-slate-600">Check exam room numbers and hall ticket distribution guidelines.</p>
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Hall ticket instructions: Collect physical admit card from Exam Cell desk."); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:underline pt-1"
          >
            <span>View Hall Ticket Rules</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ExternalLink className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-navy-900 text-base">BIEAP Results Portal</h3>
          <p className="text-xs text-slate-600">Direct portal links for BIEAP Andhra Pradesh Board exam results.</p>
          <a 
            href="https://bieap.apcfss.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline pt-1"
          >
            <span>Visit BIEAP Official Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </section>

      {/* Model Question Papers & Study Materials Table */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-900">Model Question Papers & Study Notes</h3>
            <p className="text-xs text-slate-500">Organized by subject for MPC, BiPC, CEC, MEC, and HEC</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search subject or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none w-56"
              />
            </div>
            <PlaceholderBadge checklistRef="Section 4 - Model / Previous Question Papers" note="Folder of PDFs Flagged for Upload" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-navy-900 text-white font-bold">
                <th className="p-3 rounded-tl-lg">Resource Title</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Year</th>
                <th className="p-3">File Size</th>
                <th className="p-3 rounded-tr-lg">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-navy-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-maroon-800 shrink-0" />
                    <span>{mat.title}</span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{mat.subject}</td>
                  <td className="p-3 text-slate-600 font-mono">{mat.year}</td>
                  <td className="p-3 text-slate-500">{mat.fileSize}</td>
                  <td className="p-3">
                    <button
                      onClick={() => alert(`Downloading ${mat.title}...`)}
                      className="px-3 py-1.5 rounded bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3 text-amber-400" />
                      <span>Download PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
