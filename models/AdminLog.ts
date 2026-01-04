import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminLog extends Document {
  admin_id: mongoose.Types.ObjectId;
  action: string;
  target_type: string;
  target_id: mongoose.Types.ObjectId;
  details?: string;
  createdAt: Date;
}

const AdminLogSchema = new Schema<IAdminLog>(
  {
    admin_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // 'approve', 'reject', 'delete', 'edit'
    target_type: { type: String, required: true }, // 'berita', 'lapak', 'donasi', 'user'
    target_id: { type: Schema.Types.ObjectId, required: true },
    details: String,
  },
  {
    timestamps: true,
  }
);

const AdminLog: Model<IAdminLog> = mongoose.models.AdminLog || mongoose.model<IAdminLog>('AdminLog', AdminLogSchema);

export default AdminLog;
