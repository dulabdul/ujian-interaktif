'use client';
import { useState } from 'react';
import { Question } from '@/types';
import { Button } from '@/components/UI/Button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  question: Question;
  // UPDATE: onNext sekarang menerima index jawaban juga
  onNext: (isCorrect: boolean, selectedIdx: number | null) => void;
  isLast: boolean;
}

export const QuestionCard = ({ question, onNext, isLast }: Props) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
  };

  const handleNextClick = () => {
    const correct = selectedIdx === question.correctIndex;

    // Reset state lokal (opsional karena key React di parent akan me-reset komponen)
    setSelectedIdx(null);
    setIsSubmitted(false);

    // UPDATE: Kirim 'correct' status DAN 'selectedIdx' ke parent
    onNext(correct, selectedIdx);
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      {/* Use semantic tags for accessibility */}
      <h3 className='text-xl font-semibold text-gray-900 mb-6'>
        {question.question}
      </h3>

      <div
        className='space-y-3'
        role='radiogroup'>
        {question.options.map((opt, idx) => {
          let stateStyles =
            'border-gray-200 hover:border-blue-300 hover:bg-blue-50';

          if (isSubmitted) {
            if (idx === question.correctIndex) {
              stateStyles =
                'border-green-500 bg-green-50 ring-1 ring-green-500';
            } else if (idx === selectedIdx && idx !== question.correctIndex) {
              stateStyles = 'border-red-500 bg-red-50 ring-1 ring-red-500';
            } else {
              stateStyles = 'border-gray-100 opacity-50';
            }
          } else if (selectedIdx === idx) {
            stateStyles = 'border-primary bg-blue-50 ring-1 ring-primary';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${stateStyles}`}
              role='radio'
              aria-checked={selectedIdx === idx}>
              <div className='flex items-center justify-between'>
                <span>{opt}</span>
                {isSubmitted && idx === question.correctIndex && (
                  <CheckCircle2 className='w-5 h-5 text-green-600' />
                )}
                {isSubmitted &&
                  idx === selectedIdx &&
                  idx !== question.correctIndex && (
                    <XCircle className='w-5 h-5 text-red-600' />
                  )}
              </div>
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2'>
          <p className='font-semibold text-gray-900 mb-1'>Explanation:</p>
          <p className='text-gray-700'>{question.explanation}</p>
        </div>
      )}

      <div className='mt-8 flex justify-end'>
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedIdx === null}>
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextClick}
            variant='primary'>
            {isLast ? 'Finish Exam' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
};
