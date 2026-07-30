import React from 'react';

const STATUS_STYLES = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    label: 'Pending',
  },
  replied: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    label: 'Replied',
  },
  closed: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    label: 'Closed',
  },
};

export default function InquiryStatusBadge({ status, className = '' }) {
  // Fallback for unknown status values
  const style = STATUS_STYLES[status] || {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    label: status || 'Unknown',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${style.bg} ${style.text} ${style.border}
        ${className}
      `}
    >
      {/* Small dot indicator */}
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.text.replace('text-', 'bg-')}`} />
      {style.label}
    </span>
  );
}