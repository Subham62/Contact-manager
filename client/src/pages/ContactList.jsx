import React, { useState } from 'react';
import ContactCard from '../components/ContactCard';
import { useGetContactsQuery, useDeleteContactMutation } from '../features/api/contactsApi';

const ContactList = () => {
  const [sortOrder, setSortOrder] = useState('-createdAt');
  const { data, isLoading, isError } = useGetContactsQuery({ sort: sortOrder });
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id).unwrap();
      } catch (error) {
        alert('Failed to delete contact');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[--color-primary]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card max-w-2xl mx-auto bg-red-50 border-red-200">
        <p className="text-red-700 text-center">Failed to load contacts. Please try again.</p>
      </div>
    );
  }

  const contacts = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          All Contacts 
          <span className="ml-2 text-lg font-normal text-gray-500">
            ({contacts.length})
          </span>
        </h2>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] bg-white"
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="name">Name (A-Z)</option>
          <option value="-name">Name (Z-A)</option>
        </select>
      </div>

      {contacts.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Contacts Yet</h3>
          <p className="text-gray-500">Start by adding your first contact above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
