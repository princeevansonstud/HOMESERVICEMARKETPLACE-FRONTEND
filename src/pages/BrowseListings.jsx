import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllListings } from '../services/listingService';

export default function BrowseListings() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllListings()
            .then(setListings)
            .finally(() => setLoading(false));
    }, []);

    // Categories are derived from whatever listings actually exist,
    // so this stays correct no matter what categories providers use.
    const categories = ['All', ...new Set(listings.map((l) => l.category).filter(Boolean))];

    const filteredListings = listings.filter((item) => {
        const title = item.title || '';
        const location = item.location || '';
        const matchesSearch =
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Services</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by service or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border rounded-md p-3"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-md p-3 bg-white"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-gray-500 text-center py-12">Loading listings...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                            <div key={listing.id} className="bg-white border rounded-lg p-6 shadow-sm flex flex-col justify-between">
                                <div>
                                    <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded">{listing.category}</span>
                                    <h3 className="text-xl font-bold text-gray-800 mt-2">{listing.title}</h3>
                                    <p className="text-gray-600 mt-1">Location: {listing.location}</p>
                                    <p className="text-lg font-semibold text-gray-900 mt-4">{listing.price_range}</p>
                                </div>
                                <Link
                                    to={`/listings/${listing.id}`}
                                    className="mt-6 block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center py-12">No listings found matching your criteria.</p>
                    )}
                </div>
            )}
        </div>
    );
}