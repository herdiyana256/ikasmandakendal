"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    title: "IKA SMANDA KENDAL: Alumni Guyub, Berbagi, Berkarya",
    subtitle: "Wadah silaturahmi, sinergi alumni, dan kontribusi untuk almamater serta masyarakat.",
    desc: ""
  },
  {
    image: "/reuni-akbar.jpg",
    title: "Reuni Akbar 2025",
    subtitle: "Kembali Pulang, Menyambung Kenangan.",
    desc: "Persiapkan diri Anda untuk momen reuni terbesar tahun ini. Mari bertemu dan bernostalgia bersama."
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "Bersama Membangun Negeri",
    subtitle: "Sinergi Alumni untuk Indonesia.",
    desc: "Kolaborasi nyata para alumni di berbagai sektor untuk kemajuan bangsa dan almamater tercinta."
  },
  {
    image: "/peduli-pendidikan.jpg",
    title: "Beasiswa dan Mentoring Alumni",
    subtitle: "Dukung adik-adik kita di SMA Negeri 1 Kendal melalui program beasiswa dan bimbingan karir.",
    desc: "Wadah silaturahmi dan sinergi alumni SMA Negeri 1 Kendal untuk berkontribusi bagi almamater dan masyarakat."
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl text-white transform transition-all duration-700 translate-y-0">
              <h1 className="text-4xl md:text-6xl font-bold font-bebas mb-4 tracking-wider animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl font-serif italic mb-6 text-yellow-400">
                &quot;{slide.subtitle}&quot;
              </p>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                {slide.desc}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/daftar">
                   <Button className="bg-[#1E40AF] hover:bg-[#112F82] text-white font-bold px-8 py-6 rounded-full text-lg w-full md:w-auto">
                     Gabung Sekarang
                   </Button>
                </Link>
                <Link href="/tentang">
                   <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg w-full md:w-auto">
                     Tentang Kami
                   </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10 hidden md:block"
      >
        <FaChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10 hidden md:block"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-yellow-400 w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
