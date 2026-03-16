import Email from '../models/Email.js';
import User from '../models/User.js';

/**
 * @desc    Send an email
 * @route   POST /api/emails/send
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const sendEmail = async (req, res) => {
  const { receivers, subject, body } = req.body;

  if (!receivers || !Array.isArray(receivers) || receivers.length === 0 || !subject || !body) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  if (receivers.includes(req.user.email)) {
    return res.status(400).json({ message: 'You cannot send emails to yourself' });
  }

  try {
    const existingUsers = await User.find({ email: { $in: receivers } });
    const existingEmails = existingUsers.map(u => u.email);
    const nonExistingEmails = receivers.filter(email => !existingEmails.includes(email));

    if (nonExistingEmails.length > 0) {
      return res.status(400).json({ 
        message: `The following recipients do not exist: ${nonExistingEmails.join(', ')}` 
      });
    }

    const email = await Email.create({
      sender: req.user.email,
      receivers,
      subject,
      body,
    });

    if (email) {
      res.status(201).json({
        message: 'Email sent successfully',
        data: email,
      });
    } else {
      res.status(400).json({ message: 'Invalid email data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get unique recipients from previously sent emails
 * @route   GET /api/emails/recipients
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getPreviousRecipients = async (req, res) => {
  try {
    const emails = await Email.find({ sender: req.user.email }).select('receivers');
    const allRecipients = emails.flatMap(email => email.receivers);
    const uniqueRecipients = [...new Set(allRecipients)];
    
    res.status(200).json(uniqueRecipients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
