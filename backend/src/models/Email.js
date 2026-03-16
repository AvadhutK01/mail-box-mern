import mongoose from 'mongoose';

const emailSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receivers: {
      type: [String],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model('Email', emailSchema);
export default Email;
