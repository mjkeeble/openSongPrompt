import { Gigs, Setlist, Song, Repertoire } from '@components/index';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div id="App" className="h-full text-bj-white">
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="song/:id" element={<Song />} />
        <Route path="setlist/" element={<Setlist />} />
        <Route path="setlist/:id" element={<Setlist />} />
        <Route path="repertoire/" element={<Repertoire />} />
      </Routes>
    </div>
  );
}

export default App;
