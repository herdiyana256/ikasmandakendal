export default function AdminAnalyticsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Analytics & Statistik</h1>
            <p className="text-gray-600 mb-8">Data statistik mendalam tentang alumni dan aktivitas website.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow h-64 flex items-center justify-center text-gray-400">Chart Placeholder User Growth</div>
                <div className="bg-white p-6 rounded shadow h-64 flex items-center justify-center text-gray-400">Chart Placeholder Content Views</div>
             </div>
        </div>
    )
}
