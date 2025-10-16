import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import Cookies from 'js-cookie';
import { Admin } from './types/admin';

interface ProfileImageUploaderProps {
  currentAdmin: Admin;
  onAdminsUpdate: () => void;
}

export function ProfileImageUploader({ currentAdmin, onAdminsUpdate }: ProfileImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // Handle error - file too large
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleProfileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('profileImage', selectedFile);
    const token = Cookies.get('adminToken');

    try {
      const response = await fetch('http://localhost:4000/admin/upload-profile', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const updatedAdmin = { ...currentAdmin, profileImage: data.profileImage };
        Cookies.set('adminUser', JSON.stringify(updatedAdmin));
        onAdminsUpdate();
        cancelUpload();
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <Image
          src={preview || currentAdmin.profileImage || '/image.png'}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-2xl border-2 border-purple-500/50 object-cover shadow-lg transition-all duration-300 group-hover:scale-105"
        />
        <label className="absolute bottom-2 left-2 bg-purple-600 p-1.5 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-700 hover:scale-110 shadow-lg">
          <Camera size={14} />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {selectedFile && (
        <UploadActions
          onUpload={handleProfileUpload}
          onCancel={cancelUpload}
          isUploading={isUploading}
        />
      )}
    </div>
  );
}

interface UploadActionsProps {
  onUpload: () => void;
  onCancel: () => void;
  isUploading: boolean;
}

function UploadActions({ onUpload, onCancel, isUploading }: UploadActionsProps) {
  return (
    <div className="flex space-x-2 space-x-reverse animate-fade-in">
      <button
        onClick={onUpload}
        disabled={isUploading}
        className="flex items-center space-x-1 space-x-reverse bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-3 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-xs"
      >
        {isUploading && (
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        <span>{isUploading ? 'در حال آپلود...' : 'ذخیره'}</span>
      </button>

      <button
        onClick={onCancel}
        className="px-3 py-1.5 border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-300 text-xs"
      >
        انصراف
      </button>
    </div>
  );
}