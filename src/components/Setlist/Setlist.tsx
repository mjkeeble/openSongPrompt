import { useSetlist, useSongs } from '@context/index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavIndicator, SongListButton } from '..';
import { BREAK, footswitch } from '../../const';
import { TBreak, TGig, TSong } from '../../types';
import { displayDate, flattenSetlist } from '../../utils';
import { fetchGig, fetchSongs } from './utils';

const Setlist = () => {
  const { id } = useParams<{ id: string }>();
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const { songs, setSongDetails } = useSongs();
  const { setlist, setSetlist } = useSetlist();
  const [gig, setGig] = useState<TGig>();
  

  useEffect(() => {
    console.log('*********** useEffect - fetch gig ***********');

    const fetchAndSetGig = async () => {
      try {
        const getGig = await fetchGig(id!);
        if (getGig) {
          setGig(getGig);
          setSetlist(flattenSetlist(getGig.setlist));
        }
        return;
      } catch (error) {
        console.error('Error fetching gig:', error);
        return null;
      }
    };

    fetchAndSetGig();
  }, [id]);

  useEffect(() => {
    const getAndSetSongs = async () => {
      console.log('🚀 -----------------------------------------🚀');
      console.log('🚀 => getAndSetSongs => setlist:', setlist);
      console.log('🚀 -----------------------------------------🚀');
      const songIds = setlist.filter((id) => id !== BREAK);
      const songList = await fetchSongs(songIds);
      if (songList) {
        setSongDetails(songList);
      }
    };
    try {
      getAndSetSongs();
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }, [setlist, setSongDetails]);

  useEffect(() => {
    if (buttonsRef.current[0]) {
      buttonsRef.current[0].focus();
    }
  }, []);

  const handleKeyDown = (event: { key: string }) => {
    // if (isLoaded) {
    const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
    if (event.key === footswitch.centreShort) {
      buttonsRef.current[currentIndex].click();
    } else if (event.key === footswitch.leftShort && currentIndex > 0) {
      buttonsRef.current[currentIndex - 1].focus();
      buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (event.key === footswitch.rightShort) {
      if (currentIndex < buttonsRef.current.length - 1) {
        buttonsRef.current[currentIndex + 1].focus();
        buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (endOfListRef.current) {
        endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      // }
    }
  };

  const endOfListRef = useRef<HTMLDivElement | null>(null);
  if (gig && setlist && songs) {
    return (
      <div>
        <div onKeyDown={handleKeyDown} tabIndex={0}>
          <h1 className="my-5 font-fredericka text-7xl text-bj-white">Set List</h1>
          <h3>
            {displayDate(gig.dateTime)}, {gig.venue}, {gig.town}
          </h3>

          <ul className="mb-20 mt-8">
            {setlist.map((songId: number | TBreak, index) => {
              if (songId === BREAK)
                return (
                  <li key={index}>
                    <SongListButton
                      ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                      classes="bg-bj-blue"
                      onclick={() => Navigate(`/song/${index}`)}
                      title="BREAK"
                    />
                  </li>
                );

                const song: TSong | undefined = songs.find((song) => Number(song.id) === songId);
              console.log("🚀 ---------------------------------------🚀");
              console.log("🚀 => {setlist.map => song:", song);
              console.log("🚀 ---------------------------------------🚀");
              if (!song) {
                return (
                  <li key={index}>
                    <p className="text-bj-red">
                      <em>SONG NOT FOUND!!</em>
                    </p>
                  </li>
                );
              }

              return (
                <li key={index}>
                  <SongListButton
                    ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                    classes=""
                    onclick={() => Navigate(`/song/${index}`)}
                    title={song.title}
                    version={song.version}
                  />
                </li>
              );
            })}

            <div ref={endOfListRef} />
          </ul>
        </div>
        <NavIndicator leftShort="up" centreShort="point" rightShort="down" />
      </div>
    );
  }

  return <NavIndicator leftShort="up" centreShort="point" rightShort="down" />;
};

export default Setlist;
