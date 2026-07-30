import React, { useState } from 'react';

export default function ListingDetails({ listingId = 1 }) {
    // Mock data - in a real app, you would fetch this by ID
    const listing = {
        id: 1,
        title: 'Emergency Pipe Leak Repair & Diagnostics',
        provider: 'Bob Smith',
        category: 'Plumbing',
        price: 120,
        rating: 4.9,
        reviews: 48,
        location: 'Downtown (Within 10 miles)',
        description: 'Fast, reliable emergency plumbing repairs for leaks, burst pipes, and clogged drains. Licensed and insured with over 10 years of experience in residential and commercial plumbing systems.',
        highlights: ['24/7 Emergency Service', 'Licensed & Insured', 'Same-Day Availability', 'Warranty on Parts'],
        gallery: ['🔧', '🚰', '🛠️'],
        reviewsList: [
            { user: 'Sarah M.', date: '2 days ago', rating: 5, comment: 'Incredible speed! Fixed my burst pipe within an hour of calling.' },
            { user: 'James K.', date: '1 week ago', rating: 4, comment: 'Professional and clean. Would definitely hire again for future repairs.' }
        ]
    };

    const [bookingDate, setBookingDate] = useState('');

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
            {/* Breadcrumb & Navigation */}
            <button className="text-sm text-gray-500 hover:text-blue-600 font-medium">← Back to search</button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex justify-between items-start">
                            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{listing.category}</span>
                            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                                <span>⭐ {listing.rating}</span>
                                <span className="font-normal opacity-70">({listing.reviews} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900">{listing.title}</h1>
                        <p className="text-gray-600 leading-relaxed">{listing.description}</p>

                        <div className="flex gap-2 pt-2">
                            {listing.highlights.map((h, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">{h}</span>
                            ))}
                        </div>
                    </div>

                    {/* Provider Info */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">BS</div>
                            <div>
                                <p className="font-bold text-gray-900">{listing.provider}</p>
                                <p className="text-xs text-gray-500">Verified Professional • Member since 2024</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100">Message</button>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                        {listing.reviewsList.map((rev, i) => (
                            <div key={i} className="border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-sm text-gray-900">{rev.user}</p>
                                    <p className="text-xs text-gray-400">{rev.date}</p>
                                </div>
                                <div className="text-yellow-400 text-xs mb-1">{'★'.repeat(rev.rating)}</div>
                                <p className="text-sm text-gray-600">{rev.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Booking Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-8 space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Starting at</p>
                            <p className="text-4xl font-black text-gray-900">${listing.price}<span className="text-sm font-medium text-gray-400">/service</span></p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-700">Select Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>

                        <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
                            Book Now
                        </button>

                        <p className="text-center text-[10px] text-gray-400">Free cancellation up to 24 hours before</p>
                    </div>
                </div>
            </div>
        </div>
    );
}