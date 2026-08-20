import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Check if Supabase session exists or stored session
        const storedUser = localStorage.getItem('svvjc_staff_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            }
            catch (e) {
                localStorage.removeItem('svvjc_staff_user');
            }
        }
    }, []);
    const loginDemo = (role, email = 'admin@svvjc.edu.in') => {
        const roleNames = {
            super_admin: 'Principal / Super Admin',
            office_admin: 'Office Administrator',
            exam_cell: 'Exam Cell Coordinator',
            stream_coordinator: 'MPC/BiPC Stream Coordinator',
            guest: 'Guest Visitor'
        };
        const newUser = {
            id: 'demo-staff-123',
            email,
            role,
            name: roleNames[role] || 'Staff Member',
        };
        setUser(newUser);
        localStorage.setItem('svvjc_staff_user', JSON.stringify(newUser));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('svvjc_staff_user');
        if (isSupabaseConfigured()) {
            supabase.auth.signOut().catch(() => { });
        }
    };
    return (<AuthContext.Provider value={{ user, isAuthenticated: !!user, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
