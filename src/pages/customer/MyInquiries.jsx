import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInquiries, deleteInquiry } from '../../services/inquiryService';
import InquiryCard from '../../components/InquiryCard';
import InquiryStatusBadge from '../../components/InquiryStatusBadge';

export default function MyInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState(null);

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
        'Unable to load your inquiries. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    setDeleteLoading(inquiryId);

    try {
      const response = await deleteInquiry(inquiryId);
      if (response.success) {
        // Remove from local state without refetching
        setInquiries((prev) => prev.filter((i) => i.id !== inquiryId));
      } else {
        alert(response.message || 'Failed to delete inquiry.');
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCardClick = (inquiry) => {
    // For MVP, we show details in an alert or simple view
    // In production, navigate to a detail page or open a modal
    alert(
      `Inquiry Details:\n\n` +
      `Status: ${inquiry.status}\n` +
      `Message: ${inquiry.message}\n` +
      `Sent: ${new Date(inquiry.created_at).toLocaleString()}`
    );
  };

  // Filter buttons configuration
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
          <h1 className="text-2xl font-bold text-gray-900">My Inquiries</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your service inquiries.
          </p>
        </div>

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No inquiries yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              {statusFilter === 'all'
                ? "You haven't sent any inquiries yet."
                : `No ${statusFilter} inquiries found.`
              }
            </p>
            <button
              onClick={() => navigate('/listings')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Listings
            </button>
          </div>
        )}

        {/* Inquiry List */}
        {!loading && !error && inquiries.length > 0 && (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="relative group">
                <InquiryCard
                  inquiry={inquiry}
                  userRole="customer"
                  onClick={() => handleCardClick(inquiry)}
                />
                {/* Delete button - appears on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(inquiry.id);
                  }}
                  disabled={deleteLoading === inquiry.id}
                  className="
                    absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500
                    opacity-0 group-hover:opacity-100 transition
                    disabled:opacity-50
                  "
                  title="Delete inquiry"
                >
                  {deleteLoading === inquiry.id ? (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}