import connectDB from '@/lib/db';
import AdminLog from '@/models/AdminLog';
import { Card } from '@/components/ui/Card';

export default async function AdminLogsPage() {
  await connectDB();
  const logs = await AdminLog.find({}).populate('admin_id').sort({ createdAt: -1 });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
      <div className="space-y-4">
        {logs.map((log) => (
           <div key={log._id.toString()} className="bg-white p-4 rounded shadow text-sm">
               <p>
                  <span className="font-bold text-blue-600">{(log.admin_id as any)?.username || 'Unknown Admin'}</span> 
                  {' '}performed action{' '}
                  <span className="font-bold uppercase text-gray-700">{log.action}</span>
                  {' '}on{' '}
                  <span className="font-bold text-gray-700">{log.target_type}</span>
               </p>
               <p className="text-gray-500 text-xs mt-1">
                  {new Date(log.createdAt).toLocaleString()} | Details: {log.details || '-'}
               </p>
           </div>
        ))}
        {logs.length === 0 && <p className="text-gray-500">No logs found.</p>}
      </div>
    </div>
  );
}
