import React from 'react';
import { formatDate } from '../lib/utils';

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 m-0">
            {contact.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(contact.createdAt)}
          </p>
        </div>
        
        <button
          onClick={() => onDelete(contact._id)}
          className="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
        >
          Delete
        </button>
      </div>
      
      {/* Contact Info */}
      <div className="text-base text-gray-700 space-y-2">
        <div>
          📧 <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-700 no-underline transition-colors">
            {contact.email}
          </a>
        </div>
        
        <div>
          📞 <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-700 no-underline transition-colors">
            {contact.phone}
          </a>
        </div>
        
        {contact.message && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <em className="text-gray-600 text-sm">"{contact.message}"</em>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;