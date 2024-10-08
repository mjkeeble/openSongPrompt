import { Demo, Gigs, Repertoire, Setlist, Song } from '@components/index';
import { SetlistProvider, SongsProvider } from '@context/index';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div id="App" className="cursor-none overflow-y-hidden text-bj-white">
      <SetlistProvider>
        <SongsProvider>
          <Routes>
            <Route path="/" element={<Gigs />} />
            <Route path="demo/" element={<Demo />} />
            <Route path="song/:id" element={<Song />} />
            <Route path="setlist/" element={<Setlist />} />
            <Route path="setlist/:id" element={<Setlist />} />
            <Route path="repertoire/" element={<Repertoire />} />
          </Routes>
        </SongsProvider>
      </SetlistProvider>
    </div>
  );
}

export default App;
