import mongoose from 'mongoose';
import { QrStyleOptions } from './QRStyleOptions';

const DynamicLinkSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true },
  targetUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qrStyleOptions: QrStyleOptions,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.DynamicLink || mongoose.model('DynamicLink', DynamicLinkSchema);