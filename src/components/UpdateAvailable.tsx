import { useHasNewDeploy } from 'next-deploy-notifications';
import { useEffect, useState } from 'react';

export default function UpdateAvailable({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { hasNewDeploy } = useHasNewDeploy();

  useEffect(() => {
    if (hasNewDeploy) {
      setIsOpen(true);
    }
  }, [hasNewDeploy]);

  if (!isOpen) return null;

  return (
    <div
      id='toast-interactive'
      className={
        'w-full max-w-xs rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400 ' +
        className
      }
      role='alert'
    >
      <div className='flex'>
        <div className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300'>
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <div className='ml-3 text-sm font-normal'>
          <span className='mb-1 text-sm font-semibold text-gray-900 dark:text-white'>
            Update available
          </span>
          <div className='mb-2 text-sm font-normal'>
            A new version is available. Please refresh the page to update.
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <a
                href='#'
                className='inline-flex w-full justify-center rounded-lg bg-blue-600 px-2 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Update
              </a>
            </div>
            <div>
              <a
                href='#'
                className='inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-center text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Not now
              </a>
            </div>
          </div>
        </div>
        <button
          type='button'
          className='-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white'
          data-dismiss-target='#toast-interactive'
          aria-label='Close'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <span className='sr-only'>Close</span>
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
