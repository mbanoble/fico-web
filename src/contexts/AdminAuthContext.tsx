
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface Admin {
  id: string;
  username: string;
  isSuperAdmin: boolean;
  email?: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  adminUsers: Admin[];
  addAdmin: (admin: Admin, password: string) => void;
  removeAdmin: (adminId: string) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<Admin[]>([
    {
      id: '1',
      username: 'superadmin',
      isSuperAdmin: true
    },
    {
      id: '2',
      username: 'admin',
      isSuperAdmin: false,
      email: 'admin@example.com'
    }
  ]);
  const [adminPasswords, setAdminPasswords] = useState<Record<string, string>>({
    'superadmin': 'ficopoint',
    'admin': 'admin123'
  });

  // Load data from localStorage on initial mount
  useEffect(() => {
    try {
      // Check for existing session
      const storedAdmin = localStorage.getItem('ficoAdmin');
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
      
      // Load stored admins if available
      const storedAdmins = localStorage.getItem('ficoAdminUsers');
      if (storedAdmins) {
        setAdminUsers(JSON.parse(storedAdmins));
      }
      
      // Load stored passwords if available
      const storedPasswords = localStorage.getItem('ficoAdminPasswords');
      if (storedPasswords) {
        setAdminPasswords(JSON.parse(storedPasswords));
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", username);
    console.log("Available admin users:", adminUsers);
    console.log("Available passwords:", Object.keys(adminPasswords));
    
    // Check if username exists in adminPasswords
    if (adminPasswords[username] && adminPasswords[username] === password) {
      // Find the admin user with the matching username
      const matchedAdmin = adminUsers.find(a => a.username === username);
      
      console.log("Matched admin:", matchedAdmin);
      
      if (matchedAdmin) {
        setAdmin(matchedAdmin);
        localStorage.setItem('ficoAdmin', JSON.stringify(matchedAdmin));
        return true;
      }
    }
    
    return false;
  };

  const addAdmin = (newAdmin: Admin, password: string) => {
    // Ensure we don't already have this admin
    if (adminUsers.some(a => a.username === newAdmin.username)) {
      console.log("Admin username already exists:", newAdmin.username);
      return;
    }
    
    const updatedAdmins = [...adminUsers, newAdmin];
    setAdminUsers(updatedAdmins);
    
    // Store the admin's password
    const updatedPasswords = { ...adminPasswords, [newAdmin.username]: password };
    setAdminPasswords(updatedPasswords);
    
    // Save to localStorage
    localStorage.setItem('ficoAdminUsers', JSON.stringify(updatedAdmins));
    localStorage.setItem('ficoAdminPasswords', JSON.stringify(updatedPasswords));
    
    console.log("Admin added:", newAdmin.username);
    console.log("Updated admin list:", updatedAdmins);
    console.log("Updated passwords list:", Object.keys(updatedPasswords));
  };

  const removeAdmin = (adminId: string) => {
    const adminToRemove = adminUsers.find(a => a.id === adminId);
    if (!adminToRemove) return;
    
    const updatedAdmins = adminUsers.filter(a => a.id !== adminId);
    setAdminUsers(updatedAdmins);
    
    // Remove the password as well
    const { [adminToRemove.username]: _, ...updatedPasswords } = adminPasswords;
    setAdminPasswords(updatedPasswords);
    
    // Save to localStorage
    localStorage.setItem('ficoAdminUsers', JSON.stringify(updatedAdmins));
    localStorage.setItem('ficoAdminPasswords', JSON.stringify(updatedPasswords));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('ficoAdmin');
  };

  return (
    <AdminAuthContext.Provider value={{ 
      admin, 
      loading, 
      login, 
      logout,
      adminUsers,
      addAdmin,
      removeAdmin
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
