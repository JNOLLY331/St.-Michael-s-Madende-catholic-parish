import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ParishionerDashboard from './ParishionerDashboard';

export default function Dashboard() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render respective dashboard based on user role
    return user?.is_staff ? <AdminDashboard /> : <ParishionerDashboard />;
}

