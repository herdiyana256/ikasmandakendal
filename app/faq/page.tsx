import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQPage() {
  const faqs = [
      {
          q: "Bagaimana cara mendaftar menjadi anggota IKASMAN1K?",
          a: "Anda dapat mendaftar dengan mengklik tombol 'Daftar' di pojok kanan atas. Isi formulir yang tersedia dengan data diri lengkap dan tahun kelulusan Anda."
      },
      {
          q: "Apakah ada biaya keanggotaan?",
          a: "Saat ini pendaftaran anggota IKASMAN1K tidak dipungut biaya (Gratis). Namun, untuk beberapa event khusus mungkin akan dikenakan biaya kontribusi."
      },
      {
          q: "Saya lupa password akun saya, apa yang harus dilakukan?",
          a: "Silakan klik tombol 'Masuk', lalu pilih 'Lupa Password?'. Masukkan email yang terdaftar, dan kami akan mengirimkan instruksi reset password ke email Anda."
      },
      {
          q: "Bagaimana cara memposting lowongan kerja atau lapak usaha?",
          a: "Setelah login, masuk ke menu Dashboard. Di sana terdapat opsi untuk 'Tambah Loker' atau 'Buka Lapak'. Data yang Anda kirimkan akan melalui proses moderasi admin sebelum tayang."
      },
      {
          q: "Siapa yang bisa mengakses Direktori Alumni?",
          a: "Demi privasi dan keamanan data, Direktori Alumni hanya dapat diakses oleh sesama alumni yang telah terdaftar dan login ke dalam sistem."
      }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-[#1E40AF] text-white py-20 text-center px-4">
           <h1 className="text-4xl md:text-5xl font-bold font-bebas mb-4">Pertanyaan Umum (FAQ)</h1>
           <p className="text-blue-100 max-w-2xl mx-auto text-lg">
               Temukan jawaban atas pertanyaan yang sering diajukan seputar IKASMAN1K.
           </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-6">
              {faqs.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                      <h3 className="flex items-start gap-4 text-lg font-bold text-gray-900 mb-3">
                          <FaQuestionCircle className="text-[#1E40AF] mt-1 shrink-0" />
                          {item.q}
                      </h3>
                      <p className="text-gray-600 leading-relaxed ml-9">
                          {item.a}
                      </p>
                  </div>
              ))}
          </div>

          <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Masih punya pertanyaan lain?</h3>
              <p className="text-gray-600 mb-6">Tim kami siap membantu Anda. Hubungi kami melalui kontak yang tersedia.</p>
              <Link href="https://wa.me/6281234567890">
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8">Hubungi WhatsApp Admin</Button>
              </Link>
          </div>
      </div>
    </div>
  );
}
