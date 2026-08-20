import React, { useState } from 'react';
import { PhoneCall, Navigation, MessageCircle, X, MapPin, FileText } from 'lucide-react';
import { COLLEGE_DETAILS, INITIAL_CONTACT_INFO } from '../../constants/collegeData';
export const MobileQuickActionsFAB = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumRaw = INITIAL_CONTACT_INFO.phoneAdmissions || "+91 9059313830";
    const phoneNumClean = phoneNumRaw.replace(/[^0-9+]/g, '');
    const waNumClean = phoneNumRaw.replace(/[^0-9]/g, '') || "919059313830";
    const mapsUrl = COLLEGE_DETAILS.googleMapsUrl || "https://maps.google.com/?q=Sri+Vidya+Vikas+Junior+College+Prasanth+Nagar+Extension+Madanapalle";
    const quickTemplates = [
        "Hi, I want to inquire about MPC (Engineering) 2025 Admissions.",
        "Hi, I want to know BiPC (NEET/Medicine) stream availability and fees.",
        "Hi, please send details regarding CEC/MEC/HEC streams and college timing.",
        "Hi, I want to visit SRI VIDYA VIKAS JC campus in Prasanth Nagar."
    ];
    const handleSendWhatsApp = (msg) => {
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/${waNumClean}?text=${encoded}`, '_blank');
    };
    return (<>
      {/* 1. DESKTOP & MOBILE FLOATING BUTTONS STACK (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 print:hidden">

        {/* WhatsApp Quick Chat Window Popup */}
        {isOpen && (<div className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 w-80 sm:w-96 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                  <MessageCircle className="w-5 h-5 fill-white"/>
                </div>
                <div>
                  <h4 className="font-extrabold text-navy-900 text-sm">Admissions Desk WhatsApp</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Online • Quick Reply
                  </p>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Welcome to <strong className="text-navy-900">{COLLEGE_DETAILS.name}</strong>! Click a quick question below to chat directly with our admissions counselor on WhatsApp:
            </p>

            <div className="space-y-2">
              {quickTemplates.map((template, idx) => (<button key={idx} onClick={() => handleSendWhatsApp(template)} className="w-full p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left text-xs text-slate-700 font-medium transition-colors flex items-center justify-between group">
                  <span>{template}</span>
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"/>
                </button>))}
            </div>

            {/* Direct Call Action Inside Popup */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <a href={`tel:${phoneNumClean}`} className="flex-1 py-2 px-3 rounded-xl bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold flex items-center justify-center gap-2 shadow">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400"/>
                <span>Call Admissions Desk</span>
              </a>

              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold flex items-center justify-center gap-2 shadow">
                <MapPin className="w-3.5 h-3.5"/>
                <span>Get Directions</span>
              </a>
            </div>
          </div>)}

        {/* Action Trigger Buttons Stack */}
        <div className="flex items-center gap-2">

          {/* Quick Call Direct Link */}
          <a href={`tel:${phoneNumClean}`} className="p-3.5 rounded-full bg-navy-900 hover:bg-navy-950 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white" title="Call Admissions Desk Now">
            <PhoneCall className="w-5 h-5 text-amber-400"/>
          </a>

          {/* WhatsApp Toggle FAB */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white relative group" title="Chat on WhatsApp">
            {isOpen ? <X className="w-6 h-6"/> : <MessageCircle className="w-6 h-6 fill-white"/>}
            <span className="absolute right-full mr-3 px-3 py-1 rounded-lg bg-navy-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
              Chat on WhatsApp
            </span>
          </button>

        </div>
      </div>

      {/* 2. STICKY MOBILE BOTTOM NAVIGATION BAR (Visible on screens < sm) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-md border-t border-navy-800 p-2 text-white flex items-center justify-around shadow-2xl print:hidden">
        <a href={`tel:${phoneNumClean}`} className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-amber-400 hover:text-white">
          <PhoneCall className="w-4 h-4"/>
          <span>Call Now</span>
        </a>

        <button onClick={() => setIsOpen(true)} className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-emerald-400 hover:text-white">
          <MessageCircle className="w-4 h-4 fill-emerald-400 text-navy-950"/>
          <span>WhatsApp</span>
        </button>

        <a href="/SVVJC_Application_Form.pdf" download="SVVJC_Application_Form.pdf" className="px-3 py-1.5 rounded-lg bg-maroon-900 text-amber-400 text-[10px] font-extrabold flex items-center gap-1 shadow">
          <FileText className="w-3 h-3"/>
          <span>App Form</span>
        </a>
      </div>
    </>);
};
