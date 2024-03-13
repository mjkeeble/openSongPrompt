import React, { useEffect, useState } from 'react';

type TProps = {
  tempo: number;
  timeSignature: string;
  duration: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  finalPage: boolean;
};

const ProgressBar: React.FC<TProps> = ({tempo, timeSignature, duration, currentPage, setCurrentPage, finalPage}) => {
  console.log("🚀 -------------------------🚀");
  console.log("🚀 => duration:", duration);
  console.log("🚀 => timeSignature:", timeSignature);
  console.log("🚀 => tempo:", tempo);
  console.log("🚀 -------------------------🚀");
  
  const [progress, setProgress] = useState(0);
  const adjustedDuration = currentPage === 1 ? duration - 1 : duration;
  

  const barLength: number = ['3/4', '6/8'].includes(timeSignature) ? 3 : 4;
 
  const pageDurationMs: number = (60000 / tempo) * adjustedDuration * barLength;
  console.log("🚀 -------------------------------------🚀");
  console.log("🚀 => pageDurationMs:", pageDurationMs);
  console.log("🚀 -------------------------------------🚀");

  useEffect(() => {
    let timerID: NodeJS.Timeout;

    if (!finalPage && pageDurationMs > 0) {
      const interval = 10; // Update interval in milliseconds
      const increment = (interval / pageDurationMs) * 100; // Progress increment

      timerID = setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress >= 100) {
            if (!finalPage) {
              setCurrentPage(currentPage + 1);
            }
            return 0;
          } else {
            return currentProgress + increment;
          }
        });
      }, interval);
    }

    // Cleanup the interval on unmount or when the currentPage changes
    return () => {
      if (timerID) {
        clearInterval(timerID);
      }
    };
  }, [currentPage, finalPage, pageDurationMs, setCurrentPage, tempo]);

  // Adding a key prop to force reinitialization of the component when currentPage changes
  return (
    <div key={currentPage} className="h-6 w-full p-4">
      <div
        className={`h-6 transition-all duration-300 ease-linear ${progress < 90 ? 'bg-bj-blue-light' : 'bg-bj-green-light'}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
