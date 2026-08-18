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
    { id: 'events', label: 'EVENTS' },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white">
      
      {/* Top Institutional Line */}
      <div className="h-1 w-full bg-gradient-to-r from-navy-900 via-maroon-900 to-navy-900"></div>

      {/* 1. TRADITIONAL INSTITUTIONAL HEADER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-6">
          
          {/* Left: Official College Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center shrink-0 cursor-pointer group"
          >
            <img 
              src={COLLEGE_DETAILS.logoUrl || '/logo.jpg'} 
              alt={`${COLLEGE_DETAILS.name} Official Logo`}
              onError={(e) => { (e.target as HTMLImageElement).src = '/logo.jpg'; }}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Center: Institutional Title & Subtitles in Classical Hierarchy */}
          <div 
            onClick={() => handleNavClick('home')}
            className="text-center flex-1 cursor-pointer space-y-1"
          >
            {/* 1. College Main Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 tracking-tight leading-none uppercase font-serif">
              {COLLEGE_DETAILS.name}
            </h1>

            {/* 2. City / Town */}
            <h2 className="text-sm sm:text-base font-extrabold text-navy-900 uppercase tracking-widest pt-0.5">
              MADANAPALLE
            </h2>

            {/* 3. Affiliation / Recognition Tagline */}
            <p className="text-xs sm:text-sm font-bold text-maroon-900 uppercase tracking-wide">
              (RECOGNIZED BY GOVT. OF A.P. & AFFILIATED TO BIEAP)
            </p>

            {/* 4. Motto / Tagline */}
            <p className="text-xs sm:text-sm font-bold text-blue-700 italic">
              "{COLLEGE_DETAILS.tagline}"
            </p>

            {/* 5. Address */}
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
              {COLLEGE_DETAILS.address}
            </p>
          </div>

          {/* Right: Official BIEAP Seal Stamp */}
          <div className="hidden md:flex items-center shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-maroon-900 to-navy-950 text-white flex flex-col items-center justify-center p-2 text-center shadow-md border-2 border-amber-400">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 mb-0.5" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">BIEAP</span>
              <span className="text-[9px] font-extrabold tracking-widest text-white uppercase">RECOGNIZED</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STICKY FLOATING NAVIGATION BAR */}
      <header className="bg-white border-y border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          
          {/* Left Home Icon + Nav Items */}
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
                className={`px-3.5 py-1.5 rounded-xl transition-all uppercase tracking-wider text-[11px] font-extrabold ${
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
                className="px-5 py-2 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-white font-extrabold text-xs uppercase tracking-widest shadow transition-all hover:scale-105 flex items-center gap-2 border border-maroon-800"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>LOGIN</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center justify-between w-full py-1">
            <div className="flex items-center gap-2.5">
              <img src={COLLEGE_DETAILS.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
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
