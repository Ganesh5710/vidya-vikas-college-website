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
  LogOut,
  Upload,
  CheckCircle2,
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import { 
  INITIAL_NOTICES, 
  INITIAL_EVENTS, 
  INITIAL_FACULTY, 
  INITIAL_TOPPERS 
} from '../constants/collegeData';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const AdminDashboardPage: React.FC = () => {
  useSEO({
    title: "Staff Admin Control Panel | SRI VIDYA VIKAS JUNIOR COLLEGE",
    description: "Private staff control dashboard for managing notices, events, faculty records, and student leads.",
    noindex: true
  });

  const { user, isAuthenticated, loginDemo, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'faculty' | 'results' | 'leads'>('notices');

  // Login form state
  const [emailInput, setEmailInput] = useState('principal@svvjc.edu.in');
  const [passwordInput, setPasswordInput] = useState('principal@svvjc');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Local state for dynamic CRUD
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [faculty, setFaculty] = useState(INITIAL_FACULTY);
  const [toppers, setToppers] = useState(INITIAL_TOPPERS);

  // Form states
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'Academic' | 'Administrative' | 'Exam' | 'Holiday'>('Administrative');
  const [newNoticeTicker, setNewNoticeTicker] = useState(true);

  // Event form + photo state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('College Campus, Prasanth Nagar');
  const [eventPhotoPreview, setEventPhotoPreview] = useState<string>('');

  // Faculty form + photo state
  const [newFacultyName, setNewFacultyName] = useState('');
  const [newFacultySubject, setNewFacultySubject] = useState('Physics');
  const [newFacultyDesignation, setNewFacultyDesignation] = useState('Lecturer');
  const [facultyPhotoPreview, setFacultyPhotoPreview] = useState<string>('');

  // Topper form + photo state
  const [newTopperName, setNewTopperName] = useState('');
  const [newTopperMarks, setNewTopperMarks] = useState('');
  const [newTopperRank, setNewTopperRank] = useState('College Ranker');
  const [topperPhotoPreview, setTopperPhotoPreview] = useState<string>('');

  const [uploadStatus, setUploadStatus] = useState('');

  // Submitted Leads state
  const [leads, setLeads] = useState<Array<{
    id: string;
    name: string;
    phone: string;
    stream: string;
    marks: string;
    status: string;
    date: string;
  }>>([]);

  // File selection helper
  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setPreview: (url: string) => void,
    bucketName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultUrl = reader.result as string;
        setPreview(resultUrl);
        setUploadStatus(`Photo '${file.name}' selected & prepared for '${bucketName}' bucket!`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Staff Credentials
  const staffCredentials = [
    {
      roleName: "Principal / Super Admin",
      roleKey: "super_admin" as UserRole,
      email: "principal@svvjc.edu.in",
      password: "principal@svvjc",
      description: "Full system control, manage staff roles & site configuration",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
    },
    {
      roleName: "Office Administrator",
      roleKey: "office_admin" as UserRole,
      email: "office@svvjc.edu.in",
      password: "office@svvjc",
      description: "Manage circulars, news ticker, campus events & enquiry leads",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300"
    },
    {
      roleName: "Exam Cell Coordinator",
      roleKey: "exam_cell" as UserRole,
      email: "examcell@svvjc.edu.in",
      password: "examcell@svvjc",
      description: "Manage BIEAP board exam results, toppers & seating timetables",
      badgeColor: "bg-maroon-100 text-maroon-900 border-maroon-300"
    },
    {
      roleName: "Stream Coordinator (MPC/BiPC)",
      roleKey: "stream_coordinator" as UserRole,
      email: "faculty.mpc@svvjc.edu.in",
      password: "faculty@svvjc",
      description: "Manage faculty directory and subject syllabus guides",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
    }
  ];

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const matchedCredential = staffCredentials.find(
      c => c.email.toLowerCase() === emailInput.trim().toLowerCase() && c.password === passwordInput
    );

    if (matchedCredential) {
      loginDemo(matchedCredential.roleKey);
    } else {
      setLoginError('Invalid email or password. Please use one of the authorized staff accounts below.');
    }
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle) return;

    const noticeObj = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      publishedDate: new Date().toISOString().split('T')[0],
      pdfUrl: '#',
      isTicker: newNoticeTicker,
      isArchived: false,
    };

    setNotices([noticeObj, ...notices]);
    setNewNoticeTitle('');
    alert('Circular / Notice added successfully!');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const eventObj = {
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      eventDate: newEventDate || new Date().toISOString().split('T')[0],
      eventTime: '10:00 AM - 4:00 PM',
      venue: newEventVenue,
      guestDetails: 'Chief Guest / Management Desk',
      description: 'Campus event organized by Sri Vidya Vikas Junior College.',
      posterUrl: eventPhotoPreview || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
      isUpcoming: true,
    };

    setEvents([eventObj, ...events]);
    setNewEventTitle('');
    setEventPhotoPreview('');
    alert('Campus event added successfully!');
  };

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacultyName) return;

    const facObj = {
      id: `fac-${Date.now()}`,
      name: newFacultyName,
      designation: newFacultyDesignation,
      subject: newFacultySubject,
      streamId: newFacultySubject.toLowerCase().includes('math') ? 'mpc' : 'bipc',
      qualification: 'M.Sc, B.Ed',
      experienceYears: 10,
      email: `${newFacultyName.toLowerCase().replace(/\s+/g, '.')}@svvjc.edu.in`,
      photoUrl: facultyPhotoPreview || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    };

    setFaculty([facObj, ...faculty]);
    setNewFacultyName('');
    setFacultyPhotoPreview('');
    alert(`Faculty profile for '${newFacultyName}' added successfully!`);
  };

  const handleAddTopper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopperName) return;

    const topObj = {
      id: `top-${Date.now()}`,
      academicYear: '2024-2025',
      studentName: newTopperName,
      marksPercentage: parseFloat(newTopperMarks) || 95.0,
      rank: newTopperRank,
      streamId: 'mpc',
      photoUrl: topperPhotoPreview || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      isCompetitiveQualifier: true,
      examName: 'AP EAMCET / NEET Qualified',
    };

    setToppers([topObj, ...toppers]);
    setNewTopperName('');
    setNewTopperMarks('');
    setTopperPhotoPreview('');
    alert('Topper record posted successfully!');
  };

  // If Not Authenticated, Show Login Form + Staff Quick Credential Fill Cards
  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        
        {/* Header Title */}
        <div className="bg-navy-900 text-white p-8 rounded-2xl shadow-lg space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-navy-950 flex items-center justify-center font-bold mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">Staff & Faculty Admin Portal</h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Authorized staff login for SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle. Select your role or sign in below.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-extrabold text-navy-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-maroon-800" />
              <span>Staff Login Authorization</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Enter official staff email and security password</p>
          </div>

          {loginError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleFormLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="staff@svvjc.edu.in"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <span>Authenticate & Sign In</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        </div>

        {/* Staff Quick Credential Fill Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-extrabold text-navy-900 text-base">Authorized Staff Login Credentials</h3>
            <span className="text-xs text-slate-500 font-medium">Click any card to auto-fill credentials</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {staffCredentials.map((cred) => (
              <div
                key={cred.roleKey}
                onClick={() => {
                  setEmailInput(cred.email);
                  setPasswordInput(cred.password);
                  setLoginError('');
                }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-maroon-800 cursor-pointer transition-all hover:shadow-md space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${cred.badgeColor}`}>
                    {cred.roleName}
                  </span>
                  <span className="text-[11px] font-bold text-maroon-800 group-hover:underline flex items-center gap-1">
                    <span>Fill Creds</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p><span className="text-slate-400 font-sans font-semibold">Email:</span> {cred.email}</p>
                  <p><span className="text-slate-400 font-sans font-semibold">Pass:</span> {cred.password}</p>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {cred.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
            <ShieldAlert className="w-4 h-4" />
            <span>ROLE: {user?.role.toUpperCase()}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Staff Control Dashboard
          </h2>
          <p className="text-xs text-slate-300">
            Logged in as <span className="font-bold text-amber-400">{user?.name}</span> ({user?.email})
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Sign Out</span>
        </button>
      </section>

      {/* Upload status message */}
      {uploadStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{uploadStatus}</span>
          </div>
          <button onClick={() => setUploadStatus('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dashboard Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${
            activeTab === 'notices'
              ? 'bg-maroon-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notices & Ticker ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${
            activeTab === 'events'
              ? 'bg-maroon-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Campus Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${
            activeTab === 'faculty'
              ? 'bg-maroon-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Faculty Directory ({faculty.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${
            activeTab === 'results'
              ? 'bg-maroon-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Results & Toppers ({toppers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${
            activeTab === 'leads'
              ? 'bg-maroon-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Admissions & Enquiry Leads ({leads.length})</span>
        </button>
      </div>

      {/* TAB CONTENT 1: NOTICES */}
      {activeTab === 'notices' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Publish New Circular / Notice
            </h3>

            <form onSubmit={handleAddNotice} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                type="text"
                required
                placeholder="Notice Title (e.g. Mid-term Exam Schedule)"
                value={newNoticeTitle}
                onChange={(e) => setNewNoticeTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:col-span-2 focus:ring-2 focus:ring-maroon-800 outline-none"
              />

              <select
                value={newNoticeCategory}
                onChange={(e: any) => setNewNoticeCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-maroon-800 outline-none"
              >
                <option value="Administrative">Administrative</option>
                <option value="Academic">Academic</option>
                <option value="Exam">Exam</option>
                <option value="Holiday">Holiday</option>
              </select>

              <div className="sm:col-span-3 flex justify-between items-center pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newNoticeTicker}
                    onChange={(e) => setNewNoticeTicker(e.target.checked)}
                    className="w-4 h-4 rounded text-maroon-800"
                  />
                  <span>Show in Top Ticker Bar</span>
                </label>

                <button type="submit" className="px-5 py-2 rounded-lg bg-navy-900 text-white font-bold text-xs hover:bg-navy-950 transition-colors">
                  Publish Notice
                </button>
              </div>
            </form>
          </div>

          {/* Notices Data List Display */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-base">Active Notices List ({notices.length})</h3>
            
            {notices.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {notices.map((n) => (
                  <div key={n.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">{n.category}</span>
                      <p className="font-bold text-navy-900 text-xs mt-1">{n.title}</p>
                    </div>
                    <button
                      onClick={() => setNotices(notices.filter(item => item.id !== n.id))}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Circulars or Notices Posted Yet" description="Use the form above to publish your first announcement." />
            )}
          </div>
        </section>
      )}

      {/* TAB CONTENT 2: EVENTS */}
      {activeTab === 'events' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Add Campus Event & Upload Poster Picture
            </h3>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  placeholder="Venue (e.g. Auditorium)"
                  value={newEventVenue}
                  onChange={(e) => setNewEventVenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              {/* REAL PHOTO FILE UPLOADER WITH PREVIEW */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Event Poster Picture (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Choose Photo File from PC</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, setEventPhotoPreview, 'gallery')}
                      className="hidden"
                    />
                  </label>

                  {eventPhotoPreview && (
                    <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={eventPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border" />
                      <span className="text-xs text-emerald-600 font-bold">Photo Attached!</span>
                      <button type="button" onClick={() => setEventPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs shadow-md">
                  Save Campus Event
                </button>
              </div>
            </form>
          </div>

          {/* Events List Data Display */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-base">Campus Events List ({events.length})</h3>
            
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((evt) => (
                  <div key={evt.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {evt.posterUrl ? (
                        <img src={evt.posterUrl} alt={evt.title} className="w-14 h-14 rounded-lg object-cover border border-slate-300 shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          evt.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {evt.eventDate}
                        </span>
                        <h4 className="font-bold text-navy-900 text-xs mt-1">{evt.title}</h4>
                        <p className="text-[11px] text-slate-500">{evt.venue}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEvents(events.filter(e => e.id !== evt.id))}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Campus Events Listed Yet" description="Use the form above to schedule upcoming college events." />
            )}
          </div>
        </section>
      )}

      {/* TAB CONTENT 3: FACULTY */}
      {activeTab === 'faculty' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Add Faculty Profile & Upload Photo
            </h3>

            <form onSubmit={handleAddFaculty} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input 
                  type="text"
                  required
                  placeholder="Faculty Name (e.g. Dr. Ramesh)"
                  value={newFacultyName}
                  onChange={(e) => setNewFacultyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
                />
                <input 
                  type="text"
                  placeholder="Subject (e.g. Physics)"
                  value={newFacultySubject}
                  onChange={(e) => setNewFacultySubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
                />
                <input 
                  type="text"
                  placeholder="Designation (e.g. Senior Lecturer)"
                  value={newFacultyDesignation}
                  onChange={(e) => setNewFacultyDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              {/* REAL PHOTO FILE UPLOADER WITH PREVIEW */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Faculty Profile Photo (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Choose Photo File from PC</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, setFacultyPhotoPreview, 'faculty-photos')}
                      className="hidden"
                    />
                  </label>

                  {facultyPhotoPreview ? (
                    <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={facultyPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-full border" />
                      <span className="text-xs text-emerald-600 font-bold">Faculty Photo Attached!</span>
                      <button type="button" onClick={() => setFacultyPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No photo attached (Default portrait will be used)</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs shadow-md">
                  Add Faculty Profile
                </button>
              </div>
            </form>
          </div>

          {/* Faculty Directory Data Display */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-base">Faculty Directory List ({faculty.length})</h3>
            
            {faculty.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {faculty.map((fac) => (
                  <div key={fac.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {fac.photoUrl ? (
                        <img src={fac.photoUrl} alt={fac.name} className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                          {fac.name.charAt(0)}
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">{fac.subject}</span>
                        <h4 className="font-bold text-navy-900 text-xs mt-1">{fac.name}</h4>
                        <p className="text-[11px] text-slate-500">{fac.designation}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFaculty(faculty.filter(f => f.id !== fac.id))}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Faculty Records Added Yet" description="Use the form above to add lecturer and staff profiles." />
            )}
          </div>
        </section>
      )}

      {/* TAB CONTENT 4: RESULTS & TOPPERS */}
      {activeTab === 'results' && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800" />
              Post Board Exam Topper Record & Upload Photo
            </h3>

            <form onSubmit={handleAddTopper} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  placeholder="Marks % (e.g. 98.2)"
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
              </div>

              {/* REAL PHOTO FILE UPLOADER WITH PREVIEW */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Student Topper Photo (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>Choose Student Photo from PC</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, setTopperPhotoPreview, 'topper-photos')}
                      className="hidden"
                    />
                  </label>

                  {topperPhotoPreview && (
                    <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={topperPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-full border" />
                      <span className="text-xs text-emerald-600 font-bold">Topper Photo Attached!</span>
                      <button type="button" onClick={() => setTopperPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-xs shadow-md">
                  Post Topper Record
                </button>
              </div>
            </form>
          </div>

          {/* Toppers List Data Display */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-base">Board Exam Toppers List ({toppers.length})</h3>
            
            {toppers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toppers.map((top) => (
                  <div key={top.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {top.photoUrl ? (
                        <img src={top.photoUrl} alt={top.studentName} className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                          {top.studentName.charAt(0)}
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">{top.rank}</span>
                        <h4 className="font-bold text-navy-900 text-xs mt-1">{top.studentName}</h4>
                        <p className="text-[11px] text-emerald-700 font-bold">{top.marksPercentage}% Marks</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setToppers(toppers.filter(t => t.id !== top.id))}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Topper Records Added Yet" description="Use the form above to add board exam rankers." />
            )}
          </div>
        </section>
      )}

      {/* TAB CONTENT 5: LEADS */}
      {activeTab === 'leads' && (
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-navy-900 text-base">Submitted Student Admission Inquiries ({leads.length})</h3>
          
          {leads.length > 0 ? (
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
                          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px]"
                        >
                          Mark Contacted
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState 
              title="No Submitted Admission Inquiries Yet" 
              description="New student inquiry submissions from the online Admissions form will appear here in real-time." 
            />
          )}
        </section>
      )}

    </div>
  );
};
