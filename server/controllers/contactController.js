import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Check if contact with same email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this email already exists'
      });
    }

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: contact
    });
  } catch (error) {
    console.error('Create Contact Error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { sort = '-createdAt', limit = 50, search } = req.query;
    
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const contacts = await Contact.find(query)
      .sort(sort)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get Contacts Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get Contact Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete Contact Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};
