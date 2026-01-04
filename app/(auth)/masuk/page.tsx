"use client";
import { toast } from 'react-hot-toast';

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Media Informasi",
      desc: "Menampilkan informasi kegiatan alumni, berita, agenda, info loker, dan juga artikel dari alumni",
      image: "/reuni-akbar.jpg"
    },
    {
      title: "Direktori Alumni",
      desc: "Menampilkan database alumni, fitur kirim artikel, agenda, info loker, dan juga membuat lapak alumni",
      image: "/peduli-pendidikan.jpg"
    },
    {
        title: "Lapak Alumni",
        desc: "Menampilkan direktori peta yang berisi lokasi bisnis milik alumni beserta informasi di dalamnya.",
        image: "/donasi-campaign.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.username, // Using 'email' param but labeling as username for user
        password: formData.password,
      });

      if (res?.error) {
        setError("Nama Pengguna atau Sandi salah.");
        toast.error("Nama Pengguna atau Sandi salah.");
        setLoading(false);
      } else {
        toast.success("Login berhasil!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setError("Terjadi kesalahan sistem.");
      toast.error("Terjadi kesalahan sistem.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                 <Link href="/">
                    <img src="/logo.png" alt="IKA SMANDA" className="h-20 w-auto mx-auto mb-4" />
                 </Link>
                 <h2 className="text-2xl font-bold text-gray-900 uppercase font-bebas tracking-wide text-3xl">Masuk ke akun kamu</h2>
                 <p className="mt-2 text-sm text-gray-500">
                    Selamat datang di website resmi IKASMAN1K, silahkan masukkan kredensial kamu untuk menikmati fitur khusus untuk para Alumni
                 </p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nama Pengguna</label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Nama Pengguna / Email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                         <div className="relative mt-1">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Sandi"
                                required
                                className="block w-full rounded-md border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF] pr-10"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-[#1E40AF] focus:ring-[#1E40AF] border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Ingat Saya
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link href="/lupa-password" className="font-medium text-[#1E40AF] hover:text-[#112F82]">
                            Lupa Sandi?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#1E40AF] hover:bg-[#112F82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E40AF] uppercase tracking-wider"
                    >
                        {loading ? "Memproses..." : "Masuk"}
                    </Button>
                </div>
                
                <div className="text-center mt-4">
                    <span className="text-sm text-gray-600">Belum punya akun? </span>
                    <Link href="/daftar" className="text-sm font-bold text-[#1E40AF] hover:underline">
                        Daftar
                    </Link>
                </div>
            </form>
        </div>
      </div>

      {/* Right Side - Image Carousel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden group">
         {slides.map((slide, idx) => (
             <div 
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
             >
                 {/* Image Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF] via-[#1E40AF]/40 to-transparent z-20"></div>
                 <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[10s]"
                 />
                 
                 <div className="absolute bottom-32 left-0 right-0 p-16 z-30 text-white">
                      <div className="mb-6">
                          <img src="/logo.png" alt="Logo White" className="h-20 w-auto brightness-0 invert" />
                      </div>
                      <h2 className="text-6xl font-black font-bebas tracking-wider mb-4 drop-shadow-2xl">
                          {slide.title}
                      </h2>
                      <p className="text-xl text-blue-50 font-medium leading-relaxed max-w-lg drop-shadow-lg">
                          {slide.desc}
                      </p>
                 </div>
             </div>
         ))}

         {/* Navigation Dots */}
         <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-3 z-40">
            {slides.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                        currentSlide === idx ? "bg-yellow-400 w-12" : "bg-white/30 w-6 hover:bg-white/50"
                    }`}
                />
            ))}
         </div>

         {/* Navigation Arrows */}
         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-white"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-white"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
         </div>
      </div>
    </div>
  );
}
