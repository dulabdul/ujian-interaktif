import { getRandomQuestions, getMKByCode } from '@/lib/data';
import { notFound } from 'next/navigation';
import ExamClient from './ExamClient';

interface PageProps {
  params: Promise<{ mkCode: string; count: string }>;
}

export default async function ExamPage({ params }: PageProps) {
  const { mkCode, count } = await params;
  const questionCount = parseInt(count, 10);

  // Ambil soal acak sesuai jumlah
  const questions = await getRandomQuestions(mkCode, questionCount);
  const mk = await getMKByCode(mkCode);

  if (!questions.length || !mk) return notFound();

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 max-w-2xl'>
        <ExamClient
          questions={questions}
          mkCode={mkCode}
          mkTitle={mk.title}
        />
      </div>
    </main>
  );
}
