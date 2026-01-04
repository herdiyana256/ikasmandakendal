import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";

export default function DetailBeritaPage({ params }: { params: { slug: string } }) {
  // Mock data fetching based on slug
  const title = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link href="/berita">
        <Button variant="outline" size="sm" className="mb-8">
          <FaArrowLeft className="mr-2" /> Kembali ke Berita
        </Button>
      </Link>

      <article className="prose lg:prose-xl mx-auto">
        <div className="h-64 w-full bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-6xl text-gray-400">
          📰
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{title}</h1>
        
        <div className="flex items-center text-gray-500 text-sm mb-8 space-x-6">
          <span className="flex items-center"><FaCalendar className="mr-2"/> 4 Januari 2026</span>
          <span className="flex items-center"><FaUser className="mr-2"/> Oleh: Admin</span>
        </div>

        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <h3>Sub Judul Berita</h3>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </article>
    </div>
  );
}
