import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById } from '../services/listingService';

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState(false);

    useEffect(() => {
        getListingById(id)
            .then(setListing)
            .catch(() => setListing(null))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBookService = () => {
        setBookingStatus(true);
    };

    const handleInquiryClick = () => {
        navigate('/inquiry');
    };

    if (loading) {
        return <p className="text-gray-500 text-center py-12">Loading details...</p>;
    }

    if (!listing) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline">
                    &larr; Back to Listings
                </button>
                <div className="bg-white border rounded-lg p-8 shadow-sm text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
                    <p className="text-gray-600 mt-2">The requested service listing does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline">
                &larr; Back to Listings
            </button>

            <div className="bg-white border rounded-lg p-8 shadow-sm">
                <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded">{listing.category}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-3">{listing.title}</h1>
                <p className="text-lg text-gray-600 mt-2">Location: {listing.location}</p>
                <p className="text-2xl font-bold text-gray-900 mt-4">KES {listing.price_range || listing.price}</p>

                <hr className="my-6" />

                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>

                {bookingStatus ? (
                    <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-md">
                        Service booked successfully! The provider will contact you shortly.
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4 mt-8">

                        <button
                            onClick={handleInquiryClick}
                            className="flex-1 bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 font-medium text-lg"
                        >
                            Inquire With Provider
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}