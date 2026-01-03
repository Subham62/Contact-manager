import React, { useState } from 'react';
import ContactForm from './pages/ContactForm';
import ContactList from './pages/ContactList';
import Toast from './components/Toast';

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://www.shutterstock.com/image-vector/contact-management-multi-color-concept-600nw-2455950251.jpg" 
              alt="Contact Manager Logo" 
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Manager</h1>
              <p className="text-gray-600 text-sm">Manage your contacts efficiently</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <ContactForm onSuccess={() => showToast('Contact created successfully!')} />
        <ContactList />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Built By Subham.</p>
          <p>Copyright © 2026 Contact Manager All rights reserved.</p>
        </div>
      </footer>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
