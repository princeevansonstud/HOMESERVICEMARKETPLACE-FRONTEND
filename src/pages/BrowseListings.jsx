import React, { useState } from 'react';

export default function BrowseListings() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPriceRange, setSelectedPriceRange] = useState('All');
    const [sortBy, setSortBy] = useState('recommended');

    const [savedListings, setSavedListings] = useState([2]); // Example initial saved item ID

    const categories = ['All', 'Plumbing', 'Cleaning', 'Electrical', 'Landscaping', 'HVAC', 'Carpentry'];

    const priceRanges = [
        { label: 'All', min: 0, max: Infinity },
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $150', min: 50, max: 150 },
        { label: '$150+', min: 150, max: Infinity },
    ];

    const listings = [
        {
            id: 1,
            title: 'Emergency Pipe Leak Repair & Diagnostics',
            provider: 'Bob Smith',
            category: 'Plumbing',
            price: 120,
            rating: 4.9,
            reviews: 48,
            location: 'Downtown (Within 10 miles)',
            image: '🔧',
            featured: true,
            description: 'Fast, reliable emergency plumbing repairs for leaks, burst pipes, and clogged drains. Licensed and insured.'
        },
        {
            id: 2,
            title: 'Full House Deep Cleaning & Sanitization',
            provider: 'Sparkle Cleaners Co.',
            category: 'Cleaning',
            price: 180,
            rating: 4.8,
            reviews: 92,
            location: 'Metropolitan Area',
            image: '✨',
            featured: false,
            description: 'Comprehensive top-to-bottom cleaning service including kitchen appliances, windows, and deep dusting.'
        },
        {
            id: 3,
            title: 'Electrical Panel Upgrade & Wiring Check',
            provider: 'Diana Prince',
            category: 'Electrical',
            price: 250,
            rating: 5.0,
            reviews: 31,
            location: 'North Suburbs',
            image: '⚡',
            featured: true,
            description: 'Professional electrical upgrades, breaker replacements, and safety inspections by a master electrician.'
        },
        {
            id: 4,
            title: 'Weekly Lawn Mowing & Yard Landscaping',
            provider: 'Green Thumb Co.',
            category: 'Landscaping',
            price: 65,
            rating: 4.7,
            reviews: 64,
            location: 'West County',
            image: '🌱',
            featured: false,
            description: 'Keep your lawn pristine with regular mowing, edging, weed control, and seasonal cleanups.'
        },
        {
            id: 5,
            title: 'HVAC Tune-up & AC Filter Replacement',
            provider: 'AirFlow Experts',
            category: 'HVAC',
            price: 95,
            rating: 4.9,
            reviews: 55,
            location: 'City-wide',
            image: '❄️',
            featured: false,
            description: 'Ensure optimal cooling efficiency and clean indoor air quality ahead of the summer heatwaves.'
        },
        {
            id: 6,
            title: 'Custom Bookshelf & Carpentry Repairs',
            provider: 'WoodCrafters Studio',
            category: 'Carpentry',
            price: 210,
            rating: 4.6,
            reviews: 19,
            location: 'South District',
            image: '🪚',
            featured: false,
            description: 'Bespoke woodwork, cabinet repairs, custom shelving units, and general household carpentry.'
        }
    ];

    const toggleSave = (id, e) => {
        e.stopPropagation();
        setSavedListings(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Filtering logic
    const filteredListings = listings.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

        const rangeObj = priceRanges.find(r => r.label === selectedPriceRange) || priceRanges[0];
        const matchesPrice = item.price >= rangeObj.min && item.price <= rangeObj.max;

        return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'recommended' default order
    });

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Service Marketplace</span>
                    <h1 className="text-3xl font-extrabold tracking-tight">Browse Trusted Local Services</h1>
                    <p className="text-blue-100 text-sm max-w-xl">Find verified professionals, review transparent hourly or flat rates, and book instantly for your home or project needs.</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/25 text-center">
                    <p className="text-2xl font-black">{listings.length}+</p>
                    <p className="text-xs text-blue-100 font-medium">Active Professionals</p>
                </div>
            </div>

            {/* Filter and Search Bar Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="w-full md:w-96 relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search services, providers, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Price:</span>
                            <select
                                value={selectedPriceRange}
                                onChange={(e) => setSelectedPriceRange(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {priceRanges.map((r, idx) => (
                                    <option key={idx} value={r.label}>{r.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="recommended">Recommended</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid of Listings */}
            {filteredListings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
                    <div className="text-4xl">📂</div>
                    <h3 className="text-lg font-bold text-gray-900">No services found</h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">We couldn't find any listings matching your search criteria. Try adjusting your filters or search keywords.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedPriceRange('All'); }}
                        className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs hover:bg-blue-100"
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map(item => {
                        const isSaved = savedListings.includes(item.id);
                        return (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
                                <div>
                                    {/* Card Top / Banner */}
                                    <div className="bg-gray-100 h-36 flex items-center justify-center text-5xl relative group-hover:bg-blue-50/50 transition-colors">
                                        {item.featured && (
                                            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-sm">Featured</span>
                                        )}
                                        <button
                                            onClick={(e) => toggleSave(item.id, e)}
                                            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all shadow-sm ${isSaved ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
                                        >
                                            {isSaved ? '❤️' : '🤍'}
                                        </button>
                                        <span>{item.image}</span>
                                    </div>

                                    {/* Content Details */}
                                    <div className="p-6 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-lg">{item.category}</span>
                                            <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                                                <span>⭐ {item.rating}</span>
                                                <span className="text-gray-400 font-normal">({item.reviews})</span>
                                            </div>
                                        </div>

                                        <h3 className="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>

                                        <div className="pt-2 flex items-center gap-1 text-xs text-gray-400 font-medium">
                                            <span>📍 {item.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer / Price & Action */}
                                <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-50 mt-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Starting at</p>
                                        <p className="text-xl font-black text-gray-900">${item.price}</p>
                                    </div>
                                    <button className="px-4 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-all">
                                        Book Service
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}