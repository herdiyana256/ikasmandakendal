import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPengurus {
  nama: string;
  jabatan: string;
  foto_url?: string;
  linkedin_url?: string;
}

export interface IOrganization extends Document {
  visi: string;
  misi: string[];
  sejarah: string; // HTML/Markdown content
  struktur_pengurus: IPengurus[];
  updated_by?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    visi: { type: String, default: '' },
    misi: { type: [String], default: [] },
    sejarah: { type: String, default: '' },
    struktur_pengurus: [
      {
        nama: { type: String, required: true },
        jabatan: { type: String, required: true },
        foto_url: String,
        linkedin_url: String
      }
    ],
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

const Organization: Model<IOrganization> = mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);

export default Organization;
