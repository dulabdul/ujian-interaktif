import { getMKByCode } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { PlayCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ mkCode: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { mkCode } = await params;
  const mk = await getMKByCode(mkCode);

  if (!mk) return notFound();

  const questionVariants = [20, 35, 50];

  return (
    <main className='container mx-auto px-4 py-8 max-w-2xl min-h-screen flex flex-col justify-center'>
      <div className='mb-12 text-center'>
        <Link
          href='/'
          className='text-sm text-gray-500 hover:text-primary mb-6 block'>
          &larr; Back to Dashboard
        </Link>
        <span className='bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block'>
          {mk.code}
        </span>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>{mk.title}</h1>
        <p className='text-gray-600 text-lg'>{mk.description}</p>
      </div>

      <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>
          Start Practice Exam
        </h2>
        <p className='text-gray-500 mb-8'>
          Select the number of questions you want to practice. Questions will be
          randomized from all modules.
        </p>

        <div className='grid gap-4'>
          {questionVariants.map((count) => (
            <Link
              key={count}
              href={`/mk/${mkCode}/exam/${count}`}
              className='w-full'>
              <Button
                variant='outline'
                className='w-full py-6 text-lg group hover:border-primary hover:bg-blue-50 transition-all flex items-center justify-between px-8'>
                <span className='font-semibold'>{count} Questions</span>
                <PlayCircle className='w-6 h-6 text-gray-400 group-hover:text-primary' />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
