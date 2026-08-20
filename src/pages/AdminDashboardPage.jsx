import React, { useState } from 'react';
import { ShieldAlert, Bell, Calendar, Users, Trophy, Inbox, Plus, Trash2, Lock, LogOut, Upload, CheckCircle2, KeyRound, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Image as ImageIcon, Building2, X, Edit2, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData, DEFAULT_ALBUMS } from '../context/DataContext';
import { EmptyState } from '../components/common/EmptyState';
import { useSEO } from '../hooks/useSEO';

export const AdminDashboardPage = () => {
    useSEO({
        title: "Staff Admin Control Panel | SRI VIDYA VIKAS JUNIOR COLLEGE",
        description: "Private staff control dashboard for managing notices, events, faculty records, and student leads.",
        noindex: true
    });
    const { user, isAuthenticated, loginDemo, logout } = useAuth();
    const { notices, addNotice, deleteNotice, events, addEvent, deleteEvent, faculty, addFaculty, deleteFaculty, toppers, addTopper, updateTopper, deleteTopper, leads, updateLeadStatus, facilities, heroSlides, addFacility, deleteFacility, updateFacilityPhoto, updateHeroSlidePhoto, galleryPhotos, addGalleryPhoto, deleteGalleryPhoto } = useData();
    const [activeTab, setActiveTab] = useState('notices');
    // Login form state
    const [emailInput, setEmailInput] = useState('srividyavikasjuniorcollegempl@gmail.com');
    const [passwordInput, setPasswordInput] = useState('principal@svvjc');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    // Form states
    const [newNoticeTitle, setNewNoticeTitle] = useState('');
    const [newNoticeCategory, setNewNoticeCategory] = useState('Administrative');
    const [newNoticeTicker, setNewNoticeTicker] = useState(true);
    // Event form + photo state
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventVenue, setNewEventVenue] = useState('College Campus, Prasanth Nagar');
    const [newEventDescription, setNewEventDescription] = useState('');
    const [newEventIsUpcoming, setNewEventIsUpcoming] = useState(true);
    const [eventPhotoPreview, setEventPhotoPreview] = useState('');
    // Faculty form + photo state
    const [newFacultyName, setNewFacultyName] = useState('');
    const [newFacultySubject, setNewFacultySubject] = useState('Physics');
    const [newFacultyDesignation, setNewFacultyDesignation] = useState('Lecturer');
    const [facultyPhotoPreview, setFacultyPhotoPreview] = useState('');
    // Result / Topper form state (1st Year vs 2nd Year)
    const [newTopperYear, setNewTopperYear] = useState('1st Year');
    const [newTopperName, setNewTopperName] = useState('');
    const [newTopperRoll, setNewTopperRoll] = useState('');
    const [newTopperStream, setNewTopperStream] = useState('mpc');
    const [newTopperMarksObtained, setNewTopperMarksObtained] = useState('');
    const [newTopperMaxMarks, setNewTopperMaxMarks] = useState('500');
    const [newTopperMarks, setNewTopperMarks] = useState('');
    const [newTopperGrade, setNewTopperGrade] = useState('Grade A1');
    const [newTopperRank, setNewTopperRank] = useState('#1 College Topper');
    const [topperPhotoPreview, setTopperPhotoPreview] = useState('');
    const [editingTopperId, setEditingTopperId] = useState(null);
    // Custom Facility form + photo state
    const [newFacilityTitle, setNewFacilityTitle] = useState('');
    const [newFacilityCategory, setNewFacilityCategory] = useState('Laboratory');
    const [newFacilityDescription, setNewFacilityDescription] = useState('');
    const [customFacilityPhotoPreview, setCustomFacilityPhotoPreview] = useState('');
    // Photo Album upload state
    const [selectedAlbumId, setSelectedAlbumId] = useState('alb-sports');
    const [albumPhotoCaption, setAlbumPhotoCaption] = useState('');
    const [albumPhotoPreview, setAlbumPhotoPreview] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    // File selection helper
    const handleFileSelect = (e, setPreview, bucketName) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const resultUrl = reader.result;
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
            roleKey: "super_admin",
            email: "srividyavikasjuniorcollegempl@gmail.com",
            password: "principal@svvjc",
            description: "Full system control, manage staff roles & site configuration",
            badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
        },
        {
            roleName: "Office Administrator",
            roleKey: "office_admin",
            email: "office.svvjc@gmail.com",
            password: "office@svvjc",
            description: "Manage circulars, news ticker, campus events & enquiry leads",
            badgeColor: "bg-blue-100 text-blue-900 border-blue-300"
        },
        {
            roleName: "Exam Cell Coordinator",
            roleKey: "exam_cell",
            email: "examcell.svvjc@gmail.com",
            password: "examcell@svvjc",
            description: "Manage BIEAP board exam results, toppers & seating timetables",
            badgeColor: "bg-maroon-100 text-maroon-900 border-maroon-300"
        },
        {
            roleName: "Stream Coordinator (MPC/BiPC)",
            roleKey: "stream_coordinator",
            email: "faculty.svvjc@gmail.com",
            password: "faculty@svvjc",
            description: "Manage faculty directory and subject syllabus guides",
            badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
        }
    ];
    const handleFormLogin = (e) => {
        e.preventDefault();
        setLoginError('');
        const matchedCredential = staffCredentials.find(c => c.email.toLowerCase() === emailInput.trim().toLowerCase() && c.password === passwordInput);
        if (matchedCredential) {
            loginDemo(matchedCredential.roleKey);
        }
        else {
            setLoginError('Invalid email or password. Please use one of the authorized staff accounts below.');
        }
    };
    const handleAddNotice = (e) => {
        e.preventDefault();
        if (!newNoticeTitle)
            return;
        addNotice({
            id: `not-${Date.now()}`,
            title: newNoticeTitle,
            category: newNoticeCategory,
            publishedDate: new Date().toISOString().split('T')[0],
            pdfUrl: '#',
            isTicker: newNoticeTicker,
            isArchived: false,
        });
        setNewNoticeTitle('');
        alert('Circular / Notice published live across the site!');
    };
    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEventTitle)
            return;
        addEvent({
            id: `evt-${Date.now()}`,
            title: newEventTitle,
            eventDate: newEventDate || new Date().toISOString().split('T')[0],
            eventTime: '10:00 AM - 4:00 PM',
            venue: newEventVenue,
            guestDetails: 'Chief Guest / Management Desk',
            description: newEventDescription || 'Campus event organized by Sri Vidya Vikas Junior College.',
            posterUrl: eventPhotoPreview || '',
            isUpcoming: newEventIsUpcoming,
        });
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventDescription('');
        setEventPhotoPreview('');
        alert(`Campus event '${newEventTitle}' (${newEventIsUpcoming ? 'Upcoming Event' : 'Completed Event'}) posted live!`);
    };
    const handleAddFaculty = (e) => {
        e.preventDefault();
        if (!newFacultyName)
            return;
        addFaculty({
            id: `fac-${Date.now()}`,
            name: newFacultyName,
            designation: newFacultyDesignation,
            subject: newFacultySubject,
            streamId: newFacultySubject.toLowerCase().includes('math') ? 'mpc' : 'bipc',
            qualification: 'M.Sc, B.Ed',
            experienceYears: 10,
            email: `${newFacultyName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
            photoUrl: facultyPhotoPreview || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        });
        setNewFacultyName('');
        setFacultyPhotoPreview('');
        alert(`Faculty profile for '${newFacultyName}' added live!`);
    };
    const handleSaveTopper = (e) => {
        e.preventDefault();
        if (!newTopperName.trim()) {
            alert('Please enter Student Name!');
            return;
        }
        if (!newTopperRoll.trim()) {
            alert('Please enter Hall Ticket / Roll Number!');
            return;
        }

        const calculatedScore = newTopperMarks || (newTopperMarksObtained ? `${newTopperMarksObtained} / ${newTopperMaxMarks}` : '98%');
        const sessionYear = newTopperYear === '1st Year' ? '2024-2025 BIEAP Junior Inter' : '2024-2025 BIEAP Senior Inter';

        if (editingTopperId) {
            updateTopper(editingTopperId, {
                academicYear: newTopperYear,
                studentName: newTopperName,
                rollNumber: newTopperRoll,
                streamId: newTopperStream,
                marksObtained: newTopperMarksObtained,
                maxMarks: newTopperMaxMarks,
                marksPercentage: calculatedScore,
                grade: newTopperGrade,
                rank: newTopperRank,
                photoUrl: topperPhotoPreview || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                yearSession: sessionYear
            });
            setEditingTopperId(null);
            setUploadStatus(`Result record for '${newTopperName}' updated live!`);
            alert(`Result record for '${newTopperName}' updated successfully!`);
        } else {
            addTopper({
                id: `top-${Date.now()}`,
                academicYear: newTopperYear,
                studentName: newTopperName,
                rollNumber: newTopperRoll,
                streamId: newTopperStream,
                marksObtained: newTopperMarksObtained,
                maxMarks: newTopperMaxMarks,
                marksPercentage: calculatedScore,
                grade: newTopperGrade,
                rank: newTopperRank,
                photoUrl: topperPhotoPreview || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                yearSession: sessionYear
            });
            setUploadStatus(`Result record for '${newTopperName}' posted live!`);
            alert(`Result record for '${newTopperName}' posted live on Results page!`);
        }

        // Reset form
        setNewTopperName('');
        setNewTopperRoll('');
        setNewTopperMarksObtained('');
        setNewTopperMarks('');
        setTopperPhotoPreview('');
    };

    const handleStartEditTopper = (item) => {
        setEditingTopperId(item.id);
        setNewTopperYear(item.academicYear || '1st Year');
        setNewTopperName(item.studentName || '');
        setNewTopperRoll(item.rollNumber || '');
        setNewTopperStream(item.streamId || 'mpc');
        setNewTopperMarksObtained(item.marksObtained || '');
        setNewTopperMaxMarks(item.maxMarks || (item.academicYear === '2nd Year' ? '1000' : '500'));
        setNewTopperMarks(item.marksPercentage || '');
        setNewTopperGrade(item.grade || 'Grade A1');
        setNewTopperRank(item.rank || '#1 College Topper');
        setTopperPhotoPreview(item.photoUrl || '');
    };

    const handleCancelEditTopper = () => {
        setEditingTopperId(null);
        setNewTopperName('');
        setNewTopperRoll('');
        setNewTopperMarksObtained('');
        setNewTopperMarks('');
        setTopperPhotoPreview('');
    };
    const handleAddCustomFacility = (e) => {
        e.preventDefault();
        if (!newFacilityTitle)
            return;
        addFacility({
            id: `fac-${Date.now()}`,
            title: newFacilityTitle,
            category: newFacilityCategory,
            description: newFacilityDescription || 'Sri Vidya Vikas Junior College campus infrastructure facility.',
            photoUrl: customFacilityPhotoPreview || '',
        });
        setNewFacilityTitle('');
        setNewFacilityCategory('Laboratory');
        setNewFacilityDescription('');
        setCustomFacilityPhotoPreview('');
        setUploadStatus(`Custom facility '${newFacilityTitle}' added to campus infrastructure!`);
        alert(`Custom facility '${newFacilityTitle}' added to campus infrastructure & live on Facilities page!`);
    };
    const handleAddAlbumPhoto = (e) => {
        e.preventDefault();
        if (!albumPhotoPreview) {
            alert('Please select a photo file from PC to upload!');
            return;
        }
        addGalleryPhoto({
            id: `gal-${Date.now()}`,
            albumId: selectedAlbumId,
            imageUrl: albumPhotoPreview,
            caption: albumPhotoCaption || 'Campus Photo'
        });
        setAlbumPhotoCaption('');
        setAlbumPhotoPreview('');
        setUploadStatus('Photo uploaded to official campus photo album live!');
        alert('Photo uploaded to official campus photo album & live on Events page!');
    };
    // If Not Authenticated, Show Login Form + Staff Quick Credential Fill Cards
    if (!isAuthenticated) {
        return (<div className="max-w-4xl mx-auto space-y-8 py-4">
        
        {/* Header Title */}
        <div className="bg-navy-900 text-white p-8 rounded-2xl shadow-lg space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-navy-950 flex items-center justify-center font-bold mx-auto mb-3">
            <Lock className="w-6 h-6"/>
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
              <KeyRound className="w-5 h-5 text-maroon-800"/>
              <span>Staff Login Authorization</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Enter official staff email and security password</p>
          </div>

          {loginError && (<div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0"/>
              <span>{loginError}</span>
            </div>)}

          <form onSubmit={handleFormLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3"/>
                <input type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="srividyavikasjuniorcollegempl@gmail.com" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3"/>
                <input type={showPassword ? "text" : "password"} required value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="••••••••" className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none font-mono"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
              <span>Authenticate & Sign In</span>
              <ArrowRight className="w-4 h-4 text-amber-400"/>
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
            {staffCredentials.map((cred) => (<div key={cred.roleKey} onClick={() => {
                    setEmailInput(cred.email);
                    setPasswordInput(cred.password);
                    setLoginError('');
                }} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-maroon-800 cursor-pointer transition-all hover:shadow-md space-y-3 group">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${cred.badgeColor}`}>
                    {cred.roleName}
                  </span>
                  <span className="text-[11px] font-bold text-maroon-800 group-hover:underline flex items-center gap-1">
                    <span>Fill Creds</span>
                    <ArrowRight className="w-3 h-3"/>
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p><span className="text-slate-400 font-sans font-semibold">Email:</span> {cred.email}</p>
                  <p><span className="text-slate-400 font-sans font-semibold">Pass:</span> {cred.password}</p>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {cred.description}
                </p>
              </div>))}
          </div>
        </div>

      </div>);
    }
    return (<div className="space-y-8">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
            <ShieldAlert className="w-4 h-4"/>
            <span>ROLE: {user?.role.toUpperCase()}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Staff Control Dashboard
          </h2>
          <p className="text-xs text-slate-300">
            Logged in as <span className="font-bold text-amber-400">{user?.name}</span> ({user?.email})
          </p>
        </div>

        <button onClick={logout} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700">
          <LogOut className="w-4 h-4 text-red-400"/>
          <span>Sign Out</span>
        </button>
      </section>

      {/* Upload status message */}
      {uploadStatus && (<div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/>
            <span>{uploadStatus}</span>
          </div>
          <button onClick={() => setUploadStatus('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4"/>
          </button>
        </div>)}

      {/* Dashboard Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button onClick={() => setActiveTab('notices')} className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${activeTab === 'notices'
            ? 'bg-maroon-900 text-white shadow-md'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
          <Bell className="w-4 h-4"/>
          <span>Notices & Ticker ({notices.length})</span>
        </button>

        <button onClick={() => setActiveTab('events')} className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${activeTab === 'events'
            ? 'bg-maroon-900 text-white shadow-md'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
          <Calendar className="w-4 h-4"/>
          <span>Campus Events ({events.length})</span>
        </button>

        <button onClick={() => setActiveTab('faculty')} className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${activeTab === 'faculty'
            ? 'bg-maroon-900 text-white shadow-md'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
          <Users className="w-4 h-4"/>
          <span>Faculty Directory ({faculty.length})</span>
        </button>

        <button onClick={() => setActiveTab('results')} className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${activeTab === 'results'
            ? 'bg-maroon-900 text-white shadow-md'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
          <Trophy className="w-4 h-4"/>
          <span>Results & Toppers ({toppers.length})</span>
        </button>

        <button onClick={() => setActiveTab('leads')} className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${activeTab === 'leads'
            ? 'bg-maroon-900 text-white shadow-md'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
          <Inbox className="w-4 h-4"/>
          <span>Admissions & Enquiry Leads ({leads.length})</span>
        </button>

        <button onClick={() => setActiveTab('campus_photos')} className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all ${activeTab === 'campus_photos'
            ? 'bg-maroon-900 text-white shadow-md'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
          <ImageIcon className="w-4 h-4"/>
          <span>Campus Photos & Facilities</span>
        </button>
      </div>

      {/* TAB CONTENT 1: NOTICES */}
      {activeTab === 'notices' && (<section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800"/>
              Publish New Circular / Notice
            </h3>

            <form onSubmit={handleAddNotice} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input type="text" required placeholder="Notice Title (e.g. Mid-term Exam Schedule)" value={newNoticeTitle} onChange={(e) => setNewNoticeTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:col-span-2 focus:ring-2 focus:ring-maroon-800 outline-none"/>

              <select value={newNoticeCategory} onChange={(e) => setNewNoticeCategory(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-maroon-800 outline-none">
                <option value="Administrative">Administrative</option>
                <option value="Academic">Academic</option>
                <option value="Exam">Exam</option>
                <option value="Holiday">Holiday</option>
              </select>

              <div className="sm:col-span-3 flex justify-between items-center pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={newNoticeTicker} onChange={(e) => setNewNoticeTicker(e.target.checked)} className="w-4 h-4 rounded text-maroon-800"/>
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
            
            {notices.length > 0 ? (<div className="divide-y divide-slate-100">
                {notices.map((n) => (<div key={n.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">{n.category}</span>
                      <p className="font-bold text-navy-900 text-xs mt-1">{n.title}</p>
                    </div>
                    <button onClick={() => deleteNotice(n.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>))}
              </div>) : (<EmptyState title="No Circulars or Notices Posted Yet" description="Use the form above to publish your first announcement."/>)}
          </div>
        </section>)}

      {/* TAB CONTENT 2: EVENTS */}
      {activeTab === 'events' && (<section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800"/>
              Add Campus Event & Upload Poster Picture
            </h3>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input type="text" required placeholder="Event Title (e.g. Annual Day 2025)" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>
                <input type="date" required value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>
                <input type="text" placeholder="Venue (e.g. College Campus, Prasanth Nagar)" value={newEventVenue} onChange={(e) => setNewEventVenue(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>
                <select value={newEventIsUpcoming ? 'upcoming' : 'completed'} onChange={(e) => setNewEventIsUpcoming(e.target.value === 'upcoming')} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-maroon-800 outline-none font-bold">
                  <option value="upcoming">Upcoming Event</option>
                  <option value="completed">Completed / Past Event</option>
                </select>
              </div>

              <input type="text" placeholder="Event Description (e.g. Cultural celebrations and student performance event)" value={newEventDescription} onChange={(e) => setNewEventDescription(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>

              {/* REAL PHOTO FILE UPLOADER WITH PREVIEW */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Event Poster Picture (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-blue-600"/>
                    <span>Choose Photo File from PC</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setEventPhotoPreview, 'gallery')} className="hidden"/>
                  </label>

                  {eventPhotoPreview && (<div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={eventPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border"/>
                      <span className="text-xs text-emerald-600 font-bold">Photo Attached!</span>
                      <button type="button" onClick={() => setEventPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>)}
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
            
            {events.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((evt) => (<div key={evt.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {evt.posterUrl ? (<img src={evt.posterUrl} alt={evt.title} className="w-14 h-14 rounded-lg object-cover border border-slate-300 shrink-0"/>) : (<div className="w-14 h-14 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                          <ImageIcon className="w-6 h-6"/>
                        </div>)}
                      <div className="space-y-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${evt.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                          {evt.eventDate}
                        </span>
                        <h4 className="font-bold text-navy-900 text-xs mt-1">{evt.title}</h4>
                        <p className="text-[11px] text-slate-500">{evt.venue}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteEvent(evt.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors shrink-0">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>))}
              </div>) : (<EmptyState title="No Campus Events Listed Yet" description="Use the form above to schedule upcoming college events."/>)}
          </div>
        </section>)}

      {/* TAB CONTENT 3: FACULTY */}
      {activeTab === 'faculty' && (<section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800"/>
              Add Faculty Profile & Upload Photo
            </h3>

            <form onSubmit={handleAddFaculty} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" required placeholder="Faculty Name (e.g. Dr. Ramesh)" value={newFacultyName} onChange={(e) => setNewFacultyName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"/>
                <input type="text" placeholder="Subject (e.g. Physics)" value={newFacultySubject} onChange={(e) => setNewFacultySubject(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"/>
                <input type="text" placeholder="Designation (e.g. Senior Lecturer)" value={newFacultyDesignation} onChange={(e) => setNewFacultyDesignation(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs"/>
              </div>

              {/* REAL PHOTO FILE UPLOADER WITH PREVIEW */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Faculty Profile Photo (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-emerald-600"/>
                    <span>Choose Photo File from PC</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setFacultyPhotoPreview, 'faculty-photos')} className="hidden"/>
                  </label>

                  {facultyPhotoPreview ? (<div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={facultyPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-full border"/>
                      <span className="text-xs text-emerald-600 font-bold">Faculty Photo Attached!</span>
                      <button type="button" onClick={() => setFacultyPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>) : (<span className="text-xs text-slate-400 italic">No photo attached (Default portrait will be used)</span>)}
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
            
            {faculty.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {faculty.map((fac) => (<div key={fac.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {fac.photoUrl ? (<img src={fac.photoUrl} alt={fac.name} className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"/>) : (<div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                          {fac.name.charAt(0)}
                        </div>)}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">{fac.subject}</span>
                        <h4 className="font-bold text-navy-900 text-xs mt-1">{fac.name}</h4>
                        <p className="text-[11px] text-slate-500">{fac.designation}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteFaculty(fac.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors shrink-0">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>))}
              </div>) : (<EmptyState title="No Faculty Records Added Yet" description="Use the form above to add lecturer and staff profiles."/>)}
          </div>
        </section>)}

      {/* TAB CONTENT 4: RESULTS & TOPPERS MANAGEMENT */}
      {activeTab === 'results' && (<section className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-maroon-800"/>
                <span>{editingTopperId ? 'Edit Student Result Record' : 'Add New Student Result Record (1st Year / 2nd Year)'}</span>
              </h3>
              {editingTopperId && (
                <button onClick={handleCancelEditTopper} className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1">
                  <X className="w-3.5 h-3.5"/>
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSaveTopper} className="space-y-4">
              {/* Row 1: Academic Year, Student Name, Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year Class *</label>
                  <select value={newTopperYear} onChange={(e) => setNewTopperYear(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-maroon-800 outline-none">
                    <option value="1st Year">1st Year (Junior Inter)</option>
                    <option value="2nd Year">2nd Year (Senior Inter)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input type="text" required placeholder="e.g. K. Sai Kumar" value={newTopperName} onChange={(e) => setNewTopperName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hall Ticket / Roll No *</label>
                  <input type="text" required placeholder="e.g. 2415234891" value={newTopperRoll} onChange={(e) => setNewTopperRoll(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>
              </div>

              {/* Row 2: Stream, Marks Obtained, Max Marks, Grade, Rank */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Stream</label>
                  <select value={newTopperStream} onChange={(e) => setNewTopperStream(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-maroon-800 outline-none">
                    <option value="mpc">MPC (Mathematics)</option>
                    <option value="bipc">BiPC (Biology/NEET)</option>
                    <option value="cec">CEC (Commerce/Civics)</option>
                    <option value="mec">MEC (Maths & Commerce)</option>
                    <option value="hec">HEC (History/Arts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Marks Obtained</label>
                  <input type="text" placeholder="e.g. 492 or 985" value={newTopperMarksObtained} onChange={(e) => setNewTopperMarksObtained(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Total Marks</label>
                  <input type="text" placeholder="500 (1st Yr) / 1000 (2nd Yr)" value={newTopperMaxMarks} onChange={(e) => setNewTopperMaxMarks(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rank / Distinction</label>
                  <input type="text" placeholder="e.g. #1 College Topper" value={newTopperRank} onChange={(e) => setNewTopperRank(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>
              </div>

              {/* REAL PHOTO FILE UPLOADER WITH PREVIEW */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Student Photo / Result Poster (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-amber-600"/>
                    <span>Choose Photo from PC</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setTopperPhotoPreview, 'topper-photos')} className="hidden"/>
                  </label>

                  {topperPhotoPreview && (<div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={topperPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-full border"/>
                      <span className="text-xs text-emerald-600 font-bold">Photo Attached!</span>
                      <button type="button" onClick={() => setTopperPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>)}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                {editingTopperId && (
                  <button type="button" onClick={handleCancelEditTopper} className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs">
                    Cancel
                  </button>
                )}
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-xs shadow-md">
                  {editingTopperId ? 'Save & Update Result Record' : 'Add & Post Result Record'}
                </button>
              </div>
            </form>
          </div>

          {/* Results & Toppers List Data Display */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-navy-900 text-base">Stored Student Board Exam Results ({toppers.length})</h3>
              <div className="text-xs font-bold text-slate-500 flex gap-3">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-900">1st Year: {toppers.filter(t => t.academicYear === '1st Year' || !t.academicYear).length}</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900">2nd Year: {toppers.filter(t => t.academicYear === '2nd Year').length}</span>
              </div>
            </div>
            
            {toppers.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toppers.map((top) => (<div key={top.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-maroon-800 transition-colors">
                    <div className="flex items-center gap-3">
                      {top.photoUrl ? (<img src={top.photoUrl} alt={top.studentName} className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"/>) : (<div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                          {top.studentName.charAt(0)}
                        </div>)}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900">{top.rank || 'Board Topper'}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-navy-900 text-white">{top.academicYear || '1st Year'}</span>
                        </div>
                        <h4 className="font-bold text-navy-900 text-xs mt-1">{top.studentName}</h4>
                        {top.rollNumber && <p className="text-[10px] text-slate-500 font-mono">Roll: {top.rollNumber}</p>}
                        <p className="text-[11px] text-emerald-700 font-bold">{top.marksPercentage || `${top.marksObtained}/${top.maxMarks}`}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleStartEditTopper(top)} className="p-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-200 transition-colors" title="Edit Result Record">
                        <Edit2 className="w-4 h-4"/>
                      </button>
                      <button onClick={() => deleteTopper(top.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors" title="Delete Result Record">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>))}
              </div>) : (<EmptyState title="No Topper / Result Records Added Yet" description="Use the form above to add 1st Year and 2nd Year board exam results."/>)}
          </div>
        </section>)}

      {/* TAB CONTENT 5: LEADS */}
      {activeTab === 'leads' && (<section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-navy-900 text-base">Submitted Student Admission Inquiries ({leads.length})</h3>
          
          {leads.length > 0 ? (<div className="overflow-x-auto">
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
                  {leads.map((lead) => (<tr key={lead.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-navy-900">{lead.name}</td>
                      <td className="p-3 text-slate-600">{lead.phone}</td>
                      <td className="p-3 font-bold text-maroon-900">{lead.stream}</td>
                      <td className="p-3 text-slate-600">{lead.marks}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${lead.status === 'enrolled' ? 'bg-emerald-100 text-emerald-800' :
                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button onClick={() => updateLeadStatus(lead.id, 'contacted')} className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px]">
                          Mark Contacted
                        </button>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>) : (<EmptyState title="No Submitted Admission Inquiries Yet" description="New student inquiry submissions from the online Admissions form will appear here in real-time."/>)}
        </section>)}

      {/* TAB CONTENT 6: CAMPUS PHOTOS & FACILITIES */}
      {activeTab === 'campus_photos' && (<section className="space-y-8">
          
          {/* ADD CUSTOM CAMPUS FACILITY FORM */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-800"/>
              Add Custom Campus Facility / Infrastructure & Upload Photo
            </h3>

            <form onSubmit={handleAddCustomFacility} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" required placeholder="Facility Name (e.g. Computer Lab, Auditorium)" value={newFacilityTitle} onChange={(e) => setNewFacilityTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>
                <select value={newFacilityCategory} onChange={(e) => setNewFacilityCategory(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-maroon-800 outline-none font-bold">
                  <option value="Laboratory">Laboratory</option>
                  <option value="Classroom">Classroom / Digital Room</option>
                  <option value="Infrastructure">Campus Infrastructure</option>
                  <option value="Library">Library</option>
                  <option value="Sports">Sports Amenities</option>
                  <option value="Transport">Transport Service</option>
                </select>
                <input type="text" placeholder="Short Description (e.g. 50 high-speed systems)" value={newFacilityDescription} onChange={(e) => setNewFacilityDescription(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>

              {/* PHOTO FILE UPLOADER */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Upload Facility Photo Picture (JPG / PNG):</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-blue-600"/>
                    <span>Choose Photo File from PC</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setCustomFacilityPhotoPreview, 'gallery')} className="hidden"/>
                  </label>

                  {customFacilityPhotoPreview && (<div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={customFacilityPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border"/>
                      <span className="text-xs text-emerald-600 font-bold">Photo Attached!</span>
                      <button type="button" onClick={() => setCustomFacilityPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>)}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs shadow-md">
                  Save Custom Campus Facility
                </button>
              </div>
            </form>
          </div>

          {/* 1. HOME HERO BANNER SLIDES */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
                <Upload className="w-5 h-5 text-maroon-800"/>
                Home Page Hero Banner Photos
              </h3>
              <p className="text-xs text-slate-500">Upload your real college photo for each main slide on the home page hero carousel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {heroSlides.map((slide) => (<div key={slide.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="h-40 rounded-lg bg-navy-950 overflow-hidden relative flex items-center justify-center border">
                    {slide.photoUrl ? (<img src={slide.photoUrl} alt={slide.title} className="w-full h-full object-cover"/>) : (<div className="text-center p-3 text-slate-400">
                        <ImageIcon className="w-8 h-8 mx-auto text-amber-400 mb-1"/>
                        <p className="text-[10px] font-bold">No Custom Photo Attached</p>
                      </div>)}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-maroon-800 uppercase">{slide.tag}</span>
                    <h4 className="font-extrabold text-navy-900 text-xs line-clamp-1">{slide.title}</h4>
                  </div>

                  <label className="w-full py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-blue-600"/>
                    <span>{slide.photoUrl ? 'Change Banner Photo' : 'Upload Banner Photo'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, (url) => {
                    updateHeroSlidePhoto(slide.id, url);
                    setUploadStatus(`Home banner photo updated for '${slide.title}'!`);
                }, 'gallery')} className="hidden"/>
                  </label>
                </div>))}
            </div>
          </div>

          {/* 2. CAMPUS FACILITIES & LAB PHOTOS */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-maroon-800"/>
                Campus Labs, Library & Facility Photos ({facilities.length})
              </h3>
              <p className="text-xs text-slate-500">Upload official pictures or add custom campus facility cards</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((fac) => (<div key={fac.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-40 rounded-lg bg-slate-900 overflow-hidden relative flex items-center justify-center border">
                      {fac.photoUrl ? (<img src={fac.photoUrl} alt={fac.title} className="w-full h-full object-cover"/>) : (<div className="text-center p-3 text-slate-400">
                          <ImageIcon className="w-8 h-8 mx-auto text-amber-400 mb-1"/>
                          <p className="text-[10px] font-bold">No Custom Photo Attached</p>
                        </div>)}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-navy-900 uppercase bg-slate-200 px-2 py-0.5 rounded">{fac.category}</span>
                      <h4 className="font-extrabold text-navy-900 text-xs mt-1">{fac.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{fac.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <label className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4 text-blue-600"/>
                      <span>{fac.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, (url) => {
                    updateFacilityPhoto(fac.id, url);
                    setUploadStatus(`Facility photo updated for '${fac.title}'!`);
                }, 'gallery')} className="hidden"/>
                    </label>

                    <button onClick={() => {
                    if (confirm(`Delete '${fac.title}' facility card?`)) {
                        deleteFacility(fac.id);
                    }
                }} className="p-2 rounded-xl bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-300 transition-colors" title="Delete Facility">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </div>))}
            </div>
          </div>

          {/* 3. UPLOAD PHOTO TO COLLEGE ALBUMS */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-navy-900 text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-maroon-800"/>
              Upload Photo to Official College Photo Albums
            </h3>

            <form onSubmit={handleAddAlbumPhoto} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Photo Album Category *</label>
                  <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-maroon-800 outline-none font-bold">
                    {DEFAULT_ALBUMS.map((alb) => (<option key={alb.id} value={alb.id}>
                        {alb.title}
                      </option>))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Photo Caption / Event Title (Optional)</label>
                  <input type="text" placeholder="e.g. Volleyball Championship Final 2025" value={albumPhotoCaption} onChange={(e) => setAlbumPhotoCaption(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>
              </div>

              {/* PHOTO FILE UPLOADER */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Choose High-Resolution Event Photo from PC:</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4 text-blue-600"/>
                    <span>Choose Photo File from PC</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setAlbumPhotoPreview, 'gallery')} className="hidden"/>
                  </label>

                  {albumPhotoPreview && (<div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                      <img src={albumPhotoPreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border"/>
                      <span className="text-xs text-emerald-600 font-bold">Photo Attached!</span>
                      <button type="button" onClick={() => setAlbumPhotoPreview('')} className="text-slate-400 hover:text-red-600 p-1">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>)}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-xs shadow-md">
                  Upload Photo to Album
                </button>
              </div>
            </form>

            {/* ALBUM PHOTOS LIST & DELETION */}
            {galleryPhotos.length > 0 && (<div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-extrabold text-navy-900 text-xs">Uploaded Album Photos ({galleryPhotos.length}):</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {galleryPhotos.map((photo) => (<div key={photo.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-28">
                      <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover"/>
                      <button onClick={() => {
                        if (confirm('Delete this album photo?')) {
                            deleteGalleryPhoto(photo.id);
                        }
                    }} className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow" title="Delete Photo">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>))}
                </div>
              </div>)}
          </div>
        </section>)}

    </div>);
};
