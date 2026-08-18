import React from 'react';
import { Clock } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  responsibleStaff?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
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
    </div>
  );
};
