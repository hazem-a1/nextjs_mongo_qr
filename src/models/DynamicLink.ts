import mongoose from 'mongoose';

const DynamicLinkSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true },
  targetUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qrDesign: {
    backgroundColor: String,
    foregroundColor: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.DynamicLink || mongoose.model('DynamicLink', DynamicLinkSchema);