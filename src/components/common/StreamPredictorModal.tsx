import React, { useState } from 'react';
import { Sparkles, X, CheckCircle, Calculator, GraduationCap, ArrowRight } from 'lucide-react';
import { INITIAL_STREAMS } from '../../constants/collegeData';

interface StreamPredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStream: (streamId: string) => void;
}

export const StreamPredictorModal: React.FC<StreamPredictorModalProps> = ({
  isOpen,
  onClose,
  onSelectStream
}) => {
  const [marks, setMarks] = useState<string>('550');
  const [maxMarks, setMaxMarks] = useState<string>('600');
  const [careerGoal, setCareerGoal] = useState<string>('engineering');

  if (!isOpen) return null;

  const scoreNum = parseFloat(marks) || 0;
  const maxNum = parseFloat(maxMarks) || 600;
  const percentage = maxNum > 0 ? (scoreNum / maxNum) * 100 : 0;

  // Stream recommendation logic
  let recommendedStreamId = 'mpc';
  let scholarshipDiscount = 0;
  let eligibilityVerdict = "High Admission Probability";

  if (careerGoal === 'medicine') {
    recommendedStreamId = 'bipc';
  } else if (careerGoal === 'ca_finance') {
    recommendedStreamId = 'mec';
  } else if (careerGoal === 'commerce_arts') {
    recommendedStreamId = 'cec';
  } else if (careerGoal === 'civil_services') {
    recommendedStreamId = 'hec';
  } else {
    recommendedStreamId = 'mpc';
  }

  if (percentage >= 95) {
    scholarshipDiscount = 25; // 25% Merit Scholarship
  } else if (percentage >= 90) {
    scholarshipDiscount = 15; // 15% Merit Scholarship
  } else if (percentage >= 80) {
    scholarshipDiscount = 10;
  }

  const recommendedStream = INITIAL_STREAMS.find(s => s.id === recommendedStreamId) || INITIAL_STREAMS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-maroon-900 text-amber-400 flex items-center justify-center font-bold shadow">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-maroon-900 bg-maroon-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
              AI Admission Assistant
            </span>
            <h3 className="text-xl font-extrabold text-navy-900">Class 10 Stream & Career Predictor</h3>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Class 10 Marks</label>
              <input 
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                placeholder="e.g. 550"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 focus:ring-2 focus:ring-maroon-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Out of Total Marks</label>
              <input 
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                placeholder="600"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 focus:ring-2 focus:ring-maroon-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Career Goal</label>
            <select
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-900 focus:ring-2 focus:ring-maroon-800 outline-none bg-white"
            >
              <option value="engineering">Engineering (IIT, NIT, EAMCET, B.Tech)</option>
              <option value="medicine">Medicine / MBBS (NEET-UG, Pharmacy, Biotech)</option>
              <option value="ca_finance">CA / Chartered Accountant, Economics (MEC)</option>
              <option value="commerce_arts">Commerce, Business Administration & Law (CEC)</option>
              <option value="civil_services">UPSC / Civil Services & Humanities (HEC)</option>
            </select>
          </div>
        </div>

        {/* Prediction Results Banner */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white p-6 rounded-2xl space-y-4 border border-navy-800 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Calculated Score: {percentage.toFixed(1)}%
            </span>
            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {eligibilityVerdict}
            </span>
          </div>

          <div>
            <p className="text-xs text-slate-400">Recommended Intermediate Stream:</p>
            <h4 className="text-2xl font-extrabold text-white mt-0.5">{recommendedStream.name} ({recommendedStream.fullName})</h4>
          </div>

          {scholarshipDiscount > 0 && (
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center justify-between">
              <span>🎉 Eligible for Merit Scholarship Discount:</span>
              <strong className="text-amber-400 text-sm font-extrabold">{scholarshipDiscount}% OFF Tuition Fee</strong>
            </div>
          )}

          <div className="text-xs text-slate-300 pt-2 border-t border-slate-800 space-y-1">
            <p className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes integrated EAMCET / NEET / JEE prep from Day 1.</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Close Predictor
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectStream('admissions');
            }}
            className="px-6 py-3 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Apply for {recommendedStream.name} Admission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
