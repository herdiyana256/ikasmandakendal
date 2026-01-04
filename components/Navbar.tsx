"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { FaFacebookF, FaInstagram, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Hook logic
  }, []);

  const links = [
    { href: "/berita", label: "BERITA" },
    { href: "/kolom-alumni", label: "JEJAK ALUMNI" },
    { href: "/direktori-alumni", label: "PETA ALUMNI" },
    { href: "/lapak-alumni", label: "LAPAK ALUMNI" },
    { href: "/agenda", label: "KALENDER KEGIATAN" },
    { href: "/info-loker", label: "PELUANG KARIR" },
    { href: "/donasi", label: "DONASI & BANTUAN" },
  ];

  // Hide Navbar on Admin routes - Render logic, safe after hooks
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/alumni')) {
      return null;
  }

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-[#1E40AF] text-white py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm font-sans">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-200"><FaFacebookF /></a>
          <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-200"><FaYoutube /></a>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/tentang" className="hover:text-gray-200 hidden md:block">Tentang IKA SMANDA</Link>
          <Link href="/faq" className="hover:text-gray-200 hidden md:block">FAQ</Link>
          
      {!session ? (
            <div className="flex space-x-2">
              <Link href="/daftar" className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors font-bold uppercase text-xs tracking-wider">Daftar</Link>
              <Link href="/masuk" className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors font-bold uppercase text-xs tracking-wider">Masuk</Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
               <span>Hi, {session.user?.name?.split(' ')[0]}</span>
               { ['admin', 'IT'].includes((session.user as any).role) && (
                  <Link href="/admin" className="text-yellow-300 font-bold hover:underline">Admin Panel</Link>
               )}
                {(session.user as any).role === 'alumni' && (
                  <Link href="/alumni" className="text-yellow-300 font-bold hover:underline">Dashboard</Link>
               )}
               <button 
                  onClick={async () => {
                      await signOut({ redirect: false });
                      toast.success('Anda telah keluar.');
                      window.location.href = '/masuk';
                  }} 
                  className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors uppercase text-xs tracking-wider"
               >
                  Keluar
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white shadow-md transition-all duration-300 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                 {/* Logo image handling - using the uploaded logo which was copied to public/logo.png */}
                 <img className="h-16 w-auto" src="/logo.png" alt="IKA SMANDA KENDAL" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-1 py-2 text-xl font-bebas tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-[#1E40AF]"
                      : "text-gray-700 hover:text-[#1E40AF]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1E40AF] focus:outline-none"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-xl font-bebas uppercase ${
                    pathname === link.href
                      ? "text-[#1E40AF] bg-gray-50"
                      : "text-gray-700 hover:text-[#1E40AF] hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-200">
                  <Link href="/tentang" className="block px-3 py-2 text-base font-medium text-gray-700">Tentang IKA SMANDA</Link>
                  <Link href="/faq" className="block px-3 py-2 text-base font-medium text-gray-700">FAQ</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
