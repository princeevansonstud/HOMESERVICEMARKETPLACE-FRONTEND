import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createListing } from '../services/listingService';

const CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Repairs',
  'Painting',
  'Gardening',
  'Other',
];

export default function CreateListing() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    price_range: '',
    location: '',
    availability: '',
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.category || !formData.price_range) {
      setError('Title, category, and price range are required.');
      return;
    }

    setSubmitting(true);
    try {
      await createListing({
        ...formData,
        provider_id: user?.id,
        photo_name: photo ? photo.name : null, // real upload wiring comes later
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Service Listing</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Kitchen Plumbing Repair"
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded-md p-2"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Repair leaking pipes, sink installations, water heater maintenance."
            className="mt-1 w-full border rounded-md p-2"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="text"
            name="price_range"
            value={formData.price_range}
            onChange={handleChange}
            placeholder="Ksh 2,000 - 8,000"
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Nairobi"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Photos</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 w-full text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            Upload wiring to real storage will be added once the backend supports it.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Monday - Saturday"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}