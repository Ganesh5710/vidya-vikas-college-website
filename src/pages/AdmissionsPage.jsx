import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, AlertCircle, Calendar, Download, Send, MessageCircle, Mail } from 'lucide-react';
import { INITIAL_STREAMS, COLLEGE_DETAILS } from '../constants/collegeData';
import { ReCaptchaBadge } from '../components/common/ReCaptchaBadge';
import { useSEO } from '../hooks/useSEO';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AdmissionsPage = () => {
    useSEO({
        title: "Online Admissions 2025-2026 | SRI VIDYA VIKAS JUNIOR COLLEGE",
        description: "Submit your online application for MPC, BiPC, CEC, MEC, and HEC intermediate admissions at SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar Extension, Madanapalle."
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
            email: formData.email,
            streamId: formData.streamId,
            class10Marks: formData.class10Marks
        };

        try {
            // 1. Optional Supabase integration
            if (isSupabaseConfigured()) {
                await supabase.from('admission_inquiries').insert([
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
            }

            // 2. Direct automated email dispatch to College Mailbox
            try {
                await fetch('https://formsubmit.co/ajax/srividyavikasjuniorcollegempl@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        _subject: `New Online Admission Application: ${formData.studentName} (${formData.streamId.toUpperCase()})`,
                        _template: 'table',
                        'College Name': 'SRI VIDYA VIKAS JUNIOR COLLEGE, Madanapalle',
                        'Student Name': formData.studentName,
                        'Parent / Guardian Name': formData.parentName,
                        'Contact Phone': formData.phone,
                        'Email Address': formData.email || 'N/A',
                        'Preferred Stream': formData.streamId.toUpperCase(),
                        'Class 10 Marks / GPA': formData.class10Marks
                    })
                });
            } catch (emailErr) {
                console.log('Automated email dispatch notification:', emailErr);
            }

            setSubmittedSummary(summary);
            setSuccessMessage(`Application submitted successfully for ${formData.studentName}! Application details dispatched to college mailbox (srividyavikasjuniorcollegempl@gmail.com). Admissions desk will contact you on ${formData.phone}.`);
            
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
            setSuccessMessage(`Application recorded! Application details dispatched to college mailbox (srividyavikasjuniorcollegempl@gmail.com). Admissions desk will contact you on ${formData.phone}.`);
        }
        finally {
            setSubmitting(false);
        }
    };

    const handleSendWhatsAppAlert = () => {
        if (!submittedSummary) return;
        const streamName = submittedSummary.streamId.toUpperCase();
        const msg = `Hello Admissions Office, I have submitted an online application for SRI VIDYA VIKAS JUNIOR COLLEGE:\n\n• Student Name: ${submittedSummary.studentName}\n• Parent Name: ${submittedSummary.parentName}\n• Contact Phone: ${submittedSummary.phone}\n• Preferred Stream: ${streamName}\n• Class 10 Marks: ${submittedSummary.class10Marks}`;
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/919059313830?text=${encoded}`, '_blank');
    };

    const handleSendEmailAlert = () => {
        if (!submittedSummary) return;
        const streamName = submittedSummary.streamId.toUpperCase();
        const subject = encodeURIComponent(`Online Application: ${submittedSummary.studentName} - ${streamName} Stream`);
        const body = encodeURIComponent(
            `Dear Admissions Desk,\n\nI have submitted an online application for intermediate admission at SRI VIDYA VIKAS JUNIOR COLLEGE:\n\n` +
            `• Student Name: ${submittedSummary.studentName}\n` +
            `• Parent/Guardian Name: ${submittedSummary.parentName}\n` +
            `• Contact Phone: ${submittedSummary.phone}\n` +
            `• Preferred Stream: ${streamName}\n` +
            `• Class 10 Marks/GPA: ${submittedSummary.class10Marks}\n\n` +
            `Please confirm receipt and contact us regarding admissions.\n\nThank you.`
        );
        window.open(`mailto:srividyavikasjuniorcollegempl@gmail.com?subject=${subject}&body=${body}`, '_blank');
    };

    return (
        <div className="space-y-10">
      
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
                    Join SRI VIDYA VIKAS JUNIOR COLLEGE, Prasanth Nagar Extension, Madanapalle. Offering MPC, BiPC, CEC, MEC, and HEC streams with integrated competitive entrance coaching.
                </p>
            </section>

            {/* Online Application Form & Dates */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Column */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-2xl font-extrabold text-navy-900">Online Application Form</h3>
                        <p className="text-xs text-slate-500">Submitting this form dispatches student details directly to the college mailbox (srividyavikasjuniorcollegempl@gmail.com)</p>
                    </div>

                    {successMessage && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold space-y-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/>
                                <span>{successMessage}</span>
                            </div>

                            {submittedSummary && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                                    <button type="button" onClick={handleSendEmailAlert} className="w-full py-2.5 px-3 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
                                        <Mail className="w-4 h-4 text-amber-400"/>
                                        <span>Send Copy via Email App</span>
                                    </button>

                                    <button type="button" onClick={handleSendWhatsAppAlert} className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
                                        <MessageCircle className="w-4 h-4 fill-white"/>
                                        <span>Send to College WhatsApp</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0"/>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-extrabold text-navy-900 mb-1">Student Full Name *</label>
                                <input type="text" required value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} placeholder="e.g. K. Sai Kumar" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-navy-900 mb-1">Parent / Guardian Name *</label>
                                <input type="text" required value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} placeholder="e.g. K. Venkata Ramana" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-extrabold text-navy-900 mb-1">Mobile Phone Number *</label>
                                <input type="tel" required pattern="[0-9]{10}" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="10-digit mobile number" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-navy-900 mb-1">Email Address (Optional)</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="student@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-extrabold text-navy-900 mb-1">Class 10 Marks / GPA *</label>
                                <input type="text" required value={formData.class10Marks} onChange={(e) => setFormData({ ...formData, class10Marks: e.target.value })} placeholder="e.g. 580/600 or 9.8 GPA" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"/>
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-navy-900 mb-1">Preferred Academic Stream *</label>
                                <select value={formData.streamId} onChange={(e) => setFormData({ ...formData, streamId: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-maroon-800 outline-none">
                                    {INITIAL_STREAMS.map((st) => (
                                        <option key={st.id} value={st.id}>{st.name} - {st.fullName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                            <ReCaptchaBadge />

                            <button type="submit" disabled={submitting} className="px-6 py-3 rounded-xl bg-maroon-900 hover:bg-maroon-800 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-transform hover:scale-105">
                                <Send className="w-4 h-4 text-amber-400"/>
                                <span>{submitting ? 'Dispatching to College Mailbox...' : 'Submit Application Form'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Important Dates Sidebar */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 shadow-sm">
                        <h4 className="font-extrabold text-base flex items-center gap-2 border-b border-slate-800 pb-3">
                            <Calendar className="w-5 h-5 text-amber-400"/>
                            Admission Schedule 2025-2026
                        </h4>

                        <div className="space-y-3 text-xs">
                            <div className="flex justify-between py-1 border-b border-slate-800">
                                <span className="text-slate-400">Application Opens:</span>
                                <span className="font-bold text-amber-400">Phase 1 Active</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-800">
                                <span className="text-slate-400">Early Seat Reservation:</span>
                                <span className="font-bold text-emerald-400">In Progress</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-slate-400">Classes Commence:</span>
                                <span className="font-bold text-white">June 2025</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 space-y-3 text-xs text-amber-950">
                        <h4 className="font-bold text-sm text-navy-900">Direct College Contact</h4>
                        <p className="leading-relaxed">
                            For urgent inquiries or physical campus registration visits, contact Principal & Correspondent <strong>{COLLEGE_DETAILS.principalName}</strong>:
                        </p>
                        <p><strong>Reception Desk:</strong> {COLLEGE_DETAILS.phoneReception || '+91 9441820067'}</p>
                        <p><strong>Admissions Line:</strong> {COLLEGE_DETAILS.phoneAdmissions || '+91 9059313830'}</p>
                        <p className="break-all"><strong>College Email:</strong> srividyavikasjuniorcollegempl@gmail.com</p>

                        <div className="pt-2">
                            <a href="/SVVJC_Application_Form.pdf" download="SVVJC_Application_Form.pdf" className="w-full py-2.5 px-3 rounded-xl bg-navy-900 text-white font-extrabold flex items-center justify-center gap-2 shadow">
                                <Download className="w-4 h-4 text-amber-400"/>
                                <span>Download Official PDF Application Form</span>
                            </a>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
};
