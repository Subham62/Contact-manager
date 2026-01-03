export const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s+()-]{10,}$/;
  return phoneRegex.test(phone);
};

export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};