import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BrowseListings() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const sampleListings = [
        { id: 1, title: 'Professional House Cleaning', category: 'Cleaning', location: 'Ruiru', price: '2,500' },
        { id: 2, title: 'Expert Car Detailing & Polish', category: 'Automotive', location: 'Runda', price: '5,000' },
        { id: 3, title: 'Jua Kali Metal Fabrication & Welding', category: 'Jua Kali', location: 'Kariobangi', price: '3,500' },
    ];

    const filteredListings = sampleListings.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase());
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
                    <option value="All">All Categories</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Jua Kali">Jua Kali</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredListings.length > 0 ? (
                    filteredListings.map(listing => (
                        <div key={listing.id} className="bg-white border rounded-lg p-6 shadow-sm flex flex-col justify-between">
                            <div>
                                <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded">{listing.category}</span>
                                <h3 className="text-xl font-bold text-gray-800 mt-2">{listing.title}</h3>
                                <p className="text-gray-600 mt-1">Location: {listing.location}</p>
                                <p className="text-lg font-semibold text-gray-900 mt-4">KES {listing.price}</p>
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
        </div>
    );
}