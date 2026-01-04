'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaFire } from 'react-icons/fa';

interface TickerItem {
  label: string;
  text: string;
  href?: string;
  icon?: string;
}

const NewsTicker = () => {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch('/api/berita/ticker');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data);
        }
      } catch (err) {
        console.error('Failed to fetch ticker:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicker();
    // Refresh every 5 minutes
    const interval = setInterval(fetchTicker, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || items.length === 0) return null;

  return (
    <div className="bg-[#1E40AF] text-white overflow-hidden py-2 border-b border-white/20 relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Static Label */}
        <div className="bg-yellow-400 text-blue-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shrink-0 mr-6 shadow-lg animate-pulse z-10">
          <FaFire className="text-red-600" /> LIVE UPDATE
        </div>

        {/* Scrolling Area */}
        <div className="flex-1 overflow-hidden relative group">
          <div className="flex animate-marquee hover:pause whitespace-nowrap gap-16 items-center py-1">
            {/* Double the items for seamless loop */}
            {[...items, ...items].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 group/item">
                <span className="inline-flex items-center gap-1.5">
                   <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-black text-yellow-300 uppercase tracking-tighter">
                      {item.icon} {item.label}
                   </span>
                   {item.href ? (
                     <Link href={item.href} className="text-sm font-bold hover:text-yellow-400 transition-colors">
                       {item.text}
                     </Link>
                   ) : (
                     <span className="text-sm font-bold">{item.text}</span>
                   )}
                </span>
                <span className="text-white/30 font-black px-4">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
