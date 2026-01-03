import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// /api/contacts
router.route('/')
  .get(getContacts)
  .post(createContact);

// /api/contacts/:id
router.route('/:id')
  .get(getContactById)
  .delete(deleteContact);

export default router;
