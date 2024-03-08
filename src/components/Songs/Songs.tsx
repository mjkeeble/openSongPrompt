import  { useEffect, useState } from 'react';
import {TInternalGig} from '../../types';
import songs from '../../../data/songs.json';



const Songs = ({ gig }: { gig: TInternalGig }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentItemId = gig.setlist[currentSongIndex];
  const currentItemIsPause = currentItemId === null;
  const currentSong = currentItemIsPause ? null : songs.find((song) => song.id.toString() === currentItemId);

  



  // Use useEffect to attach and detach the event listener
  useEffect(() => {
  const goToPrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      const previousItemId = gig.setlist[currentSongIndex - 1];
      const previousItemIsPause = previousItemId === null;
      const previousSong = previousItemIsPause ? null : songs.find((song) => song.title === previousItemId);
      setCurrentPageIndex(previousSong ? previousSong.pages.length - 1 : 0);
    }
  };
    
    const goToNext = () => {
      if (currentSong && currentPageIndex < currentSong.pages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else if (currentSongIndex < gig.setlist.length - 1) {
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
  }, [currentSongIndex, currentPageIndex, gig.setlist, currentSong]); // Make sure to include dependencies

  return (
    <div>
      {currentItemIsPause ? (
        <p>Pause</p>
      ) : (
        <div>
          <h2>{currentSong?.title}</h2>
          {/* Display logic for song's metadata, effects, amp settings, and pages */}
        </div>
      )}
      {/* Removed buttons in favor of key press navigation */}
    </div>
  );
};

export default Songs;
