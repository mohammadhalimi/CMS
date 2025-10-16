'use client';

import { useState, useEffect } from 'react';
import { Admin } from './types/admin';
import { useAdmin } from './useAdmin';
import { AdminProfile } from './AdminProfile';
import { AdminList } from './AdminList';
import { AddAdminModal } from './AddAdminModal';
import { EditProfileModal } from './EditProfileModal';
import { MessageAlert } from './MessageAlert';
import { LoadingSkeleton } from './LoadingSkelton';

export default function AdminSection() {
  const {
    admins,
    currentAdmin,
    loading,
    message,
    isModalOpen,
    isEditModalOpen,
    setMessage,
    setIsModalOpen,
    setIsEditModalOpen,
    fetchAdmins,
    fetchCurrentAdmin
  } = useAdmin();

  useEffect(() => {
    fetchCurrentAdmin();
    fetchAdmins();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <MessageAlert message={message} />

      {currentAdmin && (
        <AdminProfile
          currentAdmin={currentAdmin}
          onEditProfile={() => setIsEditModalOpen(true)}
          onAdminsUpdate={fetchAdmins}
        />
      )}

      <AdminList 
        admins={admins} 
        currentAdmin={currentAdmin}
        onAddAdmin={() => setIsModalOpen(true)}
      />

      {isEditModalOpen && currentAdmin && (
        <EditProfileModal
          currentAdmin={currentAdmin}
          onClose={() => setIsEditModalOpen(false)}
          onProfileUpdate={fetchAdmins}
          onCurrentAdminUpdate={fetchCurrentAdmin}
          onMessage={setMessage}
        />
      )}

      {isModalOpen && (
        <AddAdminModal
          onClose={() => setIsModalOpen(false)}
          onAdminAdded={fetchAdmins}
          onMessage={setMessage}
        />
      )}
    </div>
  );
}