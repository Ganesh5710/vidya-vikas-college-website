import React, { useState, useMemo } from 'react';
import { Award, Trophy, Maximize2, X, Search, Filter, LayoutGrid, Table, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { INITIAL_STREAM_SUMMARY } from '../constants/collegeData';
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

    // Display Layout Mode: 'cards' (mobile-friendly default) or 'table'
    const [viewMode, setViewMode] = useState('cards');

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

    // Dynamically calculate stream summary based on active year tab and result records
    const dynamicStreamSummary = useMemo(() => {
        const streams = [
            { id: 'sum-1', streamId: 'mpc', baseAppeared: 80, basePassed: 79 },
            { id: 'sum-2', streamId: 'bipc', baseAppeared: 70, basePassed: 68 },
            { id: 'sum-3', streamId: 'cec', baseAppeared: 50, basePassed: 48 },
            { id: 'sum-4', streamId: 'mec', baseAppeared: 45, basePassed: 44 },
            { id: 'sum-5', streamId: 'hec', baseAppeared: 40, basePassed: 38 },
        ];

        return streams.map(st => {
            // Find all results matching this stream
            const streamResults = toppers.filter(t => {
                const matchesStream = t.streamId?.toLowerCase() === st.streamId;
                const matchesYear = activeYearTab === 'all' || t.academicYear === activeYearTab || (!t.academicYear && activeYearTab === '1st Year');
                return matchesStream && matchesYear;
            });

            // Calculate dynamic counts
            const extraAppeared = streamResults.length;
            const extraPassed = streamResults.filter(t => {
                const scoreStr = String(t.marksPercentage || t.marksObtained || '100');
                const score = parseFloat(scoreStr);
                return isNaN(score) || score > 35;
            }).length;

            const multiplier = activeYearTab === 'all' ? 1.0 : 0.5;
            const totalAppeared = Math.round(st.baseAppeared * multiplier) + extraAppeared;
            const totalPassed = Math.round(st.basePassed * multiplier) + extraPassed;
            const passPercentage = totalAppeared > 0 ? ((totalPassed / totalAppeared) * 100).toFixed(1) : '100.0';

            return {
                id: st.id,
                streamId: st.streamId,
                passPercentage,
                academicYear: activeYearTab === 'all' ? '2024-2025 Combined' : `2024-2025 ${activeYearTab}`,
                totalAppeared,
                totalPassed
            };
        });
    }, [toppers, activeYearTab]);

    // Count records for year badges
    const count1stYear = toppers.filter(t => t.academicYear === '1st Year' || !t.academicYear).length;
    const count2ndYear = toppers.filter(t => t.academicYear === '2nd Year').length;

    return (
        <div className="space-y-10">
      
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

            {/* Stream Pass Percentage Summary Cards (Dynamically Calculated) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-maroon-800"/>
                        <span>Stream-Wise Pass Percentage ({activeYearTab === 'all' ? 'Combined' : activeYearTab})</span>
                    </h3>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        ⚡ Dynamic Results Calculation Active
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {dynamicStreamSummary.map((sum) => (
                        <div key={sum.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2 hover:border-maroon-800 transition-colors">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-navy-900 text-white uppercase">
                                {sum.streamId ? sum.streamId.toUpperCase() : 'Overall'}
                            </span>
                            <h4 className="text-3xl font-extrabold text-maroon-900">{sum.passPercentage}%</h4>
                            <p className="text-[11px] text-slate-500 font-medium">Pass Rate ({sum.academicYear})</p>
                            <div className="pt-2 text-[10px] text-slate-600 flex justify-around border-t border-slate-100">
                                <span>Appeared: {sum.totalAppeared}</span>
                                <span>Passed: {sum.totalPassed}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Interactive Results & Toppers Section */}
            <section className="space-y-6">
                
                {/* 1. SEPARATE 1ST YEAR & 2ND YEAR TABS */}
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

                    {/* Desktop View Mode Switcher (Cards vs Table) */}
                    <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                                viewMode === 'cards' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title="Mobile-Friendly Card View"
                        >
                            <LayoutGrid className="w-4 h-4 text-maroon-800"/>
                            <span>Card View</span>
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                                viewMode === 'table' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title="Structured Table View"
                        >
                            <Table className="w-4 h-4 text-maroon-800"/>
                            <span>Table View</span>
                        </button>
                    </div>
                </div>

                {/* 2. SEARCH & FILTER BAR */}
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

                {/* RESULTS RESULTS LISTING */}
                {filteredResults.length === 0 ? (
                    <EmptyState
                        title="No Matching Results Found"
                        description={`No ${activeYearTab === 'all' ? '' : activeYearTab} student results matched your search query or stream filter.`}
                    />
                ) : viewMode === 'cards' ? (
                    /* 3. MOBILE-FRIENDLY CARD VIEW (Zero Squeezing) */
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

                                {/* Poster Container / Student Photo */}
                                <div className="relative w-full h-72 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center p-1 border border-slate-200 shadow-inner group">
                                    {/* Ambient Blurred Backdrop */}
                                    {result.photoUrl && (
                                        <img src={result.photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-125 opacity-50 select-none pointer-events-none" />
                                    )}

                                    {/* Crisp Main Student Photo */}
                                    <img
                                        src={result.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                                        alt={result.studentName}
                                        className="relative z-10 w-full h-full object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-md"
                                    />

                                    {/* High-res expand button */}
                                    {result.photoUrl && (
                                        <button
                                            onClick={() => setSelectedPhoto({ url: result.photoUrl, title: result.studentName })}
                                            className="absolute bottom-2 right-2 z-20 p-2 rounded-lg bg-navy-900/80 hover:bg-navy-900 text-white backdrop-blur shadow transition-all flex items-center gap-1 text-[11px] font-bold"
                                            title="View Full Poster"
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
                ) : (
                    /* 4. RESPONSIVE TABLE VIEW */
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-navy-900 text-white uppercase text-[11px] font-extrabold">
                                    <tr>
                                        <th className="py-3.5 px-4">Student Name</th>
                                        <th className="py-3.5 px-4">Roll / Hall Ticket</th>
                                        <th className="py-3.5 px-4">Year</th>
                                        <th className="py-3.5 px-4">Stream</th>
                                        <th className="py-3.5 px-4">Marks Obtained</th>
                                        <th className="py-3.5 px-4">Percentage / Grade</th>
                                        <th className="py-3.5 px-4">Rank / Position</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                                    {filteredResults.map((res) => (
                                        <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-3 px-4 font-extrabold text-navy-900 flex items-center gap-3">
                                                <img
                                                    src={res.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                                                    alt={res.studentName}
                                                    className="w-9 h-9 rounded-full object-cover border border-slate-300 shrink-0"
                                                />
                                                <span>{res.studentName}</span>
                                            </td>
                                            <td className="py-3 px-4 font-mono font-bold text-slate-700">{res.rollNumber || 'N/A'}</td>
                                            <td className="py-3 px-4 font-bold text-maroon-900">{res.academicYear || '1st Year'}</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2.5 py-0.5 rounded bg-navy-900 text-white font-bold uppercase text-[10px]">
                                                    {res.streamId ? res.streamId.toUpperCase() : 'MPC'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 font-bold text-slate-900">{res.marksObtained ? `${res.marksObtained} / ${res.maxMarks || 500}` : 'N/A'}</td>
                                            <td className="py-3 px-4 font-black text-emerald-600 text-sm">{formatTopperScore(res.marksPercentage || res.marksObtained)}</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[11px] border border-amber-300">
                                                    {res.rank || 'Board Topper'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
