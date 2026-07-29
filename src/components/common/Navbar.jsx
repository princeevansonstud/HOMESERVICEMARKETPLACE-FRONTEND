import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Mock authentication check - update to connect with your AuthContext later
    const isAuthenticated = false;

    const handleLogout = () => {
        // TODO: Add your logout logic here
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo / Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            HomeServiceMarketplace
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                            Home
                        </Link>
                        <Link to="/listings" className="text-gray-700 hover:text-blue-600 font-medium">
                            Browse Listings
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Dashboard
                                </Link>
                                <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                            aria-label="Toggle Menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-2">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Home
                    </Link>
                    <Link
                        to="/listings"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Browse Listings
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="pt-2 flex flex-col space-y-2">
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}