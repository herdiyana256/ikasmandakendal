"use client";

import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaRobot, FaTimes, FaCommentDots, FaChevronRight, FaChevronLeft, FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 1. DATA STRUCTURE
const CHATBOT_MENU = [
  {
    id: 'main',
    title: 'Menu Utama',
    options: [
      { label: 'Berita & Kegiatan', target: 'berita' },
      { label: 'Agenda & Event Alumni', target: 'agenda' },
      { label: 'Jejak & Direktori Alumni', target: 'alumni' },
      { label: 'Lapak Alumni & Usaha', target: 'lapak' },
      { label: 'Program Kerja & Kolaborasi', target: 'proker' },
      { label: 'Kontak & Bantuan', target: 'kontak' }
    ]
  },
  {
    id: 'berita',
    title: 'Berita & Kegiatan',
    parent: 'main',
    options: [
      { label: 'Headline Berita', action: 'showHeadlineNews' },
      { label: 'Kategori Berita', action: 'showNewsByCategory' },
      { label: 'Cari Berita', action: 'searchNews' }
    ],
    cta: { text: 'Baca Berita Lengkap', link: '/berita' }
  },
  {
    id: 'agenda',
    title: 'Agenda & Event',
    parent: 'main',
    options: [
      { label: 'Event Mendatang', action: 'showUpcomingEvents' },
      { label: 'Detail Event', action: 'showEventDetails' }
    ],
    cta: { text: 'Daftar Event', link: '/agenda' }
  },
  {
    id: 'alumni',
    title: 'Jejak & Direktori',
    parent: 'main',
    options: [
      { label: 'Direktori Alumni', action: 'searchAlumni' },
      { label: 'Jejak Alumni', action: 'showAlumniAchievements' }
    ],
    cta: { text: 'Temukan Alumni', link: '/peta-alumni' }
  },
  {
    id: 'lapak',
    title: 'Lapak Alumni',
    parent: 'main',
    options: [
      { label: 'Daftar Lapak', action: 'registerAlumniShop' },
      { label: 'Jelajahi Lapak', action: 'exploreAlumniShop' }
    ],
    cta: { text: 'Kunjungi Lapak', link: '/lapak-alumni' }
  },
  {
    id: 'proker',
    title: 'Program Kerja',
    parent: 'main',
    options: [
      { label: 'Program Kerja Alumni', action: 'showPrograms' },
      { label: 'Kolaborasi Alumni', action: 'showCollaboration' }
    ],
    cta: { text: 'Pelajari Proker', link: '/tentang' }
  },
  {
    id: 'kontak',
    title: 'Kontak & Bantuan',
    parent: 'main',
    options: [
      { label: 'Hubungi Admin', action: 'contactAdmin' },
      { label: 'FAQ', action: 'showFAQ' }
    ],
    cta: { text: 'Hubungi Admin', link: 'https://wa.me/6281234567890' }
  }
];

