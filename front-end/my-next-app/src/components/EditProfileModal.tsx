import { useState } from 'react';
import { Save } from 'lucide-react';
import Cookies from 'js-cookie';
import { Admin } from './types/admin';
import { Modal } from './Modal';
import { FormInput } from './FormInput';
import { ModalActions } from './ModalActions';

interface EditProfileModalProps {
  currentAdmin: Admin;
  onClose: () => void;
  onProfileUpdate: () => void;
  onCurrentAdminUpdate: () => void;
  onMessage: (message: { type: 'success' | 'error'; text: string }) => void;
}

export function EditProfileModal({
  currentAdmin,
  onClose,
  onProfileUpdate,
  onCurrentAdminUpdate,
  onMessage
}: EditProfileModalProps) {
  const [editFormData, setEditFormData] = useState({
    name: currentAdmin.name,
    email: currentAdmin.email,
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('adminToken');
      
      const updateData: any = {};
      if (editFormData.name !== currentAdmin.name) {
        updateData.name = editFormData.name;
      }
      if (editFormData.email !== currentAdmin.email) {
        updateData.email = editFormData.email;
      }
      if (editFormData.password) {
        updateData.password = editFormData.password;
      }

      if (Object.keys(updateData).length === 0) {
        onMessage({ type: 'error', text: 'هیچ داده‌ای برای آپدیت وارد نشده است' });
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:4000/admin/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok) {
        onMessage({ type: 'success', text: 'پروفایل با موفقیت بروزرسانی شد ✅' });
        
        const updatedAdmin = { ...currentAdmin, ...updateData };
        Cookies.set('adminUser', JSON.stringify(updatedAdmin));
        
        onProfileUpdate();
        onCurrentAdminUpdate();
        onClose();
        
        setEditFormData(prev => ({ ...prev, password: '' }));
      } else {
        onMessage({ type: 'error', text: data.message || 'خطا در بروزرسانی پروفایل' });
      }
    } catch (error) {
      onMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal onClose={onClose} title="ویرایش پروفایل">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <FormInput
          label="نام کامل"
          name="name"
          value={editFormData.name}
          onChange={handleInputChange}
          placeholder="نام جدید را وارد کنید"
        />

        <FormInput
          label="ایمیل"
          type="email"
          name="email"
          value={editFormData.email}
          onChange={handleInputChange}
          placeholder="ایمیل جدید را وارد کنید"
        />

        <FormInput
          label="رمز عبور جدید (اختیاری)"
          type="password"
          name="password"
          value={editFormData.password}
          onChange={handleInputChange}
          placeholder="رمز عبور جدید (حداقل ۶ کاراکتر)"
          minLength={6}
        />
        
        <p className="text-xs text-gray-400 mt-1">
          در صورت عدم تمایل به تغییر رمز عبور، این فیلد را خالی بگذارید
        </p>

        <ModalActions
          onCancel={onClose}
          submitText="ذخیره تغییرات"
          submitIcon={<Save size={18} />}
          loading={loading}
        />
      </form>
    </Modal>
  );
}