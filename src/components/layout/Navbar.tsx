import React, { useState } from 'react';
import { Menu, X, ShieldAlert, LogOut, Home, Award, Lock } from 'lucide-react';
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
      
      {/* 1. GRAND INSTITUTIONAL BRANDING HEADER WITH OFFICIAL LOGO */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-6 border-b border-slate-100">
        
        {/* Left Official Logo Image */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img 
            src={COLLEGE_DETAILS.logoUrl} 
            alt={`${COLLEGE_DETAILS.name} Official Logo`}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full border-4 border-slate-100 shadow-xl group-hover:scale-105 transition-transform bg-white p-1"
          />
        </div>

        {/* Center Main College Name & Subheadings */}
        <div 
          onClick={() => handleNavClick('home')}
          className="text-center cursor-pointer flex-1 min-w-[280px]"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 tracking-tight leading-none uppercase font-serif">
            {COLLEGE_DETAILS.name}
          </h1>

          <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-navy-900 tracking-wider uppercase mt-1">
            MADANAPALLE
          </h2>

          <h3 className="text-xs sm:text-sm font-extrabold text-maroon-900 tracking-wide uppercase mt-0.5">
            (BIEAP RECOGNIZED INSTITUTION)
          </h3>

          <p className="text-xs sm:text-sm text-blue-700 italic font-bold mt-1">
            "{COLLEGE_DETAILS.tagline}"
          </p>

          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            {COLLEGE_DETAILS.address}
          </p>
        </div>

        {/* Right Seal - Prominent Big BIEAP A+ GRADE Seal */}
        <div className="hidden md:flex items-center shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-maroon-900 text-white flex flex-col items-center justify-center p-3 text-center shadow-xl border-4 border-amber-400 transition-transform hover:scale-105">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mb-0.5" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 leading-tight">BIEAP</span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-white">A+ GRADE</span>
          </div>
        </div>

      </div>

      {/* 2. STICKY FLOATING NAVIGATION BAR */}
      <header className="bg-white border-y border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          
          {/* Left Home Icon + Floating Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-1.5 rounded-lg transition-colors ${
                activeTab === 'home' ? 'text-maroon-900 bg-maroon-50' : 'text-slate-600 hover:text-maroon-900'
              }`}
              title="Home Page"
            >
              <Home className="w-4 h-4" />
            </button>

            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 uppercase tracking-wider text-[11px] ${
                  activeTab === item.id
                    ? 'text-maroon-900 font-black border-b-2 border-maroon-800'
                    : 'text-slate-700 hover:text-maroon-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button (STAFF LOGIN) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="px-4 py-1.5 rounded-full bg-maroon-900 text-white font-extrabold text-xs shadow flex items-center gap-1.5 hover:bg-maroon-950 transition-transform hover:scale-105"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>DASHBOARD ({user.role})</span>
                </button>

                <button
                  onClick={logout}
                  title="Sign Out Staff"
                  className="p-1.5 rounded-full text-slate-500 hover:text-red-600 hover:bg-slate-100"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="px-6 py-2 rounded-full bg-maroon-900 hover:bg-maroon-950 text-white font-black text-xs uppercase tracking-widest shadow-md transition-transform hover:scale-105 flex items-center gap-2 border border-maroon-800"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>LOGIN</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={COLLEGE_DETAILS.logoUrl} alt="Logo" className="w-9 h-9 object-contain rounded-full" />
              <span className="font-extrabold text-navy-900 text-xs uppercase tracking-wider">SVVJC MADANAPALLE</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
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
