import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaksiDonasi extends Document {
  donasi_id: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
  nama_donatur: string;
  email?: string;
  amount: number;
  pesan?: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
}

const TransaksiDonasiSchema = new Schema<ITransaksiDonasi>(
  {
    donasi_id: { type: Schema.Types.ObjectId, ref: 'Donasi', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    nama_donatur: { type: String, required: true },
    email: String,
    amount: { type: Number, required: true },
    pesan: String,
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  },
  {
    timestamps: true,
  }
);

const TransaksiDonasi: Model<ITransaksiDonasi> = mongoose.models.TransaksiDonasi || mongoose.model<ITransaksiDonasi>('TransaksiDonasi', TransaksiDonasiSchema);

export default TransaksiDonasi;
