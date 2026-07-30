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
            .finally(() => setLoading(false));
    }, [id]);

    const handleBookService = () => {
        // TODO: once inquiryService is wired in here, this should call
        // createInquiry({ listing_id: listing.id, message: '...' }) instead.
        setBookingStatus(true);
    };

    if (loading) {
        return <p className="p-8 text-center text-gray-500">Loading...</p>;
    }

    if (!listing) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline">
                    &larr; Back to Listings
                </button>
                <p className="text-gray-600">This service listing does not exist.</p>
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
                <p className="text-2xl font-bold text-gray-900 mt-4">{listing.price_range}</p>
                {listing.availability && (
                    <p className="text-sm text-gray-500 mt-1">Availability: {listing.availability}</p>
                )}
                <hr className="my-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                {bookingStatus ? (
                    <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-md">
                        Service booked successfully! The provider will contact you shortly.
                    </div>
                ) : (
                    <button
                        onClick={handleBookService}
                        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium text-lg"
                    >
                        Book This Service
                    </button>
                )}
            </div>
        </div>
    );
}