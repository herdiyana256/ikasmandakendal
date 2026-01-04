"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
  // Hide Footer on Admin routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/alumni')) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-[#1E40AF] to-[#112F82] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="bg-white p-2 inline-block rounded-lg">
                <img src="/logo.png" alt="IKA SMANDA" className="h-16 w-auto" />
            </div>
            {/* <h3 className="text-xl font-bold font-poppins">IKA SMANDA KENDAL</h3> */} 
            <h3 className="text-xl font-bold italic font-poppins mt-2">
              &quot;Satu Hati, Satu Ikatan, Satu IKASMANDA.&quot;
            </h3>
            <p className="text-sm font-roboto mt-2">
              Alumni SMA Negeri 1 Kendal bersatu dalam ikatan yang guyub, gayeng, dan bermanfaat bagi semua.
            </p>
          </div>

          {/* Organisasi Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider underline underline-offset-4 decoration-white/30 font-poppins">Organisasi</h3>
            <ul className="space-y-2 text-sm font-roboto">
              <li><Link href="/sambutan-ketum" className="hover:text-gray-300">Sambutan Ketum</Link></li>
              <li><Link href="/tentang" className="hover:text-gray-300">Sejarah Ikasman1k</Link></li>
              <li><Link href="/pengurus" className="hover:text-gray-300">Susunan Pengurus</Link></li>
              <li><Link href="/program-kerja" className="hover:text-gray-300">Program Kerja</Link></li>
            </ul>
          </div>

          {/* Alumni Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider underline underline-offset-4 decoration-white/30 font-poppins">Alumni</h3>
            <ul className="space-y-2 text-sm font-roboto">
              <li><Link href="/direktori-alumni" className="hover:text-gray-300">Direktori Alumni</Link></li>
              <li><Link href="/kolom-alumni" className="hover:text-gray-300">Kolom Alumni</Link></li>
              <li><Link href="/lapak-alumni" className="hover:text-gray-300">Lapak Alumni</Link></li>
              <li><Link href="/donasi" className="hover:text-gray-300">Donasi</Link></li>
            </ul>
          </div>

          {/* Terhubung Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider underline underline-offset-4 decoration-white/30 font-poppins">Terhubung</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><FaFacebookF /></a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><FaInstagram /></a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><FaTwitter /></a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><FaYoutube /></a>
            </div>
            <Link href="/buletin" className="text-sm hover:text-gray-300 block mb-2 font-roboto">Buletin IKASMAN1K</Link>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm font-roboto">
          <p>&copy; 2026 ikasman1k</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <Link href="/kebijakan-privasi" className="hover:text-gray-300">Kebijakan Privasi</Link>
             <Link href="/faq" className="hover:text-gray-300">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
