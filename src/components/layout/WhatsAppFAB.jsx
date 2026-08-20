import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COLLEGE_DETAILS, INITIAL_CONTACT_INFO } from '../../constants/collegeData';
export const WhatsAppFAB = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNum = INITIAL_CONTACT_INFO.phoneAdmissions.replace(/[^0-9]/g, '') || "919059313830";
    const quickTemplates = [
        "Hi, I want to inquire about MPC (Engineering) 2025 Admissions.",
        "Hi, I want to know BiPC (NEET/Medicine) stream availability and fees.",
        "Hi, please send details regarding CEC/MEC streams and college timing.",
        "Hi, I want to visit SRI VIDYA VIKAS JC campus in Prasanth Nagar."
    ];
    const handleSendWhatsApp = (msg) => {
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/${phoneNum}?text=${encoded}`, '_blank');
    };
    return (<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      
      {/* WhatsApp Quick Chat Window */}
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
                <span className="text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
              </button>))}
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
            Official WhatsApp Channel • Prasanth Nagar, Madanapalle
          </div>
        </div>)}

      {/* Floating Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white focus:outline-none" title="Chat on WhatsApp with Admissions Desk">
        {isOpen ? (<X className="w-6 h-6"/>) : (<MessageCircle className="w-7 h-7 fill-white"/>)}
      </button>

    </div>);
};
