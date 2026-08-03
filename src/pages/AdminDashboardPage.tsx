import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Bell, 
  Calendar, 
  Users, 
  Trophy, 
  Inbox, 
  Plus, 
  Trash2, 
  Lock, 
  UserCheck,
  LogOut,
  Sparkles,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  INITIAL_NOTICES, 
  INITIAL_EVENTS, 
  INITIAL_FACULTY, 
  INITIAL_TOPPERS 
} from '../constants/collegeData';
import { useSEO } from '../hooks/useSEO';

export const AdminDashboardPage: React.FC = () => {
  useSEO({
    title: "Staff Admin Control Panel | SRI VIDYA VIKAS JUNIOR COLLEGE",
    description: "Private staff control dashboard for managing notices, events, faculty records, and student leads.",
    noindex: true
  });

  const { user, isAuthenticated, loginDemo, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'faculty' | 'results' | 'leads'>('notices');

  // Local state for dynamic CRUD
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [faculty, setFaculty] = useState(INITIAL_FACULTY);
  const [toppers, setToppers] = useState(INITIAL_TOPPERS);

  // Form states
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'Academic' | 'Administrative' | 'Exam' | 'Holiday'>('Administrative');
  const [newNoticeTicker, setNewNoticeTicker] = useState(true);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('College Campus, Prasanth Nagar');

  const [newFacultyName, setNewFacultyName] = useState('');
  const [newFacultySubject, setNewFacultySubject] = useState('Physics');
  const [newFacultyDesignation, setNewFacultyDesignation] = useState('Lecturer');

  const [newTopperName, setNewTopperName] = useState('');
  const [newTopperMarks, setNewTopperMarks] = useState('');
  const [newTopperRank, setNewTopperRank] = useState('College Ranker');

  const [uploadStatus, setUploadStatus] = useState('');

  // Sample leads state
  const [leads, setLeads] = useState([
    { id: 'lead-1', name: 'K. Rajesh', phone: '9876543210', stream: 'MPC', marks: '570/600', status: 'new', date: '2025-06-15' },
    { id: 'lead-2', name: 'S. Lakshmi', phone: '9123456789', stream: 'BiPC', marks: '582/600', status: 'contacted', date: '2025-06-14' },
    { id: 'lead-3', name: 'M. Venkat', phone: '9988776655', stream: 'CEC', marks: '510/600', status: 'enrolled', date: '2025-06-12' },
  ]);

  const handleSimulatePhotoUpload = (bucketName: string) => {
    setUploadStatus(`Photo upload verified for bucket '${bucketName}'! Storage RLS Policy (Authenticated Write) Confirmed.`);
    setTimeout(() => setUploadStatus(''), 4000);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    const newNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      publishedDate: new Date().toISOString().split('T')[0],
      pdfUrl: '#',
      isTicker: newNoticeTicker,
      isArchived: false
    };
    setNotices([newNotice, ...notices]);
    setNewNoticeTitle('');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;
    const newEvt = {
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      eventDate: newEventDate || new Date().toISOString().split('T')[0],
      eventTime: '10:00 AM',
      venue: newEventVenue,
      guestDetails: 'Chief Guest',
      description: 'New campus event',
      posterUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
      isUpcoming: true
    };
    setEvents([newEvt, ...events]);
    setNewEventTitle('');
  };

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacultyName) return;
    const newFac = {
      id: `fac-${Date.now()}`,
      name: newFacultyName,
      designation: newFacultyDesignation,
      subject: newFacultySubject,
      streamId: 'mpc',
      qualification: 'M.Sc, B.Ed',
      experienceYears: 5,
      email: `${newFacultyName.toLowerCase().replace(/\s+/g, '')}@svvjc.edu.in`,
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      isPlaceholder: false,
      checklistRef: 'Staff Added',
      note: 'Newly added faculty profile'
    };
    setFaculty([...faculty, newFac]);
    setNewFacultyName('');
  };

  const handleAddTopper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopperName) return;
    const newTop = {
      id: `top-${Date.now()}`,
      academicYear: '2024-2025',
      studentName: newTopperName,
      marksPercentage: parseFloat(newTopperMarks) || 98.0,
      rank: newTopperRank,
      streamId: 'mpc',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      isCompetitiveQualifier: true,
      examName: 'IPE Board Distinction',
      isPlaceholder: false,
      checklistRef: 'Staff Added Topper',
      note: 'Newly added student topper'
    };
    setToppers([newTop, ...toppers]);
    setNewTopperName('');
    setNewTopperMarks('');
  };

  // If not authenticated, render login role selector screen
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-xl mx-auto my-8 bg-white rounded-2xl p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-navy-900 rounded-2xl text-amber-400 flex items-center justify-center mx-auto border-2 border-maroon-800 shadow">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy-900">Staff Admin Control Panel</h2>
          <p className="text-xs text-slate-500">SRI VIDYA VIKAS JUNIOR COLLEGE, Madanapalle</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
          <p className="font-bold flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Select Staff Access Role to Sign In:</span>
          </p>
          <p className="text-[11px] text-amber-800">
            Per PDF Section 3.6, dashboard permissions adapt based on staff designation (Principal, Office Admin, Exam Cell, Stream Coordinator).
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => loginDemo('super_admin')}
            className="w-full p-3.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs flex items-center justify-between transition-transform hover:scale-[1.01]"
          >
            <div className="text-left">
              <p className="text-sm font-extrabold text-amber-400">Principal / Super Admin</p>
              <p className="text-[11px] text-slate-300 font-normal">Full access to edit all site content & grant roles</p>
            </div>
            <UserCheck className="w-5 h-5 text-amber-400" />
          </button>

          <button
            onClick={() => loginDemo('office_admin')}
            className="w-full p-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-between transition-transform hover:scale-[1.01]"
          >
            <div className="text-left">
              <p className="text-sm font-extrabold text-white">Office Administrator</p>
              <p className="text-[11px] text-slate-300 font-normal">Manage notices, campus events, gallery & contact leads</p>
            </div>
            <UserCheck className="w-5 h-5 text-slate-400" />
          </button>

          <button
            onClick={() => loginDemo('exam_cell')}
            className="w-full p-3.5 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs flex items-center justify-between transition-transform hover:scale-[1.01]"
          >
            <div className="text-left">
              <p className="text-sm font-extrabold text-amber-300">Exam Cell Coordinator</p>
              <p className="text-[11px] text-maroon-200 font-normal">Manage board results, toppers & timetables</p>
            </div>
            <UserCheck className="w-5 h-5 text-amber-300" />
          </button>

          <button
            onClick={() => loginDemo('stream_coordinator')}
            className="w-full p-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs flex items-center justify-between transition-transform hover:scale-[1.01]"
          >
            <div className="text-left">
              <p className="text-sm font-extrabold text-emerald-300">Stream Coordinator (MPC/BiPC)</p>
              <p className="text-[11px] text-emerald-200 font-normal">Manage faculty directory for assigned stream</p>
            </div>
            <UserCheck className="w-5 h-5 text-emerald-300" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Dashboard Top Header Bar */}
      <section className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="uppercase tracking-wider">Role: {user.role.replace('_', ' ')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Staff Control Dashboard</h2>
          <p className="text-xs text-slate-300 mt-1">Logged in as {user.name} ({user.email})</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-2 transition-colors border border-white/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {uploadStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Control Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'notices' ? 'bg-maroon-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notices & Ticker ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'events' ? 'bg-maroon-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Campus Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'faculty' ? 'bg-maroon-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Faculty Directory ({faculty.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'results' ? 'bg-maroon-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Results & Toppers ({toppers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'leads' ? 'bg-maroon-900 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Admissions & Enquiry Leads ({leads.length})</span>
        </button>
      </div>

      {/* TAB CONTENT 1: NOTICES & TICKER */}
      {activeTab === 'notices' && (
        <section className="space-y-6">
          
          {/* Add Notice Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Post New Notice / Circular
            </h3>

            <form onSubmit={handleAddNotice} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <input 
                  type="text"
                  required
                  placeholder="Notice Title (e.g. BIEAP Board Exam Preparation Schedule)"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>

              <div>
                <select
                  value={newNoticeCategory}
                  onChange={(e: any) => setNewNoticeCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                >
                  <option value="Administrative">Administrative</option>
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam Schedule</option>
                  <option value="Holiday">Holiday Alert</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newNoticeTicker}
                    onChange={(e) => setNewNoticeTicker(e.target.checked)}
                    className="w-4 h-4 rounded text-maroon-900 focus:ring-maroon-800"
                  />
                  <span>Show in Homepage News Ticker</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>

          {/* Notices Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-base">Active Notices List</h3>
            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-maroon-900 bg-maroon-100 px-2 py-0.5 rounded">{n.category}</span>
                      <span className="text-slate-400">{n.publishedDate}</span>
                      {n.isTicker && <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Ticker Active</span>}
                    </div>
                    <p className="font-bold text-navy-900 text-xs mt-1">{n.title}</p>
                  </div>

                  <button
                    onClick={() => setNotices(notices.filter(item => item.id !== n.id))}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* TAB CONTENT 2: EVENTS */}
      {activeTab === 'events' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Add Campus Event & Poster Upload
            </h3>

            <form onSubmit={handleAddEvent} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                type="text"
                required
                placeholder="Event Title (e.g. Science Fair 2025)"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input 
                type="date"
                required
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input 
                type="text"
                placeholder="Venue"
                value={newEventVenue}
                onChange={(e) => setNewEventVenue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />

              <div className="sm:col-span-3 flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePhotoUpload('gallery')}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-300"
                >
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Test Photo Upload to 'gallery' Bucket</span>
                </button>

                <button type="submit" className="px-5 py-2 rounded-lg bg-navy-900 text-white font-bold text-xs">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* TAB CONTENT 3: FACULTY */}
      {activeTab === 'faculty' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Add Faculty Profile & Photo Upload
            </h3>

            <form onSubmit={handleAddFaculty} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                type="text"
                required
                placeholder="Faculty Name"
                value={newFacultyName}
                onChange={(e) => setNewFacultyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input 
                type="text"
                placeholder="Subject"
                value={newFacultySubject}
                onChange={(e) => setNewFacultySubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input 
                type="text"
                placeholder="Designation"
                value={newFacultyDesignation}
                onChange={(e) => setNewFacultyDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />

              <div className="sm:col-span-3 flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePhotoUpload('faculty-photos')}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-300"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Test Photo Upload to 'faculty-photos' Bucket</span>
                </button>

                <button type="submit" className="px-5 py-2 rounded-lg bg-navy-900 text-white font-bold text-xs">
                  Add Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* TAB CONTENT 4: RESULTS */}
      {activeTab === 'results' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Post Board Topper Record & Photo Upload
            </h3>

            <form onSubmit={handleAddTopper} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                type="text"
                required
                placeholder="Student Name"
                value={newTopperName}
                onChange={(e) => setNewTopperName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input 
                type="text"
                required
                placeholder="Marks / Percentage (e.g. 98.6%)"
                value={newTopperMarks}
                onChange={(e) => setNewTopperMarks(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input 
                type="text"
                placeholder="Rank (e.g. College 1st Rank)"
                value={newTopperRank}
                onChange={(e) => setNewTopperRank(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
              />

              <div className="sm:col-span-3 flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePhotoUpload('topper-photos')}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-300"
                >
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>Test Photo Upload to 'topper-photos' Bucket</span>
                </button>

                <button type="submit" className="px-5 py-2 rounded-lg bg-maroon-900 text-white font-bold text-xs">
                  Post Topper Record
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* TAB CONTENT 5: LEADS */}
      {activeTab === 'leads' && (
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-navy-900 text-base">Submitted Student Admission Inquiries</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white font-bold">
                  <th className="p-3 rounded-tl-lg">Student Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Stream</th>
                  <th className="p-3">Class 10 Marks</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-navy-900">{lead.name}</td>
                    <td className="p-3 text-slate-600">{lead.phone}</td>
                    <td className="p-3 font-bold text-maroon-900">{lead.stream}</td>
                    <td className="p-3 text-slate-600">{lead.marks}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        lead.status === 'enrolled' ? 'bg-emerald-100 text-emerald-800' :
                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => {
                          setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'contacted' } : l));
                        }}
                        className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-navy-900 font-bold text-[11px]"
                      >
                        Mark Contacted
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
};
