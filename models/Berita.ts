import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBerita extends Document {
  judul: string;
  slug: string;
  konten: string;
  gambar_url?: string;
  kategori?: string;
  tags?: string[];
  penulis?: string;
  penulis_id?: mongoose.Types.ObjectId;
  views: number;
  published_at?: Date;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  approved_by?: mongoose.Types.ObjectId;
  approved_at?: Date;
  rejection_reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BeritaSchema = new Schema<IBerita>(
  {
    judul: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    konten: { type: String, required: true },
    gambar_url: String,
    kategori: String,
    tags: [String], // Added
    penulis: String, // Added manual override
    penulis_id: { type: Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, default: 0 },
    published_at: Date,
    status: { 
      type: String, 
      enum: ['draft', 'pending', 'approved', 'rejected'], 
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

const Berita: Model<IBerita> = mongoose.models.Berita || mongoose.model<IBerita>('Berita', BeritaSchema);

export default Berita;
