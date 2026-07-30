import React, { useState } from 'react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [userSearch, setUserSearch] = useState('');
    const [listingSearch, setListingSearch] = useState('');

    const [categories, setCategories] = useState(['Plumbing', 'Cleaning', 'Electrical', 'Landscaping', 'HVAC']);
    const [newCategory, setNewCategory] = useState('');

    const stats = [
        { title: 'Total Users', value: '1,248', change: '+12% this month', icon: '👥', color: 'bg-blue-50 text-blue-600' },
        { title: 'Service Providers', value: '312', change: '+5% this month', icon: '🛠️', color: 'bg-indigo-50 text-indigo-600' },
        { title: 'Active Listings', value: '584', change: '+18 new today', icon: '📋', color: 'bg-emerald-50 text-emerald-600' },
        { title: 'Total Revenue', value: '$45,230', change: '+8% vs last month', icon: '💰', color: 'bg-amber-50 text-amber-600' },
    ];

    const [users, setUsers] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', status: 'Active', joined: '2026-01-15' },
        { id: 2, name: 'Bob Smith', email: 'bob@plumbing.com', role: 'Provider', status: 'Active', joined: '2026-02-10' },
        { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Customer', status: 'Suspended', joined: '2026-03-01' },
        { id: 4, name: 'Diana Prince', email: 'diana@electric.com', role: 'Provider', status: 'Pending', joined: '2026-04-12' },
    ]);

    const [listings, setListings] = useState([
        { id: 1, title: 'Emergency Pipe Leak Repair', provider: 'Bob Smith', category: 'Plumbing', status: 'Pending', date: '2026-07-28' },
        { id: 2, title: 'Full House Deep Cleaning', provider: 'Sparkle Cleaners', category: 'Cleaning', status: 'Approved', date: '2026-07-27' },
        { id: 3, title: 'Electrical Panel Upgrade', provider: 'Diana Prince', category: 'Electrical', status: 'Pending', date: '2026-07-29' },
        { id: 4, title: 'Lawn Mowing & Landscaping', provider: 'Green Thumb Co.', category: 'Landscaping', status: 'Approved', date: '2026-07-25' },
    ]);

    const toggleUserStatus = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    };

    const updateListingStatus = (id, status) => {
        setListings(listings.map(l => l.id === id ? { ...l, status } : l));
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory('');
        }
    };

    const deleteCategory = (catToRemove) => {
        setCategories(categories.filter(c => c !== catToRemove));
    };

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));
    const filteredListings = listings.filter(l => l.title.toLowerCase().includes(listingSearch.toLowerCase()) || l.provider.toLowerCase().includes(listingSearch.toLowerCase()));

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage platform activity, review provider listings, and maintain categories.</p>
                </div>
                <div className="flex flex-wrap items-center gap-1 bg-gray-100 p-1 rounded-xl text-sm font-semibold">
                    <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Overview</button>
                    <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'users' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Users</button>
                    <button onClick={() => setActiveTab('listings')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'listings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Listings</button>
                    <button onClick={() => setActiveTab('categories')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'categories' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Categories</button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.title}</p>
                                    <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                                    <p className="text-xs text-emerald-600 mt-1 font-semibold">↑ {stat.change}</p>
                                </div>
                                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-2xl shadow-inner`}>{stat.icon}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900">Pending Listings Review</h3>
                                <button onClick={() => setActiveTab('listings')} className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
                            </div>
                            <div className="space-y-3">
                                {listings.filter(l => l.status === 'Pending').map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.provider} • <span className="text-blue-600 font-medium">{item.category}</span></p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button onClick={() => updateListingStatus(item.id, 'Approved')} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-700">Approve</button>
                                            <button onClick={() => updateListingStatus(item.id, 'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100">Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900">Active Categories</h3>
                                <button onClick={() => setActiveTab('categories')} className="text-xs font-semibold text-blue-600 hover:underline">Manage</button>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {categories.map((cat, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-semibold rounded-xl text-xs">{cat}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                        <input type="text" placeholder="Search user name or email..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="w-full sm:w-72 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-3 px-6">Name</th>
                                    <th className="py-3 px-6">Email</th>
                                    <th className="py-3 px-6">Role</th>
                                    <th className="py-3 px-6">Joined</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50/50">
                                        <td className="py-4 px-6 font-bold text-gray-900">{user.name}</td>
                                        <td className="py-4 px-6 text-gray-500">{user.email}</td>
                                        <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'Provider' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'}`}>{user.role}</span></td>
                                        <td className="py-4 px-6 text-gray-400 text-xs">{user.joined}</td>
                                        <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{user.status}</span></td>
                                        <td className="py-4 px-6 text-right">
                                            <button onClick={() => toggleUserStatus(user.id)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${user.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                                {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'listings' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Service Listings Moderation</h2>
                        <input type="text" placeholder="Search title or provider..." value={listingSearch} onChange={(e) => setListingSearch(e.target.value)} className="w-full sm:w-72 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-3 px-6">Service Title</th>
                                    <th className="py-3 px-6">Provider</th>
                                    <th className="py-3 px-6">Category</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredListings.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50/50">
                                        <td className="py-4 px-6 font-bold text-gray-900">{item.title}</td>
                                        <td className="py-4 px-6 text-gray-500">{item.provider}</td>
                                        <td className="py-4 px-6"><span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-semibold">{item.category}</span></td>
                                        <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{item.status}</span></td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            {item.status !== 'Approved' && <button onClick={() => updateListingStatus(item.id, 'Approved')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-emerald-700">Approve</button>}
                                            <button onClick={() => updateListingStatus(item.id, 'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100">Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'categories' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">Manage Service Categories</h2>
                    <form onSubmit={handleAddCategory} className="flex gap-3 max-w-md">
                        <input type="text" placeholder="New Category Name..." value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 shadow-sm">Add Category</button>
                    </form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="font-bold text-gray-800 text-sm">{cat}</span>
                                <button onClick={() => deleteCategory(cat)} className="text-xs text-red-600 font-semibold hover:bg-red-50 px-2.5 py-1 rounded-lg">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}