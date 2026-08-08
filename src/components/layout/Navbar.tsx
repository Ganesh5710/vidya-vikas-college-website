import React, { useState } from 'react';
import { Menu, X, ShieldAlert, LogOut, Home, Award, Lock, Sparkles } from 'lucide-react';
import { COLLEGE_DETAILS } from '../../constants/collegeData';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'streams', label: t('nav.streams') },
    { id: 'faculty', label: t('nav.faculty') },
    { id: 'admissions', label: t('nav.admissions') },
    { id: 'facilities', label: t('nav.facilities') },
    { id: 'results', label: t('nav.results') },
    { id: 'events', label: t('nav.events') },
    { id: 'studentCorner', label: t('nav.studentCorner') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white">
      
      {/* Top Tricolor Institutional Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-navy-950 via-maroon-900 to-amber-500"></div>

      {/* 1. GRAND INSTITUTIONAL BRANDING HEADER */}
      <div className="bg-gradient-to-b from-slate-50/90 via-white to-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-6">
          
          {/* Left Official Logo Image - Elegantly Proportioned */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative p-1 rounded-full bg-white shadow-xl border border-slate-200/80 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={COLLEGE_DETAILS.logoUrl} 
                alt={`${COLLEGE_DETAILS.name} Official Logo`}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain rounded-full bg-white"
              />
            </div>
          </div>

          {/* Center Main College Name & Structured Subtitles */}
          <div 
            onClick={() => handleNavClick('home')}
            className="text-center cursor-pointer flex-1 min-w-[280px] space-y-1.5"
          >
            {/* Primary Name */}
            <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black text-navy-950 tracking-tight leading-tight uppercase font-serif drop-shadow-sm">
              {COLLEGE_DETAILS.name}
            </h1>

            {/* Badges Row: Location & Recognition */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
              <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-widest bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                MADANAPALLE
              </span>
              <span className="text-xs font-extrabold text-maroon-900 bg-maroon-50 px-3 py-0.5 rounded-full border border-maroon-200 shadow-2xs">
                BIEAP RECOGNIZED INSTITUTION
              </span>
            </div>

            {/* Official Tagline */}
            <p className="text-xs sm:text-sm text-blue-700 italic font-bold flex items-center justify-center gap-1.5 pt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>"{COLLEGE_DETAILS.tagline}"</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            </p>

            {/* Address Line */}
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight">
              {COLLEGE_DETAILS.address}
            </p>
          </div>

          {/* Right Seal - Sleek Institutional BIEAP A+ GRADE Seal */}
          <div className="hidden md:flex items-center shrink-0">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-maroon-900 via-navy-900 to-maroon-950 text-white flex flex-col items-center justify-center p-2.5 text-center shadow-lg border-2 border-amber-400/90 ring-4 ring-amber-400/20 transition-transform hover:scale-105">
              <Award className="w-7 h-7 text-amber-400 mb-0.5" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 leading-tight">BIEAP</span>
              <span className="text-[10px] font-black tracking-widest text-white uppercase bg-amber-500/20 px-2 py-0.5 rounded-full mt-0.5 border border-amber-400/40">A+ GRADE</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STICKY FLOATING NAVIGATION BAR */}
      <header className="bg-white/95 backdrop-blur-md border-y border-slate-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          
          {/* Left Home Icon + Floating Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2 rounded-xl transition-all ${
                activeTab === 'home' ? 'text-white bg-maroon-900 shadow-sm' : 'text-slate-700 hover:bg-slate-100 hover:text-maroon-900'
              }`}
              title="Home Page"
            >
              <Home className="w-4 h-4" />
            </button>

            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-xl transition-all uppercase tracking-wider text-[11px] font-extrabold ${
                  activeTab === item.id
                    ? 'bg-maroon-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-maroon-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button (LOGIN) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="px-4 py-1.5 rounded-xl bg-maroon-900 text-white font-extrabold text-xs shadow flex items-center gap-1.5 hover:bg-maroon-950 transition-transform hover:scale-105"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>DASHBOARD ({user.role})</span>
                </button>

                <button
                  onClick={logout}
                  title="Sign Out Staff"
                  className="p-1.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-slate-100"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-maroon-900 via-navy-900 to-maroon-950 hover:from-maroon-950 hover:to-navy-950 text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition-all hover:scale-105 flex items-center gap-2 border border-amber-400/40"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>LOGIN</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center justify-between w-full py-1">
            <div className="flex items-center gap-2.5">
              <img src={COLLEGE_DETAILS.logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded-full border bg-white" />
              <span className="font-extrabold text-navy-950 text-xs uppercase tracking-wider">SVVJC MADANAPALLE</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider ${
                  activeTab === item.id
                    ? 'bg-maroon-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2.5 rounded-xl bg-maroon-900 text-white font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>STAFF LOGIN</span>
              </button>
            </div>
          </div>
        )}
      </header>

    </div>
  );
};
