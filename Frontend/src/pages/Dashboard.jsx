import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ParishionerDashboard from './ParishionerDashboard';

// Roles that should see the AdminDashboard even if is_staff is not set
const ADMIN_ROLES = new Set(['SUPER_ADMIN', 'PARISH_PRIEST', 'ASSISTANT_PRIEST', 'SECRETARY', 'FINANCE']);

export default function Dashboard() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Superusers, staff users, and privileged roles all get the Admin Dashboard
    const isAdmin = user?.is_superuser || user?.is_staff || ADMIN_ROLES.has(user?.role);

    return isAdmin ? <AdminDashboard /> : <ParishionerDashboard />;
}
