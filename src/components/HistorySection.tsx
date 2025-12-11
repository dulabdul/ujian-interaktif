'use client';

import { useEffect, useState } from 'react';
import { ExamHistoryItem } from '@/types';
import { getHistory } from '@/utils/storage';
import Link from 'next/link';

export default function HistorySection() {
  const [history, setHistory] = useState<ExamHistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(getHistory());
    setMounted(true);
  }, []);

  // Jangan render apapun di server (menghindari hydration mismatch)
  if (!mounted) return null;

  if (history.length === 0) return null; // Sembunyikan kalau belum ada history

  return (
    <section className='mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <h2 className='text-2xl font-bold text-gray-900 mb-4'>Recent Activity</h2>
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-gray-50 text-gray-600 font-medium border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3'>Date</th>
                <th className='px-6 py-3'>Course</th>
                <th className='px-6 py-3'>Module</th>
                <th className='px-6 py-3'>Score</th>
                <th className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {history.map((item, idx) => {
                const percentage = Math.round((item.score / item.total) * 100);
                const isPass = percentage >= 70; // Logic lulus sederhana

                return (
                  <tr
                    key={idx}
                    className='hover:bg-gray-50'>
                    <td className='px-6 py-3 text-gray-500'>
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-3 font-medium text-gray-900'>
                      {item.mkCode}
                    </td>
                    <td className='px-6 py-3 text-gray-600'>
                      {item.modulTitle}
                    </td>
                    <td className='px-6 py-3'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isPass
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {item.score}/{item.total} ({percentage}%)
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <Link
                        // Jika modulId 'random', arahkan ke /exam/total_soal, jika tidak anggap modul lama
                        href={
                          item.modulId === 'random'
                            ? `/mk/${item.mkCode}/exam/${item.total}`
                            : `/mk/${item.mkCode}/modul/${item.modulId}` // Fallback untuk history lama (kalau masih ada)
                        }
                        className='text-primary hover:text-blue-700 font-medium'>
                        Retake
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
