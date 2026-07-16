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

    if (user?.is_staff || user?.role === 'SUPER_ADMIN') {
        return <AdminDashboard />;
    }

    return <ParishionerDashboard />;
}
