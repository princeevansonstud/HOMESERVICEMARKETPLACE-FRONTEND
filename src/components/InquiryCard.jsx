import React from 'react';
import InquiryStatusBadge from './InquiryStatusBadge';


function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

export default function InquiryCard({ inquiry, onClick, userRole }) {
 
  if (!inquiry) return null;

  const otherParty =
    userRole === 'customer'
      ? inquiry.listing?.title || 'Unknown Listing'
      : inquiry.customer?.name || 'Unknown Customer';

  const subtitle =
    userRole === 'customer'
      ? `About: ${otherParty}`
      : `From: ${otherParty}`;

  
  const messagePreview =
    inquiry.message?.length > 100
      ? inquiry.message.substring(0, 100) + '...'
      : inquiry.message || 'No message';

  return (
    <div
      onClick={onClick}
      className="
        bg-white rounded-lg shadow-sm border border-gray-200 p-4
        hover:shadow-md hover:border-blue-300
        transition-all duration-200 cursor-pointer
      "
    >
      {/* Top row: Title + Status */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {subtitle}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {timeAgo(inquiry.created_at)}
          </p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <InquiryStatusBadge status={inquiry.status} />
        </div>
      </div>

      {/* Message preview */}
      <p className="text-sm text-gray-700 line-clamp-2">
        {messagePreview}
      </p>

      {/* Bottom hint */}
      <p className="text-xs text-gray-400 mt-2">
        Click to view details
      </p>
    </div>
  );
}