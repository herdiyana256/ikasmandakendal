"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    FaChartPie, FaUsers, FaSitemap, FaAddressBook, FaPenFancy, 
    FaNewspaper, FaCalendarAlt, FaStore, FaBriefcase, FaHandHoldingHeart, 
    FaCogs, FaInbox, FaDatabase, FaBars, FaChevronLeft, FaChevronRight,
    FaSignOutAlt, FaHome
} from 'react-icons/fa';
import { signOut } from 'next-auth/react';

interface SidebarProps {
    userRole: string;
}

export default function AdminSidebar({ userRole }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { header: 'Main Menu', items: [
            { label: 'Dashboard', href: '/admin', icon: FaChartPie, roles: ['admin', 'IT'] },
            { label: 'Analytics', href: '/admin/analytics', icon: FaChartPie, roles: ['admin', 'IT'] },
        ]},
        { header: 'Organisasi & User', items: [
            { label: 'Manajemen Pengguna', href: '/admin/users', icon: FaUsers, roles: ['IT'] },
            { label: 'Struktur Organisasi', href: '/admin/organisasi', icon: FaSitemap, roles: ['admin', 'IT'] },
        ]},
        { header: 'Konten Alumni', items: [
            { label: 'Direktori Alumni', href: '/admin/alumni/direktori', icon: FaAddressBook, roles: ['admin', 'IT'] },
            { label: 'Kolom Alumni', href: '/admin/alumni/kolom', icon: FaPenFancy, roles: ['admin', 'IT'] },
            { label: 'Jejak Alumni', href: '/admin/alumni/jejak', icon: FaUsers, roles: ['admin', 'IT'] },
        ]},
        { header: 'Modul', items: [
            { label: 'Berita / Artikel', href: '/admin/berita', icon: FaNewspaper, roles: ['admin', 'IT'] },
            { label: 'Agenda Kegiatan', href: '/admin/agenda', icon: FaCalendarAlt, roles: ['admin', 'IT'] },
            { label: 'Lapak Alumni', href: '/admin/lapak', icon: FaStore, roles: ['admin', 'IT'] },
            { label: 'Lowongan Kerja', href: '/admin/loker', icon: FaBriefcase, roles: ['admin', 'IT'] },
            { label: 'Donasi & Bantuan', href: '/admin/donasi', icon: FaHandHoldingHeart, roles: ['admin', 'IT'] },
        ]},
        { header: 'System', items: [
            { label: 'Pengaturan UI', href: '/admin/settings', icon: FaCogs, roles: ['IT'] },
            { label: 'Inbox / Notifikasi', href: '/admin/inbox', icon: FaInbox, roles: ['admin', 'IT'] },
            { label: 'Backup & Export', href: '/admin/backup', icon: FaDatabase, roles: ['IT'] },
        ]},
    ];

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

    return (
        <>
            {/* Mobile Header Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0F172A] border-b border-slate-800 px-4 h-16 z-50 flex items-center justify-between shadow-sm">
                <span className="font-bold text-white text-lg">Admin Panel</span>
                <button onClick={toggleMobile} className="p-2 text-slate-300 hover:bg-slate-800 rounded">
                    <FaBars size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-screen bg-[#0F172A] text-slate-300 transition-all duration-300 z-40 border-r border-slate-800
                flex flex-col shadow-xl
                ${isCollapsed ? 'w-20' : 'w-64'}
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                
                {/* Header / Logo Area */}
                <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'} border-b border-slate-800 bg-[#0F172A]`}>
                     {!isCollapsed && <span className="text-[15px] font-bold text-white tracking-wide whitespace-nowrap">IKA SMANDA KENDAL</span>}
                     <button onClick={toggleSidebar} className="text-slate-400 hover:text-white transition-colors p-1.5 rounded hover:bg-slate-800 hidden lg:block">
                        {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
                    </button>
                    {/* Mobile Close */}
                     <button onClick={toggleMobile} className="lg:hidden text-slate-400">
                        <FaChevronLeft size={20} />
                    </button>
                </div>

                {/* Menu List */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-none">
                    {menuItems.map((section, idx) => (
                        <div key={idx} className="mb-6">
                            {!isCollapsed && (
                                <h3 className="px-6 text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-3">
                                    {section.header}
                                </h3>
                            )}
                            
                            <nav className="space-y-0.5 px-3">
                                {section.items.map((item) => {
                                    if (!item.roles.includes(userRole)) return null;
                                    
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link 
                                            key={item.href} 
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 group
                                                ${isActive ? 'bg-[#1E40AF] text-white shadow-md' : 'text-slate-400 hover:bg-[#3B82F6] hover:text-white'}
                                                ${isCollapsed ? 'justify-center px-0' : ''}
                                            `}
                                            title={isCollapsed ? item.label : ''}
                                        >
                                            <item.icon size={isCollapsed ? 20 : 18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}
                    
                    {/* Bottom Actions */}
                    <div className="px-3 mt-4 pt-4 border-t border-slate-800">
                         <Link 
                            href="/" 
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#3B82F6] hover:text-white text-slate-400 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                            title="Ke Website Utama"
                         >
                            <FaHome size={18} />
                            {!isCollapsed && <span className="text-sm font-medium">Ke Website</span>}
                         </Link>

                         <button 
                            onClick={() => signOut({ callbackUrl: '/masuk' })}
                            className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-red-900/20 hover:text-red-400 text-slate-400 transition-colors mt-1 ${isCollapsed ? 'justify-center' : ''}`}
                            title="Keluar"
                         >
                            <FaSignOutAlt size={18} />
                            {!isCollapsed && <span className="text-sm font-medium">Keluar</span>}
                         </button>
                    </div>
                </div>
            </aside>

            {/* Backdrop for Mobile */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}
