import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import EditForm from '../components/provider/EditForm';
import {
  getMyListings,
  updateListing,
  deleteListing,
  toggleAvailability,
} from '../services/listingService';
import { getMyInquiries } from '../services/inquiryService';

export default function ProviderDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [viewingListing, setViewingListing] = useState(null);
  const [pendingInquiries, setPendingInquiries] = useState(0);

  useEffect(() => {
    if (user?.id) {
      getMyListings(user.id).then(setListings);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'provider') {
      getMyInquiries('pending')
        .then((response) => setPendingInquiries(response.success ? response.data?.length || 0 : 0))
        .catch(() => setPendingInquiries(0));
    }
  }, [user]);

  const refresh = async () => {
    if (user?.id) {
      const updated = await getMyListings(user.id);
      setListings(updated);
    }
  };

  const handleSave = async (updatedListing) => {
    await updateListing(updatedListing.id, updatedListing);
    setEditingListing(null);
    refresh();
  };

  const handleDelete = async (id) => {
    await deleteListing(id);
    refresh();
  };

  const handleToggleAvailability = async (id) => {
    await toggleAvailability(id);
    refresh();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome{user?.name ? `, ${user.name}` : ''}
          </h1>
          <p className="text-gray-600">Manage your service listings and bookings here.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/new-listing')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          + Create Listing
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Listings</p>
          <p className="text-2xl font-bold text-gray-800">{listings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Pending Inquiries</p>
          <p className="text-2xl font-bold text-gray-800">{pendingInquiries}</p>
        </div>
      </div>

      {/* Listings */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-gray-500">
          You haven't created any listings yet. Click "+ Create Listing" to add one.
        </p>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">{listing.title}</h3>
                <p className="text-sm text-gray-500">
                  {listing.category} · {listing.price_range}
                </p>
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                    listing.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {listing.status}
                </span>
              </div>
              <div className="space-x-2 text-sm">
                <button
                  onClick={() => setViewingListing(listing)}
                  className="text-gray-600 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => setEditingListing(listing)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleAvailability(listing.id)}
                  className="text-yellow-600 hover:underline"
                >
                  {listing.status === 'active' ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingListing && (
        <EditForm
          listing={editingListing}
          onSave={handleSave}
          onCancel={() => setEditingListing(null)}
        />
      )}

      {viewingListing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{viewingListing.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {viewingListing.category} · {viewingListing.price_range}
            </p>
            <p className="text-sm text-gray-700 mb-2">{viewingListing.description}</p>
            <p className="text-sm text-gray-500">Location: {viewingListing.location}</p>
            <p className="text-sm text-gray-500">Availability: {viewingListing.availability}</p>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setViewingListing(null)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
