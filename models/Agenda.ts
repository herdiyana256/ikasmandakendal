import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAgenda extends Document {
  judul: string;
  deskripsi?: string;
  tanggal_mulai: Date;
  tanggal_selesai?: Date;
  lokasi?: string;
  gambar_url?: string;
  created_by?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AgendaSchema = new Schema<IAgenda>(
  {
    judul: { type: String, required: true },
    deskripsi: String,
    tanggal_mulai: { type: Date, required: true },
    tanggal_selesai: Date,
    lokasi: String,
    gambar_url: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Agenda: Model<IAgenda> = mongoose.models.Agenda || mongoose.model<IAgenda>('Agenda', AgendaSchema);

export default Agenda;
