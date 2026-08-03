import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ReCaptchaBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
      <span>
        Protected by <strong className="text-slate-700 font-semibold">reCAPTCHA v3</strong> (Spam & Bot Prevention Active).
      </span>
    </div>
  );
};
