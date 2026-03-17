import express from 'express';
import { sendEmail, getPreviousRecipients, getEmails, markAsRead, deleteEmail } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, sendEmail);
router.get('/recipients', protect, getPreviousRecipients);
router.get('/', protect, getEmails);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteEmail);

export default router;
