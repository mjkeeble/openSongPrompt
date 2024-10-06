import { Demo, Gigs, Repertoire, Setlist, Song } from '@components/index';
import { setlistContext, songsContext } from '@context/index';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TSetlist, TSong } from './types';

function App() {
  const [setlist, setSetlist] = useState<TSetlist>([]);
  const [songs, setSongDetails] = useState<TSong[]>([]);
  return (
    <div id="App" className="cursor-none overflow-y-hidden text-bj-white">
      <setlistContext.Provider value={{ setlist, setSetlist }}>
        <songsContext.Provider value={{ songs, setSongDetails }}>
          <Routes>
            <Route path="/" element={<Gigs />} />
            <Route path="demo/" element={<Demo />} />
            <Route path="song/:id" element={<Song />} />
            <Route path="setlist/" element={<Setlist />} />
            <Route path="setlist/:id" element={<Setlist />} />
            <Route path="repertoire/" element={<Repertoire />} />
          </Routes>
        </songsContext.Provider>
      </setlistContext.Provider>
    </div>
  );
}

export default App;
