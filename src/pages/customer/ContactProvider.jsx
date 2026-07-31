import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InquiryForm from '../../components/InquiryForm';
import { AuthContext } from '../../context/AuthContext';
import { getListingById } from '../../services/listingService';

export default function ContactProvider() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListingById(listingId)
      .then(setListing)
      .finally(() => setLoading(false));
  }, [listingId]);

  const handleSuccess = () => {
    window.setTimeout(() => navigate('/my-inquiries'), 1500);
  };

  if (loading || authLoading) {
    return <p className="text-gray-500 text-center py-12">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign in to contact this provider</h1>
        <p className="mt-2 text-gray-600">You need a customer account before sending an inquiry.</p>
        <button onClick={() => navigate('/login')} className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Go to login
        </button>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
        <button onClick={() => navigate('/listings')} className="mt-5 text-blue-600 hover:underline">Browse listings</button>
      </div>
    );
  }

  if (user.role !== 'customer') {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Customer account required</h1>
        <p className="mt-2 text-gray-600">Only customer accounts can send service inquiries.</p>
        <button onClick={() => navigate(`/listings/${listingId}`)} className="mt-5 text-blue-600 hover:underline">Back to listing</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to listing
        </button>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900">{listing.title}</h1>
          <p className="text-sm text-gray-600 mt-3">{listing.description || 'No description provided.'}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <InquiryForm listingId={Number(listingId)} onSuccess={handleSuccess} onCancel={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}
