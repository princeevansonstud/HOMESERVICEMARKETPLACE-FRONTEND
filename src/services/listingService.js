// Mock listing service backed by localStorage.
// Once the backend Listings API exists, replace the body of each function
// with a real axios call via `api` from ./api.js — the function signatures
// and return shapes are designed to stay the same, so callers won't need
// to change.

const STORAGE_KEY = 'mock_listings';

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeAll(listings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

// Returns listings belonging to the given provider_id
export const getMyListings = async (providerId) => {
  const all = readAll();
  return all.filter((l) => l.provider_id === providerId);
};

// Returns every active listing, across all providers (for the customer-facing Browse page)
export const getAllListings = async () => {
  const all = readAll();
  return all.filter((l) => l.status === 'active');
};

// Returns a single listing by id, or null if it doesn't exist
export const getListingById = async (id) => {
  const all = readAll();
  return all.find((l) => String(l.id) === String(id)) || null;
};

export const createListing = async (data) => {
  const all = readAll();
  const newListing = {
    id: Date.now(),
    status: 'active',
    ...data,
  };
  all.push(newListing);
  writeAll(all);
  return newListing;
};

export const updateListing = async (id, data) => {
  const all = readAll();
  const updated = all.map((l) => (l.id === id ? { ...l, ...data } : l));
  writeAll(updated);
  return updated.find((l) => l.id === id);
};

export const deleteListing = async (id) => {
  const all = readAll();
  writeAll(all.filter((l) => l.id !== id));
  return { success: true };
};

export const toggleAvailability = async (id) => {
  const all = readAll();
  const updated = all.map((l) =>
    l.id === id
      ? { ...l, status: l.status === 'active' ? 'unavailable' : 'active' }
      : l
  );
  writeAll(updated);
  return updated.find((l) => l.id === id);
};