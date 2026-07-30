import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InquiryForm from '../../components/InquiryForm';


const MOCK_LISTING = {
  id: 1,
  title: 'Professional Plumbing Services',
  provider_name: 'John\'s Plumbing Co.',
  description: 'Expert plumbing repairs, installations, and maintenance. Available 24/7 for emergencies.',
};

export default function ContactProvider() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch listing details (mock for now)
  useEffect(() => {

    
    const timer = setTimeout(() => {
      setListing({ ...MOCK_LISTING, id: Number(listingId) });
      setLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [listingId]);

  const handleSuccess = (inquiryData) => {
    // After successful inquiry, redirect to "My Inquiries" after 2 seconds
    setTimeout(() => {
      navigate('/my-inquiries');
    }, 2000);
  };

  const handleCancel = () => {
    // Go back to the listing page or previous page
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to listing
        </button>

        {/* Listing info card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900">{listing.title}</h1>
          <p className="text-sm text-gray-500 mt-1">by {listing.provider_name}</p>
          <p className="text-sm text-gray-600 mt-3">{listing.description}</p>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <InquiryForm
            listingId={Number(listingId)}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}