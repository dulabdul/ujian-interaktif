'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';
import { saveHistory } from '@/utils/storage';
import { Question } from '@/types'; // Import tipe Question
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'; // Import icons

interface Props {
  score: number;
  total: number;
  mkCode: string;
  modulId: string;
  modulTitle: string;
  questions: Question[]; // Tambahan: Data soal
  userAnswers: (number | null)[]; // Tambahan: Jawaban user (index opsi)
}

export const ResultSummary = ({
  score,
  total,
  mkCode,
  modulId,
  modulTitle,
  questions,
  userAnswers,
}: Props) => {
  const percentage = Math.round((score / total) * 100);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (hasSaved.current) return;
    saveHistory({
      mkCode,
      modulId,
      modulTitle,
      score,
      total,
      date: new Date().toISOString(),
    });
    hasSaved.current = true;
  }, [mkCode, modulId, modulTitle, score, total]);

  return (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* 1. Bagian Skor (Header) */}
      <div className='text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
          Exam Completed!
        </h2>
        <div className='mb-6'>
          <div
            className={`text-6xl font-black mb-2 ${
              percentage >= 70 ? 'text-green-600' : 'text-primary'
            }`}>
            {percentage}%
          </div>
          <p className='text-gray-600'>
            You answered {score} out of {total} correctly.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link href={`/mk/${mkCode}`}>
            <Button
              variant='outline'
              className='w-full sm:w-auto'>
              Back to Modules
            </Button>
          </Link>
          <Button
            onClick={() => window.location.reload()}
            className='w-full sm:w-auto'>
            Retake Exam
          </Button>
        </div>
      </div>

      {/* 2. Bagian Review Jawaban */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        <div className='p-6 border-b border-gray-200 bg-gray-50'>
          <h3 className='text-xl font-bold text-gray-900'>Review Answers</h3>
        </div>

        <div className='divide-y divide-gray-100'>
          {questions.map((q, idx) => {
            const userAnswerIdx = userAnswers[idx];
            const isCorrect = userAnswerIdx === q.correctIndex;
            const isSkipped = userAnswerIdx === null;

            return (
              <div
                key={q.id}
                className='p-6 hover:bg-gray-50 transition-colors'>
                <div className='flex gap-4'>
                  {/* Icon Status */}
                  <div className='mt-1 flex-shrink-0'>
                    {isCorrect ? (
                      <CheckCircle2 className='w-6 h-6 text-green-500' />
                    ) : (
                      <XCircle className='w-6 h-6 text-red-500' />
                    )}
                  </div>

                  <div className='flex-grow'>
                    <p className='font-medium text-gray-900 mb-3'>
                      {idx + 1}. {q.question}
                    </p>

                    <div className='space-y-2 text-sm'>
                      {/* Opsi Jawaban */}
                      {q.options.map((opt, optIdx) => {
                        let style = 'p-3 rounded-lg border ';

                        if (optIdx === q.correctIndex) {
                          // Jawaban Benar (Selalu Hijau)
                          style +=
                            'bg-green-50 border-green-200 text-green-800 font-medium ring-1 ring-green-500';
                        } else if (optIdx === userAnswerIdx && !isCorrect) {
                          // Jawaban Salah User (Merah)
                          style +=
                            'bg-red-50 border-red-200 text-red-800 ring-1 ring-red-500';
                        } else {
                          // Opsi Netral
                          style += 'bg-white border-gray-200 text-gray-500';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={style}>
                            {opt}
                            {optIdx === q.correctIndex && (
                              <span className='float-right text-xs font-bold uppercase tracking-wide text-green-600'>
                                Correct Answer
                              </span>
                            )}
                            {optIdx === userAnswerIdx && !isCorrect && (
                              <span className='float-right text-xs font-bold uppercase tracking-wide text-red-600'>
                                Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Penjelasan */}
                    <div className='mt-4 flex gap-3 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm'>
                      <AlertCircle className='w-5 h-5 flex-shrink-0' />
                      <div>
                        <span className='font-bold block mb-1'>
                          Explanation:
                        </span>
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
