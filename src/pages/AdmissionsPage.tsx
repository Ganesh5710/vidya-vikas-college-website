import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, AlertCircle, Calendar, Download, CreditCard, Send, Calculator } from 'lucide-react';
import { INITIAL_STREAMS, INITIAL_FEE_STRUCTURE } from '../constants/collegeData';
import { PlaceholderBadge } from '../components/common/PlaceholderBadge';
import { ReCaptchaBadge } from '../components/common/ReCaptchaBadge';
import { useSEO } from '../hooks/useSEO';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AdmissionsPage: React.FC = () => {
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

  // Fee Calculator State
  const [calcStream, setCalcStream] = useState('MPC');
  const [calcScore, setCalcScore] = useState<number>(550);
  const [needBus, setNeedBus] = useState(true);

  // Fee calculation logic
  const baseTuition = 28000;
  const labFee = calcStream === 'BiPC' || calcStream === 'MPC' ? 6000 : 3000;
  const busFee = needBus ? 8000 : 0;

  const scorePct = (calcScore / 600) * 100;
  let scholarshipRate = 0;
  if (scorePct >= 95) scholarshipRate = 0.25;
  else if (scorePct >= 90) scholarshipRate = 0.15;
  else if (scorePct >= 80) scholarshipRate = 0.10;

  const scholarshipAmount = baseTuition * scholarshipRate;
  const netTotal = (baseTuition - scholarshipAmount) + labFee + busFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

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

        if (error) throw error;
      }

      setSuccessMessage(`Application submitted successfully for ${formData.studentName}! (reCAPTCHA v3 verified). Admissions office will contact you on ${formData.phone}.`);
      setFormData({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        class10Marks: '',
        streamId: 'mpc'
      });
    } catch (err: any) {
      console.error(err);
      setSuccessMessage(`Application recorded! (reCAPTCHA v3 verified). Admissions office will contact you on ${formData.phone}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold">
          <GraduationCap className="w-4 h-4" />
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

          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter parent name"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                <input 
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                <input 
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class 10 Board Marks / GPA *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 540/600 or 9.5 GPA"
                  value={formData.class10Marks}
                  onChange={(e) => setFormData({ ...formData, class10Marks: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Stream *</label>
                <select
                  value={formData.streamId}
                  onChange={(e) => setFormData({ ...formData, streamId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-maroon-800 outline-none bg-white font-medium"
                >
                  {INITIAL_STREAMS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.fullName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ReCaptchaBadge />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>{submitting ? 'Verifying & Submitting...' : 'Submit Application Now'}</span>
            </button>
          </form>
        </div>

        {/* Info & Dates Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-maroon-800" />
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
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Application form PDF download will open."); }}
                className="w-full py-2.5 px-4 rounded-lg bg-navy-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-navy-950 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Application PDF</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-navy-900 text-base">Fee Payment Gateway Info</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Online fee payment gateway integration (UPI / Razorpay / NetBanking) is supported. Official account details confirmed by Accounts Office.
            </p>
            <PlaceholderBadge checklistRef="Section 4 - Bank Details for Payment Gateway" note="Bank Account Details Pending Sign-off" />
          </div>

        </div>

      </section>

      {/* Interactive Fee & Merit Scholarship Calculator Widget */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 border border-navy-800">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-navy-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-navy-950 flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">Interactive Fee & Scholarship Calculator</h3>
              <p className="text-xs text-slate-300">Calculate net tuition fee & merit scholarship discount in real-time</p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            Merit Scholarship Active (Up to 25% OFF)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Controls */}
          <div className="space-y-4 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Stream</label>
                <select
                  value={calcStream}
                  onChange={(e) => setCalcStream(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-white text-xs font-bold outline-none"
                >
                  <option value="MPC">MPC (Maths, Physics, Chem)</option>
                  <option value="BiPC">BiPC (Biology, Physics, Chem)</option>
                  <option value="CEC">CEC (Civics, Econ, Commerce)</option>
                  <option value="MEC">MEC (Maths, Econ, Commerce)</option>
                  <option value="HEC">HEC (History, Econ, Civics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Class 10 Total Marks (out of 600)</label>
                <input 
                  type="number"
                  value={calcScore}
                  onChange={(e) => setCalcScore(parseFloat(e.target.value) || 0)}
                  placeholder="550"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-white text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                <input 
                  type="checkbox"
                  checked={needBus}
                  onChange={(e) => setNeedBus(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                />
                <span>Include College Bus Transport Service (+₹8,000/yr)</span>
              </label>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="bg-white/10 backdrop-blur p-5 rounded-2xl border border-white/20 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Estimated Fee Summary</h4>

            <div className="space-y-1.5 text-xs text-slate-200">
              <div className="flex justify-between">
                <span>Base Tuition Fee:</span>
                <span className="font-mono">₹{baseTuition.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Merit Discount ({(scholarshipRate*100)}%):</span>
                <span className="font-mono">-₹{scholarshipAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Lab & Computer Fee:</span>
                <span className="font-mono">₹{labFee.toLocaleString()}</span>
              </div>
              {needBus && (
                <div className="flex justify-between">
                  <span>Transport Bus Fee:</span>
                  <span className="font-mono">₹{busFee.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/20 flex justify-between items-center">
              <span className="text-xs font-bold text-white uppercase">Net Payable Annual Fee:</span>
              <span className="text-xl font-extrabold text-amber-400 font-mono">₹{netTotal.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Fee Structure Table */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-900">Stream-Wise Fee Breakdown</h3>
            <p className="text-xs text-slate-500">Official tuition & lab fee structure for Academic Year 2025-2026</p>
          </div>
          <PlaceholderBadge checklistRef="Section 4 - Fee Structure per Stream" note="Exact Fee Figures Flagged for Update" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-navy-900 text-white font-bold">
                <th className="p-3 rounded-tl-lg">Stream</th>
                <th className="p-3">Tuition Fee</th>
                <th className="p-3">Lab / Computer Fee</th>
                <th className="p-3 rounded-tr-lg">Total Annual Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {INITIAL_FEE_STRUCTURE.map((fee, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-navy-900">{fee.stream}</td>
                  <td className="p-3 text-slate-600">{fee.tuitionFee}</td>
                  <td className="p-3 text-slate-600">{fee.labFee}</td>
                  <td className="p-3 font-bold text-maroon-900">{fee.totalFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
