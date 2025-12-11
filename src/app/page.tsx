import HistorySection from '@/components/HistorySection';
import { getMKList } from '@/lib/data';
import Link from 'next/link';

export default async function HomePage() {
  const mkList = await getMKList();

  return (
    <main className='container mx-auto px-4 py-8 max-w-4xl'>
      <header className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Universitas Terbuka - UAS KOCAK
        </h1>
        <p className='text-lg text-gray-600'>
          Select a course (Mata Kuliah) to begin practicing.
        </p>
      </header>
      <HistorySection />
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {mkList.map((mk) => (
          <Link
            key={mk.code}
            href={`/mk/${mk.code}`}
            className='block group h-full'>
            <article className='h-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all'>
              <div className='flex items-center justify-between mb-4'>
                <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded'>
                  {mk.code}
                </span>
              </div>
              <h2 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-primary'>
                {mk.title}
              </h2>
              <p className='text-gray-600 text-sm line-clamp-3'>
                {mk.description || 'No description available.'}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
