import React, { useState } from 'react';
import { BookOpen, Calendar, Download, ExternalLink, FileText, Search, ShieldAlert, Sparkles, CheckCircle2, XCircle, Clock, Award } from 'lucide-react';
import { INITIAL_STUDY_MATERIALS } from '../constants/collegeData';
import { useSEO } from '../hooks/useSEO';
export const StudentCornerPage = () => {
    useSEO({
        title: "Exam Timetables & Study Material | SVVJC Madanapalle",
        description: "Download BIEAP board exam timetables, hall ticket instructions, and model question papers for MPC, BiPC, CEC, MEC, HEC at SRI VIDYA VIKAS JUNIOR COLLEGE."
    });
    const [searchTerm, setSearchTerm] = useState('');
    // Daily Quiz State
    const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    // Timetable Year State
    const [activeYearTab, setActiveYearTab] = useState('1st_year');
    const quizQuestions = [
        {
            question: "Physics (Optics): The refractive index of diamond with respect to air is 2.42. What is the speed of light in diamond?",
            options: ["1.24 × 10⁸ m/s", "2.42 × 10⁸ m/s", "3.00 × 10⁸ m/s", "1.50 × 10⁸ m/s"],
            correct: 0,
            explanation: "Speed v = c / n = (3.0 × 10⁸) / 2.42 ≈ 1.24 × 10⁸ m/s."
        },
        {
            question: "Chemistry (Organic): Which of the following functional groups shows the highest priority according to IUPAC nomenclature?",
            options: ["-CHO (Aldehyde)", "-COOH (Carboxylic Acid)", "-COOR (Ester)", "-OH (Alcohol)"],
            correct: 1,
            explanation: "Carboxylic acids (-COOH) have the highest priority among the given functional groups."
        },
        {
            question: "Mathematics (Calculus): What is the derivative of f(x) = sin(x²)?",
            options: ["cos(x²)", "2x cos(x²)", "-2x cos(x²)", "2 sin(x) cos(x)"],
            correct: 1,
            explanation: "Using chain rule: d/dx[sin(x²)] = cos(x²) · d/dx[x²] = 2x cos(x²)."
        },
        {
            question: "Biology (Botany): Which plant hormone is responsible for cell elongation and apical dominance?",
            options: ["Auxin (IAA)", "Gibberellin", "Cytokinin", "Abscisic Acid"],
            correct: 0,
            explanation: "Auxin (Indole-3-acetic acid) promotes apical dominance and cell elongation in shoot tips."
        },
        {
            question: "Commerce / Econ: Inflation caused by an increase in input production costs is called:",
            options: ["Demand-pull inflation", "Cost-push inflation", "Hyperinflation", "Stagflation"],
            correct: 1,
            explanation: "Cost-push inflation occurs when raw material or labor costs drive up overall price levels."
        }
    ];
    const handleAnswerOption = (optionIdx) => {
        setSelectedAnswer(optionIdx);
        if (optionIdx === quizQuestions[currentQuizIdx].correct) {
            setScore(score + 1);
        }
    };
    const handleNextQuestion = () => {
        if (currentQuizIdx < quizQuestions.length - 1) {
            setCurrentQuizIdx(currentQuizIdx + 1);
            setSelectedAnswer(null);
        }
        else {
            setQuizFinished(true);
        }
    };
    const timetableSchedule = {
        '1st_year': [
            { period: '09:00 - 09:50 AM', mpc: 'Mathematics-1A', bipc: 'Botany', cec: 'Civics-1' },
            { period: '09:50 - 10:40 AM', mpc: 'Physics', bipc: 'Zoology', cec: 'Economics-1' },
            { period: '10:50 - 11:40 AM', mpc: 'Chemistry', bipc: 'Chemistry', cec: 'Commerce-1' },
            { period: '11:40 - 12:30 PM', mpc: 'Mathematics-1B', bipc: 'Physics', cec: 'English-1' },
            { period: '01:30 - 04:00 PM', mpc: 'Physics Lab (Batch A) / JEE Prep', bipc: 'Bio Lab (Batch B) / NEET Prep', cec: 'Commerce Lab / CA Prep' },
        ],
        '2nd_year': [
            { period: '09:00 - 09:50 AM', mpc: 'Mathematics-2A', bipc: 'Botany-2', cec: 'Civics-2' },
            { period: '09:50 - 10:40 AM', mpc: 'Physics-2', bipc: 'Zoology-2', cec: 'Economics-2' },
            { period: '10:50 - 11:40 AM', mpc: 'Chemistry-2', bipc: 'Chemistry-2', cec: 'Commerce-2' },
            { period: '11:40 - 12:30 PM', mpc: 'Mathematics-2B', bipc: 'Physics-2', cec: 'Sanskrit/Telugu-2' },
            { period: '01:30 - 04:00 PM', mpc: 'Chemistry Lab (Batch C) / EAMCET', bipc: 'Zoology Lab (Batch D) / NEET', cec: 'Accountancy Lab' },
        ]
    };
    const filteredMaterials = INITIAL_STUDY_MATERIALS.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
          <BookOpen className="w-4 h-4"/>
          <span>STUDENT & EXAM CORNER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Exam Timetables & Study Materials
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Access official BIEAP board exam schedules, model question papers, hall ticket instructions, daily entrance quizzes, and practical lab timetables.
        </p>
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6"/>
          </div>
          <h3 className="font-bold text-navy-900 text-base">Exam Timetables</h3>
          <p className="text-xs text-slate-600">Download BIEAP Board & Unit Test schedules in PDF format.</p>
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Exam timetable PDF download initiated."); }} className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:underline pt-1">
            <Download className="w-3.5 h-3.5"/>
            <span>Download BIEAP Schedule PDF</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6"/>
          </div>
          <h3 className="font-bold text-navy-900 text-base">Seating & Hall Tickets</h3>
          <p className="text-xs text-slate-600">Check exam room numbers and hall ticket distribution guidelines.</p>
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Hall ticket instructions: Collect physical admit card from Exam Cell desk."); }} className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:underline pt-1">
            <span>View Hall Ticket Rules</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ExternalLink className="w-6 h-6"/>
          </div>
          <h3 className="font-bold text-navy-900 text-base">BIEAP Results Portal</h3>
          <p className="text-xs text-slate-600">Direct portal links for BIEAP Andhra Pradesh Board exam results.</p>
          <a href="https://bieap.apcfss.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline pt-1">
            <span>Visit BIEAP Official Site</span>
            <ExternalLink className="w-3 h-3"/>
          </a>
        </div>

      </section>

      {/* FEATURE 5: DAILY EAMCET / NEET / JEE PRACTICE QUIZ WIDGET */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-maroon-900 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-navy-900">Daily EAMCET, NEET & JEE Practice Quiz</h3>
              <p className="text-xs text-slate-500">Test your conceptual knowledge with daily entrance exam questions</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
            5 Questions • Instant Explanations
          </span>
        </div>

        {!quizFinished ? (<div className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Question {currentQuizIdx + 1} of {quizQuestions.length}</span>
              <span className="text-maroon-900 font-extrabold">Current Score: {score} Points</span>
            </div>

            <h4 className="font-extrabold text-navy-900 text-base leading-relaxed">
              {quizQuestions[currentQuizIdx].question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {quizQuestions[currentQuizIdx].options.map((opt, idx) => {
                let btnStyle = "bg-white text-slate-800 border-slate-200 hover:bg-slate-100";
                if (selectedAnswer !== null) {
                    if (idx === quizQuestions[currentQuizIdx].correct) {
                        btnStyle = "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold";
                    }
                    else if (idx === selectedAnswer) {
                        btnStyle = "bg-red-100 text-red-900 border-red-400 font-bold";
                    }
                }
                return (<button key={idx} disabled={selectedAnswer !== null} onClick={() => handleAnswerOption(idx)} className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}>
                    <span>{opt}</span>
                    {selectedAnswer !== null && idx === quizQuestions[currentQuizIdx].correct && (<CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0"/>)}
                    {selectedAnswer !== null && idx === selectedAnswer && idx !== quizQuestions[currentQuizIdx].correct && (<XCircle className="w-4 h-4 text-red-600 shrink-0"/>)}
                  </button>);
            })}
            </div>

            {selectedAnswer !== null && (<div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2 animate-in fade-in">
                <p className="font-bold text-navy-900">💡 Explanation:</p>
                <p className="text-slate-600 leading-relaxed">{quizQuestions[currentQuizIdx].explanation}</p>
                
                <div className="pt-2 flex justify-end">
                  <button onClick={handleNextQuestion} className="px-5 py-2 rounded-lg bg-navy-900 text-white font-bold text-xs">
                    {currentQuizIdx < quizQuestions.length - 1 ? 'Next Question →' : 'See Final Score'}
                  </button>
                </div>
              </div>)}
          </div>) : (<div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-amber-500 text-navy-950 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow">
              <Award className="w-8 h-8"/>
            </div>
            <h4 className="text-2xl font-extrabold text-navy-900">Quiz Completed!</h4>
            <p className="text-sm font-bold text-maroon-900">
              You scored {score} out of {quizQuestions.length} ({((score / quizQuestions.length) * 100).toFixed(0)}%)
            </p>
            <button onClick={() => {
                setCurrentQuizIdx(0);
                setSelectedAnswer(null);
                setScore(0);
                setQuizFinished(false);
            }} className="px-6 py-2.5 rounded-xl bg-maroon-900 text-white font-bold text-xs">
              Retake Daily Practice Quiz
            </button>
          </div>)}
      </section>

      {/* FEATURE 6: INTERACTIVE CLASS TIMETABLE & LAB BATCH VIEWER */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-maroon-800"/>
            <div>
              <h3 className="text-2xl font-extrabold text-navy-900">Class Timetable & Practical Lab Batches</h3>
              <p className="text-xs text-slate-500">Day-wise period breakdown for Intermediate 1st & 2nd Year</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setActiveYearTab('1st_year')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeYearTab === '1st_year' ? 'bg-maroon-900 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>
              Class 11 (1st Year)
            </button>
            <button onClick={() => setActiveYearTab('2nd_year')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeYearTab === '2nd_year' ? 'bg-maroon-900 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>
              Class 12 (2nd Year)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-navy-900 text-white font-bold">
                <th className="p-3 rounded-tl-lg">Period & Time</th>
                <th className="p-3">MPC Stream</th>
                <th className="p-3">BiPC Stream</th>
                <th className="p-3 rounded-tr-lg">CEC / MEC Stream</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {timetableSchedule[activeYearTab].map((row, idx) => (<tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-navy-900">{row.period}</td>
                  <td className="p-3 text-slate-700 font-semibold">{row.mpc}</td>
                  <td className="p-3 text-slate-700 font-semibold">{row.bipc}</td>
                  <td className="p-3 text-slate-700 font-semibold">{row.cec}</td>
                </tr>))}
            </tbody>
          </table>
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
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
              <input type="text" placeholder="Search subject or topic..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none w-56"/>
            </div>
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
              {filteredMaterials.map((mat) => (<tr key={mat.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-navy-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-maroon-800 shrink-0"/>
                    <span>{mat.title}</span>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{mat.subject}</td>
                  <td className="p-3 text-slate-600 font-mono">{mat.year}</td>
                  <td className="p-3 text-slate-500">{mat.fileSize}</td>
                  <td className="p-3">
                    <button onClick={() => alert(`Downloading ${mat.title}...`)} className="px-3 py-1.5 rounded bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-[11px] flex items-center gap-1 transition-colors">
                      <Download className="w-3 h-3 text-amber-400"/>
                      <span>Download PDF</span>
                    </button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </section>

    </div>);
};
