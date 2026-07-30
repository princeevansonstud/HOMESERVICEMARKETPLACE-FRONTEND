import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookingStatus, setBookingStatus] = useState(false);

    const listingsData = {
        "1": { title: 'Professional House Cleaning', category: 'Cleaning', location: 'Ruiru', price: '2,500', description: 'Comprehensive deep cleaning services for your home in Ruiru and surrounding areas.' },
        "2": { title: 'Expert Car Detailing & Polish', category: 'Automotive', location: 'Runda', price: '5,000', description: 'Full interior vacuuming, exterior ceramic polish, and washing services right at your location in Runda.' },
        "3": { title: 'Jua Kali Metal Fabrication & Welding', category: 'Jua Kali', location: 'Kariobangi', price: '3,500', description: 'Custom metal gates, window grills, and heavy-duty structural repairs built by master artisans in Kariobangi.' }
    };

    const listing = listingsData[id] || {
        title: 'Service Not Found',
        category: 'N/A',
        location: 'N/A',
        price: '0',
        description: 'The requested service listing does not exist.'
    };

    const handleBookService = () => {
        setBookingStatus(true);
    };

    const handleInquiryClick = () => {
        navigate('/inquiry');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline">
                &larr; Back to Listings
            </button>

            <div className="bg-white border rounded-lg p-8 shadow-sm">
                <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded">{listing.category}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-3">{listing.title}</h1>
                <p className="text-lg text-gray-600 mt-2">Location: {listing.location}</p>
                <p className="text-2xl font-bold text-gray-900 mt-4">KES {listing.price}</p>

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
                            onClick={handleBookService}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium text-lg"
                        >
                            Book This Service
                        </button>
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