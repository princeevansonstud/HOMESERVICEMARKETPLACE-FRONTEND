import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleInquiryClick = () => {
        navigate('/inquiry');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-blue-900 text-white py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Empowering Kenyan Artisans, Technicians, and Households
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                        HomeServiceMarketplace was built to bridge the gap between skilled local professionals and everyday Kenyans who need trusted, reliable services right at their doorstep. From Jua Kali metalwork in Kariobangi to expert car detailing in Runda and professional house cleaning in Ruiru, we connect you directly with verified experts in your neighborhood.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/listings"
                            className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-8 py-3 rounded-md transition duration-200"
                        >
                            Browse Services
                        </Link>
                        <button
                            onClick={handleInquiryClick}
                            className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-8 py-3 rounded-md transition duration-200"
                        >
                            Make an Inquiry
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 max-w-6xl mx-auto ">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Why We Built This Platform
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Empowering Local Talent
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Kenya has incredible informal sector talent, from master welders in Kariobangi to specialized technicians. We provide a digital marketplace to showcase their craftsmanship and grow their businesses.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Trust and Reliability
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Finding dependable domestic support or specialized trade services can be challenging. Our platform brings transparency, verified profiles, and direct communication to every booking.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Tailored for Kenyan Communities
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Designed specifically for local needs across regions like Nairobi and its environs, enhancing localized service categories that match real everyday requirements.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-16 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Have Questions or Need Assistance?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Reach out to our team or submit an inquiry form for partnership, custom service requests, or technical support.
                    </p>
                    <button
                        onClick={handleInquiryClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-200"
                    >
                        Open Inquiry Form
                    </button>
                </div>
            </section>
        </div>
    );
}