/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Hero from "@/components/home/Hero";
import FeaturedSpots from "@/components/home/FeaturedSpots";
import VideoSpotlight from "@/components/home/VideoSpotlight";
import TouristSpots from "@/pages/TouristSpots";
import SpotDetail from "@/pages/SpotDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminDashboard from "@/pages/AdminDashboard";
import UserBookings from "@/pages/UserBookings";
import Support from "@/pages/Support";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return <>{children}</>;
};

const Home = () => (
  <div className="flex flex-col">
    <Hero />
    <FeaturedSpots />
    <VideoSpotlight />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spots" element={<TouristSpots />} />
              <Route path="/spots/:id" element={<SpotDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <UserBookings />
                </ProtectedRoute>
              } />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}







