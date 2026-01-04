import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILapakAlumni extends Document {
  user_id: mongoose.Types.ObjectId;
  nama_usaha: string;
  deskripsi?: string;
  kategori?: string;
  alamat?: string;
  latitude?: number;
  longitude?: number;
  no_telepon?: string;
  email?: string;
  website?: string;
  jam_operasional?: string;
  gambar_url?: string;
  status: 'pending' | 'approved' | 'rejected' | 'inactive';
  approved_by?: mongoose.Types.ObjectId;
  approved_at?: Date;
  rejection_reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LapakAlumniSchema = new Schema<ILapakAlumni>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nama_usaha: { type: String, required: true },
    deskripsi: String,
    kategori: String,
    alamat: String,
    latitude: Number,
    longitude: Number,
    no_telepon: String,
    email: String,
    website: String,
    jam_operasional: String,
    gambar_url: String,
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected', 'inactive'], 
      default: 'pending' 
    },
    approved_by: { type: Schema.Types.ObjectId, ref: 'User' },
    approved_at: Date,
    rejection_reason: String,
  },
  {
    timestamps: true,
  }
);

const LapakAlumni: Model<ILapakAlumni> = mongoose.models.LapakAlumni || mongoose.model<ILapakAlumni>('LapakAlumni', LapakAlumniSchema);

export default LapakAlumni;
