
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validate file type (image only)
  if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
  }

  // Create unique filename
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  
  // Define upload dir (public/uploads)
  // Note: Vercel specific paths might differ for temp, but for standard VPS/Local access via public URL:
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Ensure directory exists (Node 10+ recursive)
  // We can try/catch mkdir
  const fs = require('fs');
  if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);

  try {
    await writeFile(filePath, buffer);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
