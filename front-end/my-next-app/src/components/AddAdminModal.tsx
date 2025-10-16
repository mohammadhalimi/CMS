// AddAdminModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import Cookies from 'js-cookie';
import { Modal } from './Modal';
import { FormInput } from './FormInput';
import { ModalActions } from './ModalActions';

interface AddAdminModalProps {
  onClose: () => void;
  onAdminAdded: () => void;
  onMessage: (message: { type: 'success' | 'error'; text: string }) => void;
}

export function AddAdminModal({ onClose, onAdminAdded, onMessage }: AddAdminModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('adminToken');
      const response = await fetch('http://localhost:4000/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onMessage({ type: 'success', text: 'مدیر جدید با موفقیت اضافه شد' });
        onClose();
        onAdminAdded();
      } else {
        onMessage({ type: 'error', text: data.message || 'خطا در ثبت مدیر' });
      }
    } catch (error) {
      onMessage({ type: 'error', text: 'خطا در ارتباط با سرور' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="افزودن مدیر جدید">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <FormInput
          label="نام کامل"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="نام مدیر را وارد کنید"
          required
        />

        <FormInput
          label="ایمیل"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="example@email.com"
          required
        />

        <FormInput
          label="رمز عبور"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="حداقل ۶ کاراکتر"
          required
          minLength={6}
        />

        <ModalActions
          onCancel={onClose}
          submitText="ثبت مدیر"
          loading={loading}
        />
      </form>
    </Modal>
  );
}

// EditProfileModal.tsx - به صورت مشابه پیاده‌سازی می‌شود
// سایر کامپوننت‌های کمکی مانند Modal، FormInput، ModalActions و...