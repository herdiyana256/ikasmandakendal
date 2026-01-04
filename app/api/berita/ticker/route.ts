import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Berita from '@/models/Berita';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch latest 10 approved news items
    const tickerItems = await Berita.find({ status: 'approved' })
      .sort({ published_at: -1, createdAt: -1 })
      .limit(10)
      .select('judul kategori slug');

    // Default items if empty
    const defaultItems = [
      { label: "REUNI AKBAR 2026", text: "Pendaftaran resmi dibuka mulai hari ini! Segera isi form pendaftaran.", icon: "🎉" },
      { label: "SOSIAL", text: "Alumni Angkatan 2005 sukses menggelar donor darah massal di Kendal kemarin.", icon: "🩸" },
      { label: "BEASISWA", text: "IKASMANDA membuka program beasiswa bagi siswa SMA Negeri 1 Kendal.", icon: "🎓" },
      { label: "LOKER", text: "Cek peluang karir terbaru khusus untuk alumni di halaman Peluang Karir.", icon: "💼" },
      { label: "PRESTASI", text: "Alumni Smanda berhasil menyabet juara di kompetisi inovasi tingkat nasional!", icon: "🏆" }
    ];

    const formattedItems = tickerItems.length > 0 
      ? tickerItems.map(item => ({
          label: (item.kategori || 'UPDATE').toUpperCase(),
          text: item.judul,
          href: `/berita/${item.slug}`,
          icon: getIcon(item.kategori)
        }))
      : defaultItems;

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Ticker API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

function getIcon(kategori?: string) {
  const k = kategori?.toLowerCase() || '';
  if (k.includes('reuni')) return '🎉';
  if (k.includes('sosial')) return '🩸';
  if (k.includes('beasiswa')) return '🎓';
  if (k.includes('loker')) return '💼';
  if (k.includes('prestasi')) return '🏆';
  if (k.includes('olahraga')) return '🏀';
  return '📢';
}
