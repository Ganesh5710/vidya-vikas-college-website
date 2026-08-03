import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  checklistRef?: string;
  responsibleStaff?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  checklistRef = "Section 4 - Content Checklist",
  responsibleStaff = "Department Head / Administrative Staff"
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-4 max-w-xl mx-auto my-6 shadow-sm">
      <div className="w-14 h-14 bg-amber-50 rounded-2xl text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
        <Clock className="w-7 h-7 animate-pulse" />
      </div>

      <div className="space-y-1">
        <h4 className="text-xl font-extrabold text-navy-900">{title}</h4>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 text-left inline-block w-full">
        <p className="font-bold text-navy-900 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Pending Staff Submission:</span>
        </p>
        <p className="text-[11px] text-slate-600">
          <strong className="text-slate-800">Checklist Reference:</strong> {checklistRef}
        </p>
        <p className="text-[11px] text-slate-600">
          <strong className="text-slate-800">Responsible Party:</strong> {responsibleStaff}
        </p>
      </div>
    </div>
  );
};
