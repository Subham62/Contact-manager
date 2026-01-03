import React, { useState } from 'react';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { validateEmail, validatePhone } from '../lib/utils';
import { useCreateContactMutation } from '../features/api/contactsApi';

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [createContact, { isLoading }] = useCreateContactMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.message && formData.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createContact(formData).unwrap();
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: error.data?.message || 'Failed to create contact' });
    }
  };

  const isFormValid = formData.name.trim() && 
                      validateEmail(formData.email) && 
                      validatePhone(formData.phone) &&
                      !isLoading;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Contact</h2>
        <p className="text-gray-600">Fill in the details to add a new contact to your list</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="Subham "
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            disabled={isLoading}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="subham@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            disabled={isLoading}
          />
        </div>

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+91 1234567"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          disabled={isLoading}
        />

        <Textarea
          label="Message (Optional)"
          name="message"
          placeholder="Enter your message here..."
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          disabled={isLoading}
        />

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Contact...
            </>
          ) : (
            <>
              + Add Contact
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;