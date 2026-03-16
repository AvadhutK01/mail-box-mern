import express from 'express';
import { sendEmail, getPreviousRecipients } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, sendEmail);
router.get('/recipients', protect, getPreviousRecipients);

export default router;
