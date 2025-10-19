import { useState } from 'react';
import Cookies from 'js-cookie';
import { Admin } from '../types/admin';

export const useAdmin = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchCurrentAdmin = async () => {
    try {
      const userData = Cookies.get('adminUser');
      if (userData) {
        const adminData = JSON.parse(userData);
        setCurrentAdmin(adminData);
      }
    } catch (error) {
      console.error('Error fetching current admin:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const token = Cookies.get('adminToken');
      const response = await fetch('http://localhost:4000/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        throw new Error('خطا در دریافت لیست مدیران');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'خطا در دریافت لیست مدیران' });
    } finally {
      setLoading(false);
    }
  };

  return {
    admins,
    currentAdmin,
    loading,
    message,
    isModalOpen,
    isEditModalOpen,
    setAdmins,
    setCurrentAdmin,
    setLoading,
    setMessage,
    setIsModalOpen,
    setIsEditModalOpen,
    fetchCurrentAdmin,
    fetchAdmins
  };
};