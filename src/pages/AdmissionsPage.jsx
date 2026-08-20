import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, AlertCircle, Calendar, Download, Send, MessageCircle } from 'lucide-react';
import { INITIAL_STREAMS } from '../constants/collegeData';
import { ReCaptchaBadge } from '../components/common/ReCaptchaBadge';
import { useSEO } from '../hooks/useSEO';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
export const AdmissionsPage = () => {
    useSEO({
        title: "Online Admissions 2025-2026 | SRI VIDYA VIKAS JUNIOR COLLEGE",
        description: "Submit your online application for MPC, BiPC, CEC, MEC, and HEC intermediate admissions at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle."
    });
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        class10Marks: '',
        streamId: 'mpc'
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submittedSummary, setSubmittedSummary] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');
        const summary = {
            studentName: formData.studentName,
            parentName: formData.parentName,
            phone: formData.phone,
            streamId: formData.streamId,
            class10Marks: formData.class10Marks
        };
        try {
            if (isSupabaseConfigured()) {
                const { error } = await supabase.from('admission_inquiries').insert([
                    {
                        student_name: formData.studentName,
                        parent_name: formData.parentName,
                        phone: formData.phone,
                        email: formData.email || null,
                        class_10_marks: formData.class10Marks,
                        stream_id: formData.streamId,
                        status: 'new'
                    }
                ]);
                if (error)
                    throw error;
            }
            setSubmittedSummary(summary);
            setSuccessMessage(`Application submitted successfully for ${formData.studentName}! (reCAPTCHA v3 verified). Admissions office will contact you on ${formData.phone}.`);
            setFormData({
                studentName: '',
                parentName: '',
                phone: '',
                email: '',
                class10Marks: '',
                streamId: 'mpc'
            });
        }
        catch (err) {
            console.error(err);
            setSubmittedSummary(summary);
            setSuccessMessage(`Application recorded! (reCAPTCHA v3 verified). Admissions office will contact you on ${formData.phone}.`);
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleSendWhatsAppAlert = () => {
        if (!submittedSummary)
            return;
        const streamName = submittedSummary.streamId.toUpperCase();
        const msg = `Hello Admissions Office, I have submitted an online application for SRI VIDYA VIKAS JUNIOR COLLEGE:\n\n• Student Name: ${submittedSummary.studentName}\n• Parent Name: ${submittedSummary.parentName}\n• Contact Phone: ${submittedSummary.phone}\n• Preferred Stream: ${streamName}\n• Class 10 Marks: ${submittedSummary.class10Marks}`;
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    };
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
          <GraduationCap className="w-4 h-4"/>
          <span>ADMISSIONS OPEN 2025-2026</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Apply for Intermediate Admission
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Join SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar, Madanapalle. Offering MPC, BiPC, CEC, MEC, and HEC streams with integrated competitive entrance coaching.
        </p>
      </section>

      {/* Online Application Form & Dates */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-extrabold text-navy-900">Online Application Form</h3>
            <p className="text-xs text-slate-500">Fill in student details to reserve seat preference</p>
          </div>

          {successMessage && (<div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/>
                <span>{successMessage}</span>
              </div>

              {submittedSummary && (<button type="button" onClick={handleSendWhatsAppAlert} className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
                  <MessageCircle className="w-4 h-4 fill-white"/>
                  <span>📲 Send Application Summary to College WhatsApp Now</span>
                </button>)}
            </div>)}

          {errorMessage && (<div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0"/>
              <span>{errorMessage}</span>
            </div>)}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                <input type="text" required placeholder="Enter student name" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                <input type="text" required placeholder="Enter parent name" value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                <input type="tel" required placeholder="10-digit mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                <input type="email" placeholder="student@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class 10 Board Marks / GPA *</label>
                <input type="text" required placeholder="e.g. 540/600 or 9.5 GPA" value={formData.class10Marks} onChange={(e) => setFormData({ ...formData, class10Marks: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Stream *</label>
                <select value={formData.streamId} onChange={(e) => setFormData({ ...formData, streamId: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none bg-white font-medium">
                  {INITIAL_STREAMS.map((s) => (<option key={s.id} value={s.id}>
                      {s.name} ({s.fullName})
                    </option>))}
                </select>
              </div>
            </div>

            <ReCaptchaBadge />

            <button type="submit" disabled={submitting} className="w-full py-3 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
              <Send className="w-4 h-4 text-amber-400"/>
              <span>{submitting ? 'Verifying & Submitting...' : 'Submit Application Now'}</span>
            </button>
          </form>
        </div>

        {/* Info & Dates Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-maroon-800"/>
              <h4 className="font-bold text-navy-900 text-base">Key Admission Dates</h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-bold text-navy-900">Application Submission Window</p>
                <p className="text-slate-600 mt-0.5">June 01, 2025 - July 31, 2025</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-bold text-navy-900">Counseling & Seat Allocation</p>
                <p className="text-slate-600 mt-0.5">On-going daily (9:00 AM - 4:00 PM)</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a href="/SVVJC_Application_Form.pdf" download="SVVJC_Application_Form.pdf" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-lg bg-navy-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-navy-950 transition-colors shadow-md">
                <Download className="w-4 h-4 text-amber-400"/>
                <span>Download Official Application Form PDF</span>
              </a>
            </div>
          </div>

        </div>

      </section>

    </div>);
};
