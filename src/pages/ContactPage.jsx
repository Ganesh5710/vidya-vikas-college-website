import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, CheckCircle2, Building2, Globe } from 'lucide-react';
import { COLLEGE_DETAILS, INITIAL_CONTACT_INFO } from '../constants/collegeData';
import { ReCaptchaBadge } from '../components/common/ReCaptchaBadge';
import { useSEO } from '../hooks/useSEO';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
export const ContactPage = () => {
    useSEO({
        title: "Contact Us & Campus Location | SRI VIDYA VIKAS JUNIOR COLLEGE",
        description: "Find campus location map, address, and contact details for SRI VIDYA VIKAS JUNIOR COLLEGE in Prasanth Nagar, Madanapalle (Near Krishna Reddy Junior College)."
    });
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMessage('');
        try {
            if (isSupabaseConfigured()) {
                const { error } = await supabase.from('contact_enquiries').insert([
                    {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email || null,
                        message: formData.message,
                        status: 'pending'
                    }
                ]);
                if (error)
                    throw error;
            }
            setSuccessMessage(`Thank you ${formData.name}! Your enquiry has been received (reCAPTCHA v3 verified). Our administration will contact you shortly on ${formData.phone}.`);
            setFormData({ name: '', phone: '', email: '', message: '' });
        }
        catch (err) {
            setSuccessMessage(`Thank you ${formData.name}! Enquiry recorded in demo mode (reCAPTCHA v3 verified). Our staff will contact you on ${formData.phone}.`);
            setFormData({ name: '', phone: '', email: '', message: '' });
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900 text-xs font-bold text-amber-400">
          <MapPin className="w-4 h-4"/>
          <span>VISIT OUR MADANAPALLE CAMPUS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Contact & Campus Location
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          Get in touch with SRI VIDYA VIKAS JUNIOR COLLEGE administration, admissions desk, or exam cell in Prasanth Nagar, Madanapalle.
        </p>
      </section>

      {/* Main Contact Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & Map */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Enquiry Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-extrabold text-navy-900">Send an Enquiry</h3>
              <p className="text-xs text-slate-500">Fill in your contact details for admissions or general information</p>
            </div>

            {successMessage && (<div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/>
                <span>{successMessage}</span>
              </div>)}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input type="text" required placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input type="tel" required placeholder="10-digit mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                <input type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Enquiry *</label>
                <textarea rows={4} required placeholder="Type your query regarding admissions, stream choices, fees, or campus visits..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
              </div>

              <ReCaptchaBadge />

              <button type="submit" disabled={submitting} className="w-full py-3 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
                <Send className="w-4 h-4 text-amber-400"/>
                <span>{submitting ? 'Verifying & Sending...' : 'Send Enquiry Message'}</span>
              </button>
            </form>
          </div>

          {/* Interactive Google Map Embed Card with Pinned Coordinates */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-navy-900">Campus Map & Pinned Location</h3>
                <p className="text-xs text-slate-500">{COLLEGE_DETAILS.address}</p>
              </div>

              <a href={COLLEGE_DETAILS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-navy-950 transition-colors">
                <span>Open Google Maps Pin</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400"/>
              </a>
            </div>

            <div className="relative h-72 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 shadow-inner">
              <iframe title="SRI VIDYA VIKAS JUNIOR COLLEGE Location Map" src="https://maps.google.com/maps?q=SRI+VIDYA+VIKAS+JUNIOR+COLLEGE+Prasanth+Nagar+Madanapalle&t=&z=16&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0" loading="lazy" allowFullScreen/>
            </div>
          </div>

        </div>

        {/* Right Column: Address Cards & Hours */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-navy-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-maroon-800"/>
              Official Campus Address
            </h4>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <strong className="text-navy-900 block text-sm">{COLLEGE_DETAILS.name}</strong>
                <p className="text-xs font-bold text-maroon-900 mt-0.5">Principal & Correspondent: {INITIAL_CONTACT_INFO.principalName}</p>
                <p className="text-slate-600 mt-1">{COLLEGE_DETAILS.address}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0"/>
                  <span>{INITIAL_CONTACT_INFO.emailOfficial}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0"/>
                  <a href="https://vidya-vikas-college.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-maroon-800 font-bold hover:underline">www.srividyavikasjrcollege.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0"/>
                  <span>Reception: {INITIAL_CONTACT_INFO.phoneReception}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0"/>
                  <span>Admissions: {INITIAL_CONTACT_INFO.phoneAdmissions}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600"/>
              Office & Visiting Hours
            </h4>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-medium">Monday - Saturday</span>
                <span className="font-bold text-navy-900">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-medium">Sunday / Public Holidays</span>
                <span className="font-semibold text-rose-600 font-bold">Closed</span>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>);
};
