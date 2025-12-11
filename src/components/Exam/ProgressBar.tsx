interface Props {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: Props) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div
      className='w-full mb-6'
      role='progressbar'
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}>
      <div className='flex justify-between text-sm text-gray-600 mb-1'>
        <span>
          Question {current} of {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className='h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
        <div
          className='h-full bg-primary transition-all duration-300 ease-out'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
