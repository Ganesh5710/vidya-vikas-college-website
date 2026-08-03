import React, { useState } from 'react';
import { GraduationCap, Menu, X, ShieldAlert, LogOut, Sparkles } from 'lucide-react';
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* College Branding */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-lg bg-navy-900 flex items-center justify-center text-white shadow-md border-2 border-maroon-800 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-navy-900 tracking-tight leading-tight group-hover:text-maroon-900 transition-colors">
              {COLLEGE_DETAILS.name}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <span>{COLLEGE_DETAILS.address}</span>
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors py-1 border-b-2 ${
                activeTab === item.id
                  ? 'text-maroon-900 border-maroon-800 font-extrabold'
                  : 'border-transparent text-slate-600 hover:text-maroon-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin Portal / Staff Login Button */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-maroon-900 text-white'
                    : 'bg-navy-900 text-white hover:bg-navy-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Dashboard</span>
              </button>
              <button
                onClick={logout}
                title="Log Out Staff Account"
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                activeTab === 'admin'
                  ? 'bg-maroon-900 text-white border-maroon-900'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-navy-900 hover:text-white hover:border-navy-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Staff Login</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-maroon-900 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full px-3 py-2 rounded-md text-sm font-bold bg-navy-900 text-white flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Staff Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
