'use client';

import { useState } from 'react';
import { Question } from '@/types';
import { QuestionCard } from '@/components/Exam/QuestionCard';
import { ProgressBar } from '@/components/Exam/ProgressBar';
import { ResultSummary } from '@/components/Exam/ResultSummary';
import Link from 'next/link';

interface Props {
  questions: Question[];
  mkCode: string;
  mkTitle: string;
}

export default function ExamClient({ questions, mkCode, mkTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  const handleNext = (isCorrect: boolean, selectedIdx: number | null) => {
    setUserAnswers((prev) => [...prev, selectedIdx]);
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <ResultSummary
        score={score}
        total={total}
        mkCode={mkCode}
        modulId='random' // Flag khusus untuk history
        modulTitle={`Random Practice (${total} Questions)`}
        questions={questions}
        userAnswers={userAnswers}
      />
    );
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <Link
          href={`/mk/${mkCode}`}
          className='text-sm font-medium text-gray-500 hover:text-gray-900'>
          Quit Exam
        </Link>
        <span className='text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full truncate max-w-[200px]'>
          {mkTitle}
        </span>
      </div>

      <ProgressBar
        current={currentIndex + 1}
        total={total}
      />

      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onNext={handleNext}
        isLast={currentIndex === total - 1}
      />
    </div>
  );
}
