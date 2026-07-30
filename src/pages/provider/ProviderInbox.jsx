import React, { useState, useEffect } from 'react';
import { getMyInquiries, updateInquiryStatus } from '../../services/inquiryService';
import InquiryCard from '../../components/InquiryCard';
import InquiryStatusBadge from '../../components/InquiryStatusBadge';

export default function ProviderInbox() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updateLoading, setUpdateLoading] = useState(null);

  // Fetch inquiries on mount and when filter changes
  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);

    try {
      const filter = statusFilter === 'all' ? null : statusFilter;
      const response = await getMyInquiries(filter);

      if (response.success) {
        setInquiries(response.data || []);
      } else {
        setError(response.message || 'Failed to load inquiries.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to load inquiries. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    setUpdateLoading(inquiryId);

    try {
      const response = await updateInquiryStatus(inquiryId, newStatus);

      if (response.success) {
        // Update local state without refetching
        setInquiries((prev) =>
          prev.map((inquiry) =>
            inquiry.id === inquiryId
              ? { ...inquiry, status: newStatus, updated_at: new Date().toISOString() }
              : inquiry
          )
        );
      } else {
        alert(response.message || 'Failed to update status.');
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setUpdateLoading(null);
    }
  };

  const handleCardClick = (inquiry) => {
    // Show inquiry details in a simple alert for MVP
    // In production, open a modal or detail page
    alert(
      `Inquiry from: ${inquiry.customer?.name || 'Unknown'}\n` +
      `Email: ${inquiry.customer?.email || 'N/A'}\n\n` +
      `Message:\n${inquiry.message}\n\n` +
      `Sent: ${new Date(inquiry.created_at).toLocaleString()}`
    );
  };

  // Determine available status actions based on current status
  const getStatusActions = (currentStatus) => {
    const actions = {
      pending: [
        { label: 'Mark as Replied', status: 'replied', color: 'bg-green-600 hover:bg-green-700' },
        { label: 'Close', status: 'closed', color: 'bg-gray-600 hover:bg-gray-700' },
      ],
      replied: [
        { label: 'Close', status: 'closed', color: 'bg-gray-600 hover:bg-gray-700' },
      ],
      closed: [], // No actions for closed inquiries
    };
    return actions[currentStatus] || [];
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'replied', label: 'Replied' },
    { value: 'closed', label: 'Closed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer inquiries for your listings.
          </p>
        </div>

        {/* Stats Summary */}
        {!loading && !error && inquiries.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {inquiries.filter((i) => i.status === 'pending').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Pending</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {inquiries.filter((i) => i.status === 'replied').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Replied</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-gray-600">
                {inquiries.filter((i) => i.status === 'closed').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Closed</p>
            </div>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`
                flex-1 px-4 py-2 text-sm font-medium rounded-md transition
                ${statusFilter === filter.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">Loading inquiries...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchInquiries}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && inquiries.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No inquiries yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              {statusFilter === 'all'
                ? "You haven't received any inquiries yet."
                : `No ${statusFilter} inquiries found.`
              }
            </p>
          </div>
        )}

        {/* Inquiry List */}
        {!loading && !error && inquiries.length > 0 && (
          <div className="space-y-4">
            {inquiries.map((inquiry) => {
              const actions = getStatusActions(inquiry.status);

              return (
                <div key={inquiry.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Card content */}
                  <div onClick={() => handleCardClick(inquiry)} className="cursor-pointer">
                    <InquiryCard
                      inquiry={inquiry}
                      userRole="provider"
                      onClick={() => {}} // Handled by parent wrapper
                    />
                  </div>

                  {/* Action buttons */}
                  {actions.length > 0 && (
                    <div className="px-4 pb-4 flex space-x-2 border-t border-gray-100 pt-3">
                      {actions.map((action) => (
                        <button
                          key={action.status}
                          onClick={() => handleStatusUpdate(inquiry.id, action.status)}
                          disabled={updateLoading === inquiry.id}
                          className={`
                            px-3 py-1.5 text-xs font-medium text-white rounded-md
                            transition ${action.color}
                            disabled:opacity-50 disabled:cursor-not-allowed
                          `}
                        >
                          {updateLoading === inquiry.id ? 'Updating...' : action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}