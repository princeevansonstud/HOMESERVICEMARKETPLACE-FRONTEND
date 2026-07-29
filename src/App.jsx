import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import BrowseListings from './pages/BrowseListings';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                
                <Navbar />

               
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/listings" element={<BrowseListings />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<ProviderDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}