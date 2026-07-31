import api from './api';

// Listings must be stored by the API: inquiry foreign keys can only reference
// persisted database records, not browser-local Date.now() identifiers.
export const getMyListings = async () => {
  const response = await api.get('/listings/mine');
  return response.data;
};

export const getAllListings = async () => {
  const response = await api.get('/listings');
  return response.data;
};

export const getListingById = async (id) => {
  try {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const createListing = async (data) => {
  const response = await api.post('/listings', data);
  return response.data;
};

export const updateListing = async (id, data) => {
  const response = await api.patch(`/listings/${id}`, data);
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
};

// Availability is not persisted in the current Listing model. Preserve the
// UI action as a no-op until that model field is introduced.
export const toggleAvailability = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};
