"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaUser, 
  FaNewspaper, 
  FaStore, 
  FaCalendarAlt, 
  FaHandHoldingHeart, 
  FaSignOutAlt,
  FaCog
} from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const AlumniSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/alumni', icon: <FaHome /> },
        { name: 'Profil Saya', path: '/alumni/profile', icon: <FaUser /> },
        { name: 'Artikel Saya', path: '/alumni/artikel', icon: <FaNewspaper /> },
        { name: 'Lapak Usaha', path: '/alumni/lapak', icon: <FaStore /> },
        { name: 'Agenda', path: '/alumni/agenda', icon: <FaCalendarAlt /> },
        { name: 'Donasi', path: '/alumni/donasi', icon: <FaHandHoldingHeart /> },
        { name: 'Pengaturan', path: '/alumni/settings', icon: <FaCog /> },
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-green-900 text-white shadow-lg overflow-y-auto z-50">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-green-800">
                    <h1 className="text-xl font-bold tracking-wider">DASHBOARD ALUMNI</h1>
                    <p className="text-xs text-green-300 mt-1">IKA SMANDA KENDAL</p>
                </div>

                {/* Navbar Links (Quick Access) */}
                <div className="px-6 py-4 border-b border-green-800 space-y-2">
                    <Link href="/" className="block text-sm text-green-200 hover:text-white transition">← Kembali ke Website</Link>
                    <Link href="/buletin" className="block text-sm text-green-200 hover:text-white transition">Buletin IKASMAN1K</Link>
                    <Link href="/privacy" className="block text-sm text-green-200 hover:text-white transition">Kebijakan Privasi</Link>
                    <Link href="/faq" className="block text-sm text-green-200 hover:text-white transition">FAQ / Bantuan</Link>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => {
                         const isActive = pathname === item.path;
                         return (
                            <Link 
                                key={item.path} 
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive 
                                    ? 'bg-green-700 text-white shadow-md' 
                                    : 'text-green-100 hover:bg-green-800 hover:text-white'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                         );
                    })}
                </nav>

                {/* Footer / Logout */}
                <div className="p-6 border-t border-green-800">
                    <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-3 text-red-300 hover:text-red-100 hover:bg-red-900/20 w-full px-4 py-3 rounded-lg transition"
                    >
                         <FaSignOutAlt />
                         <span className="font-medium">Keluar</span>
                    </button>
                    <div className="mt-6 text-xs text-center text-green-500">
                        <p>© 2026 IKA SMANDA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniSidebar;
