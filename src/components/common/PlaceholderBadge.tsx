import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PlaceholderBadgeProps {
  checklistRef?: string;
  note?: string;
  className?: string;
}

export const PlaceholderBadge: React.FC<PlaceholderBadgeProps> = ({
  checklistRef = "Content Checklist Item",
  note = "Editable Placeholder Content",
  className = ""
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300 shadow-sm ${className}`}>
      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      <span>
        <strong className="font-semibold">{checklistRef}:</strong> {note}
      </span>
    </div>
  );
};