export default function FloatingCTA() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // State for Chat Navigation
  const [currentMenuId, setCurrentMenuId] = useState('main');
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string, link?: string, linkText?: string}[]>([
    { 
      role: 'bot', 
      text: 'Halo! Selamat datang di IKASMANDA KENDAL. Ada yang bisa kami bantu hari ini?'
    }
  ]);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, currentMenuId]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isChatOpen) setIsChatOpen(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsOpen(false);
    if (!isChatOpen) {
        // Reset to main menu when opening
        setCurrentMenuId('main');
    }
  };

  const currentMenu = CHATBOT_MENU.find(m => m.id === currentMenuId) || CHATBOT_MENU[0];

  const handleMenuOptionClick = (option: { label: string, target?: string, action?: string }) => {
    // 1. Add User Click as Message (Optional, keeps history clean)
    // setMessages(prev => [...prev, { role: 'user', text: option.label }]);

    // 2. Navigation Logic
    if (option.target) {
        // Go to Submenu
        setCurrentMenuId(option.target);
    } else if (option.action) {
        // Execute Action
        handleAction(option.action, option.label);
    }
  };

  const handleAction = (action: string, label: string) => {
      // Add user bubble
      setMessages(prev => [...prev, { role: 'user', text: label }]);

      // Simulate Bot Response
      setTimeout(() => {
          let botResponse = { role: 'bot', text: '', link: '', linkText: '' };

          switch(action) {
              // BERITA
              case 'showHeadlineNews':
                  botResponse = { role: 'bot', text: '3 Berita Terbaru:\n1. Reuni Akbar Angkatan 90\n2. Juara 1 OSN Matematika\n3. Workshop Digital Marketing', link: '/berita', linkText: 'Baca Berita Lengkap' };
                  break;
              case 'showNewsByCategory':
                  botResponse = { role: 'bot', text: 'Kami memiliki berita kategori: Kegiatan, Prestasi, Sosial, dan Teknologi.', link: '/berita', linkText: 'Lihat Kategori' };
                  break;
              case 'searchNews':
                  botResponse = { role: 'bot', text: 'Untuk mencari berita, silakan gunakan fitur pencarian di halaman Berita.', link: '/berita', linkText: 'Cari Berita' };
                  break;
              
              // AGENDA
              case 'showUpcomingEvents':
                  botResponse = { role: 'bot', text: 'Agenda terdekat: Reuni Akbar (Agustus 2025) dan Webinar Kewirausahaan (Juli 2024).', link: '/agenda', linkText: 'Lihat Kalender' };
                  break;
              case 'showEventDetails':
                  botResponse = { role: 'bot', text: 'Silakan pilih event di halaman Agenda untuk melihat detail lokasi dan pendaftaran.', link: '/agenda', linkText: 'Buka Agenda' };
                  break;

              // ALUMNI
              case 'searchAlumni':
                  botResponse = { role: 'bot', text: 'Anda dapat mencari teman seangkatan atau berdasarkan profesi di Direktori Alumni (Login diperlukan).', link: '/peta-alumni', linkText: 'Cari Alumni' };
                  break;
              case 'showAlumniAchievements':
                  botResponse = { role: 'bot', text: 'Banyak alumni kita yang berprestasi! Baca kisah inspiratif mereka di Jejak Alumni.', link: '/kolom-alumni', linkText: 'Baca Jejak Alumni' };
                  break;

              // LAPAK
              case 'registerAlumniShop':
                  botResponse = { role: 'bot', text: 'Punya usaha? Daftarkan segera di Lapak Alumni agar semakin dikenal sesama alumni.', link: '/lapak-alumni', linkText: 'Daftar Lapak' };
                  break;
              case 'exploreAlumniShop':
                  botResponse = { role: 'bot', text: 'Cari kuliner, jasa, atau produk karya alumni di sini.', link: '/lapak-alumni', linkText: 'Jelajahi Lapak' };
                  break;

              // PROKER
              case 'showPrograms':
                  botResponse = { role: 'bot', text: 'Program unggulan kami meliputi Beasiswa Pendidikan, Mentoring Karir, dan Bakti Sosial.', link: '/tentang', linkText: 'Lihat Program' };
                  break;
              case 'showCollaboration':
                  botResponse = { role: 'bot', text: 'Tertarik berkolaborasi atau menjadi sponsor kegiatan? Hubungi admin kami.', link: 'https://wa.me/6281234567890', linkText: 'Hubungi Admin' };
                  break;

              // KONTAK
              case 'contactAdmin':
                  botResponse = { role: 'bot', text: 'Hubungi Admin via WhatsApp untuk respon cepat.', link: 'https://wa.me/6281234567890', linkText: 'Chat WhatsApp' };
                  break;
              case 'showFAQ':
                  botResponse = { role: 'bot', text: 'Pertanyaan umum seputar pendaftaran dan akun bisa dilihat di halaman FAQ.', link: '/faq', linkText: 'Buka FAQ' };
                  break;

              default: 
                  botResponse = { role: 'bot', text: 'Maaf, menu tersebut belum tersedia.', link: '', linkText: '' };
          }

          setMessages(prev => [...prev, botResponse as any]);
      }, 500);
  }

  const handleBack = () => {
    if (currentMenu.parent) {
        setCurrentMenuId(currentMenu.parent);
    }
  };

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        // Optional behavior
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatRef]);

  if (pathname?.startsWith('/admin')) {
      return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      
      {/* 1. Chatbot Widget Window */}
      {isChatOpen && (
          <div ref={chatRef} className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-fade-in-up mb-4 h-[550px]">
              {/* Header */}
              <div className="bg-[#1E40AF] p-4 flex justify-between items-center text-white shrink-0">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <FaRobot size={20} />
                      </div>
                      <div>
                          <h3 className="font-bold">Asisten IKASMANDA</h3>
                          <p className="text-xs text-blue-200 flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online</p>
                      </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white transition-colors">
                      <FaTimes />
                  </button>
              </div>

              {/* Chat Body (Messages) */}
              <div ref={chatBodyRef} className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                  {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                              msg.role === 'user' 
                              ? 'bg-[#1E40AF] text-white rounded-tr-none' 
                              : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                          }`}>
                              <p className="whitespace-pre-line">{msg.text}</p>
                              
                              {/* Link Action inside bubble */}
                              {(msg as any).link && (
                                  <Link href={(msg as any).link}>
                                      <Button size="sm" className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-xs ring-1 ring-yellow-500">
                                          {(msg as any).linkText}
                                      </Button>
                                  </Link>
                              )}
                          </div>
                      </div>
                  ))}
                  
                  {/* Spacer for menu area */}
                  <div className="h-4"></div>
              </div>
              
              {/* Menu Options Area (Fixed at Bottom) */}
              <div className="bg-white border-t border-gray-100 p-3 shrink-0">
                  {/* Menu Header / Back Button */}
                  <div className="flex items-center justify-between mb-2">
                       {currentMenu.id !== 'main' ? (
                           <button onClick={handleBack} className="text-xs font-bold text-gray-500 hover:text-[#1E40AF] flex items-center gap-1">
                               <FaChevronLeft /> Kembali
                           </button>
                       ) : (
                           <span className="text-xs font-bold text-gray-400">Pilih Topik:</span>
                       )}
                       <span className="text-xs font-bold text-[#1E40AF]">{currentMenu.title}</span>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto">
                      {currentMenu.options.map((opt: any, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleMenuOptionClick(opt)}
                            className="text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-lg text-sm font-medium transition-colors flex justify-between items-center group border border-blue-100"
                          >
                              {opt.label}
                              {opt.target && <FaChevronRight className="opacity-50 group-hover:opacity-100 text-xs" />}
                          </button>
                      ))}
                  </div>

                  {/* Contextual CTA for current menu */}
                  {currentMenu.cta && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                           <Link href={currentMenu.cta.link}>
                                <button className="w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-[#1E40AF] transition-colors flex items-center justify-center gap-1">
                                    {currentMenu.cta.text} <FaChevronRight size={10} />
                                </button>
                           </Link>
                      </div>
                  )}
              </div>
              
              {/* Footer */}
              <div className="p-2 bg-gray-50 border-t border-gray-200 text-center text-[10px] text-gray-400">
                  Powered by IKASMANDA Dev Team
              </div>
          </div>
      )}

      {/* 2. Expanded Actions */}
      {isOpen && (
        <div className="flex flex-col gap-3 items-end animate-fade-in mb-2">
            {/* WhatsApp */}
            <Link 
              href="https://wa.me/6281234567890?text=Halo%20Admin%20IKASMANDA,%20saya%20ingin%20bertanya..." 
              target="_blank"
              className="group flex items-center gap-3"
            >
                <div className="bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Hubungi Admin
                </div>
                <div className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#20bd5a] transition-colors cursor-pointer transform hover:scale-110">
                    <FaWhatsapp size={28} />
                </div>
            </Link>

            {/* Chatbot Trigger */}
            <div className="group flex items-center gap-3" onClick={toggleChat}>
                <div className="bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Tanya Asisten
                </div>
                <div className="w-14 h-14 bg-[#3B82F6] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#2563EB] transition-colors cursor-pointer transform hover:scale-110">
                    <FaRobot size={24} />
                </div>
            </div>
        </div>
      )}

      {/* 3. Main Toggle Button */}
      {!isChatOpen && (
          <button 
            onClick={toggleMenu}
            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 z-50 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-[#1E40AF]'}`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={28} />}
          </button>
      )}
    </div>
  );
}
