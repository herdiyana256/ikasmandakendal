import { 
  FaUserGraduate, 
  FaNewspaper, 
  FaStore, 
  FaHandHoldingHeart, 
  FaCalendarAlt, 
  FaBriefcase 
} from 'react-icons/fa';

const features = [
  {
    name: 'Direktori Alumni',
    description: 'Temukan teman lama dan bangun jejaring profesional dengan alumni lintas angkatan.',
    icon: FaUserGraduate,
    color: 'bg-blue-500', 
  },
  {
    name: 'Kabar & Berita',
    description: 'Update informasi terbaru seputar kegiatan alumni dan sekolah tercinta.',
    icon: FaNewspaper,
    color: 'bg-green-500',
  },
  {
    name: 'Lapak Alumni',
    description: 'Promosikan usaha Anda dan dukung bisnis sesama alumni.',
    icon: FaStore,
    color: 'bg-yellow-500',
  },
  {
    name: 'Donasi',
    description: 'Salurkan bantuan untuk almamater dan kegiatan sosial alumni.',
    icon: FaHandHoldingHeart,
    color: 'bg-red-500',
  },
  {
    name: 'Agenda Kegiatan',
    description: 'Jangan lewatkan event reuni, gathering, dan kegiatan sosial lainnya.',
    icon: FaCalendarAlt,
    color: 'bg-purple-500',
  },
  {
    name: 'Info Loker',
    description: 'Informasi lowongan kerja eksklusif dari dan untuk alumni.',
    icon: FaBriefcase,
    color: 'bg-indigo-500',
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Fitur Unggulan</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Satu Platform, Berjuta Manfaat
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Website IKA SMANDA KENDAL hadir dengan berbagai fitur untuk memudahkan komunikasi dan kolaborasi antar alumni.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md text-white ${feature.color}`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
