import  { useEffect, useState } from 'react';
import {TGig} from '../../../types';

// Your component remains largely the same, with the addition of useEffect for keydown event handling

const GigViewer = ({ gig }: { gig: TGig }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentItemId = gig.setList[currentSongIndex];
  const currentItemIsPause = currentItemId === null;
  const currentSong = currentItemIsPause ? null : songs.find((song) => song.meta.title === currentItemId);

  



  // Use useEffect to attach and detach the event listener
  useEffect(() => {
  const goToPrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      const previousItemId = gig.setList[currentSongIndex - 1];
      const previousItemIsPause = previousItemId === null;
      const previousSong = previousItemIsPause ? null : songs.find((song) => song.meta.title === previousItemId);
      setCurrentPageIndex(previousSong ? previousSong.pages.length - 1 : 0);
    }
  };
    
    const goToNext = () => {
      if (currentSong && currentPageIndex < currentSong.pages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else if (currentSongIndex < gig.setList.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
        setCurrentPageIndex(0); // Reset for next song
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'l') {
        goToNext();
      } else if (event.key === 'k') {
        goToPrevious();
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSongIndex, currentPageIndex, gig.setList, currentSong]); // Make sure to include dependencies

  return (
    <div>
      {currentItemIsPause ? (
        <p>Pause</p>
      ) : (
        <div>
          <h2>{currentSong?.meta.title}</h2>
          {/* Display logic for song's metadata, effects, amp settings, and pages */}
        </div>
      )}
      {/* Removed buttons in favor of key press navigation */}
    </div>
  );
};

export default GigViewer;
