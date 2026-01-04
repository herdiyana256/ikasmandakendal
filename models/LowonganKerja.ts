import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILowonganKerja extends Document {
  judul: string;
  perusahaan: string;
  deskripsi?: string;
  lokasi?: string;
  tipe_pekerjaan?: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance' | 'Internship';
  gaji_min?: number;
  gaji_max?: number;
  requirements?: string;
  contact_email?: string;
  contact_phone?: string;
  deadline?: Date;
  posted_by?: mongoose.Types.ObjectId;
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const LowonganKerjaSchema = new Schema<ILowonganKerja>(
  {
    judul: { type: String, required: true },
    perusahaan: { type: String, required: true },
    deskripsi: String,
    lokasi: String,
    tipe_pekerjaan: { type: String, enum: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] },
    gaji_min: Number,
    gaji_max: Number,
    requirements: String,
    contact_email: String,
    contact_phone: String,
    deadline: Date,
    posted_by: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

const LowonganKerja: Model<ILowonganKerja> = mongoose.models.LowonganKerja || mongoose.model<ILowonganKerja>('LowonganKerja', LowonganKerjaSchema);

export default LowonganKerja;
