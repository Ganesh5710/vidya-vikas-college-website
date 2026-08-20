import React, { useState, useMemo } from 'react';
import { Trophy, Maximize2, X, Search, Filter, GraduationCap } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const ResultsPage = () => {
    useSEO({
        title: "Board Exam Results & Top Rankers | SVVJC Madanapalle",
        description: "Check 1st Year & 2nd Year intermediate board exam pass percentages and top student rankers at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar Extension, Madanapalle."
    });

    const { toppers } = useData();

    // Active Year Tab: '1st Year', '2nd Year', or 'all'
    const [activeYearTab, setActiveYearTab] = useState('1st Year');

    // Search and Stream Filter
    const [searchQuery, setSearchQuery] = useState('');
    const [streamFilter, setStreamFilter] = useState('all');

    // Fullscreen Poster Modal
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Format score helper
    const formatTopperScore = (marks) => {
        if (!marks && marks !== 0) return '';
        const strVal = String(marks).trim();
        if (strVal.includes('/') || strVal.includes('%')) {
            return strVal;
        }
        const numVal = parseFloat(strVal);
        if (!isNaN(numVal)) {
            if (numVal <= 100) {
                return `${numVal}%`;
            } else {
                return `${numVal} Marks`;
            }
        }
        return strVal;
    };

    // Filter results dynamically by Year Tab, Search Query, and Stream
    const filteredResults = useMemo(() => {
        return toppers.filter(item => {
            // Year Filter
            const matchesYear = activeYearTab === 'all' || item.academicYear === activeYearTab || (!item.academicYear && activeYearTab === '1st Year');

            // Stream Filter
            const matchesStream = streamFilter === 'all' || item.streamId?.toLowerCase() === streamFilter.toLowerCase();

            // Search Query Filter (Name or Roll Number)
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch = !query ||
                item.studentName?.toLowerCase().includes(query) ||
                item.rollNumber?.toLowerCase().includes(query) ||
                item.rank?.toLowerCase().includes(query);

            return matchesYear && matchesStream && matchesSearch;
        });
    }, [toppers, activeYearTab, streamFilter, searchQuery]);

    // Count records for year badges
    const count1stYear = toppers.filter(t => t.academicYear === '1st Year' || !t.academicYear).length;
    const count2ndYear = toppers.filter(t => t.academicYear === '2nd Year').length;

    return (
        <div className="space-y-8 pb-16 sm:pb-8">
      
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
                    Celebrating the outstanding achievements of SRI VIDYA VIKAS JUNIOR COLLEGE students in BIEAP 1st Year (Junior Inter) and 2nd Year (Senior Inter) Board Exams.
                </p>
            </section>

            {/* Main Interactive Results Section */}
            <section className="space-y-6">
                
                {/* 1st Year vs 2nd Year Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
                        <button
                            onClick={() => setActiveYearTab('1st Year')}
                            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                                activeYearTab === '1st Year'
                                    ? 'bg-maroon-900 text-white shadow-md'
                                    : 'text-slate-700 hover:bg-slate-200 hover:text-navy-900'
                            }`}
                        >
                            <GraduationCap className="w-4 h-4 text-amber-400"/>
                            <span>1st Year Results (Junior Inter)</span>
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                                {count1stYear}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveYearTab('2nd Year')}
                            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                                activeYearTab === '2nd Year'
                                    ? 'bg-maroon-900 text-white shadow-md'
                                    : 'text-slate-700 hover:bg-slate-200 hover:text-navy-900'
                            }`}
                        >
                            <Trophy className="w-4 h-4 text-amber-400"/>
                            <span>2nd Year Results (Senior Inter)</span>
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                                {count2ndYear}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveYearTab('all')}
                            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all whitespace-nowrap ${
                                activeYearTab === 'all'
                                    ? 'bg-navy-900 text-white shadow-md'
                                    : 'text-slate-600 hover:bg-slate-200 hover:text-navy-900'
                            }`}
                        >
                            <span>All Records</span>
                        </button>
                    </div>
                </div>

                {/* SEARCH & STREAM FILTER BAR */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[240px]">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3"/>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by Student Name, Roll Number, or Rank..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                                <X className="w-4 h-4"/>
                            </button>
                        )}
                    </div>

                    {/* Stream Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-500 shrink-0"/>
                        <select
                            value={streamFilter}
                            onChange={(e) => setStreamFilter(e.target.value)}
                            className="px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-maroon-800 outline-none bg-slate-50"
                        >
                            <option value="all">All Academic Streams</option>
                            <option value="mpc">MPC (Mathematics)</option>
                            <option value="bipc">BiPC (Biology/NEET)</option>
                            <option value="cec">CEC (Commerce/Civics)</option>
                            <option value="mec">MEC (Maths & Commerce)</option>
                            <option value="hec">HEC (History/Arts)</option>
                        </select>
                    </div>
                </div>

                {/* RESULTS CARD GRID - PERFECTLY ALIGNED PICTURES (ZERO PADDING SPACING) */}
                {filteredResults.length === 0 ? (
                    <EmptyState
                        title="No Matching Results Found"
                        description={`No ${activeYearTab === 'all' ? '' : activeYearTab} student results matched your search query or stream filter.`}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredResults.map((result) => (
                            <div key={result.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between group relative overflow-hidden">
                                
                                {/* Top Rank Banner */}
                                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                    <span className="px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-black shadow border border-amber-300 flex items-center gap-1">
                                        <Trophy className="w-3.5 h-3.5"/>
                                        <span>{result.rank || 'Board Topper'}</span>
                                    </span>

                                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-navy-900 text-white uppercase">
                                        {result.streamId ? result.streamId.toUpperCase() : 'BIEAP'}
                                    </span>
                                </div>

                                {/* Poster Container - Perfectly Aligned, Zero Gray Side Bars */}
                                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                                    {/* Crisp Full-Width Student Poster Image */}
                                    <img
                                        src={result.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                                        alt={result.studentName}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* High-res expand poster button */}
                                    {result.photoUrl && (
                                        <button
                                            onClick={() => setSelectedPhoto({ url: result.photoUrl, title: result.studentName })}
                                            className="absolute bottom-2.5 right-2.5 z-20 px-3 py-1.5 rounded-lg bg-navy-900/85 hover:bg-navy-900 text-white backdrop-blur shadow-md transition-all flex items-center gap-1.5 text-[11px] font-extrabold border border-white/20"
                                            title="Click to view full high-res poster"
                                        >
                                            <Maximize2 className="w-3.5 h-3.5 text-amber-400"/>
                                            <span>Full Poster</span>
                                        </button>
                                    )}
                                </div>

                                {/* Student Details */}
                                <div className="space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-extrabold text-navy-900 text-lg leading-tight">{result.studentName}</h4>
                                            {result.rollNumber && (
                                                <p className="text-xs font-semibold text-slate-500">Hall Ticket / Roll No: <span className="text-navy-900 font-bold">{result.rollNumber}</span></p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-black text-maroon-900 block leading-tight">
                                                {formatTopperScore(result.marksPercentage || result.marksObtained)}
                                            </span>
                                            {result.marksObtained && result.maxMarks && (
                                                <span className="text-[11px] font-bold text-slate-500">({result.marksObtained}/{result.maxMarks})</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                                        <span className="font-bold text-maroon-900 bg-maroon-50 px-2.5 py-0.5 rounded border border-maroon-100">
                                            {result.academicYear || '1st Year'}
                                        </span>
                                        <span className="font-medium text-slate-500">
                                            {result.yearSession || '2024-2025 BIEAP'}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </section>

            {/* High-Res Fullscreen Image Modal */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-4 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800">
                            <h4 className="font-extrabold text-sm text-amber-400">{selectedPhoto.title} — Official Result Poster</h4>
                            <button onClick={() => setSelectedPhoto(null)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        <div className="flex-1 bg-slate-950 p-2 flex items-center justify-center overflow-auto">
                            <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-md" />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ResultsPage;
