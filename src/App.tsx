import { Demo, Gigs, Repertoire, Setlist, Song } from '@components/index';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div id="App" className="cursor-none text-bj-white overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="gigs/" element={<Gigs />} />
        <Route path="song/:id" element={<Song />} />
        <Route path="setlist/" element={<Setlist />} />
        <Route path="setlist/:id" element={<Setlist />} />
        <Route path="repertoire/" element={<Repertoire />} />
      </Routes>
    </div>
  );
}

export default App;
