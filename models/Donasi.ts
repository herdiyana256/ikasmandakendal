import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonasi extends Document {
  nama_campaign: string;
  deskripsi?: string;
  target_amount: number;
  current_amount: number;
  gambar_url?: string;
  status: 'pending' | 'active' | 'completed' | 'rejected' | 'closed';
  approved_by?: mongoose.Types.ObjectId;
  approved_at?: Date;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DonasiSchema = new Schema<IDonasi>(
  {
    nama_campaign: { type: String, required: true },
    deskripsi: String,
    target_amount: { type: Number, required: true },
    current_amount: { type: Number, default: 0 },
    gambar_url: String,
    status: { 
      type: String, 
      enum: ['pending', 'active', 'completed', 'rejected', 'closed'], 
      default: 'pending' 
    },
    approved_by: { type: Schema.Types.ObjectId, ref: 'User' },
    approved_at: Date,
    deadline: Date,
  },
  {
    timestamps: true,
  }
);

const Donasi: Model<IDonasi> = mongoose.models.Donasi || mongoose.model<IDonasi>('Donasi', DonasiSchema);

export default Donasi;
