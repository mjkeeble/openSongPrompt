import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Gigs, ScreenSaver, SetList, Song } from './components';

function App() {
  return (
    <div id="App" className="h-full text-bj-white">
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="song/:id" element={<Song />} />
        <Route path="screensaver" element={<ScreenSaver />} />
        <Route path="setlist/:id" element={<SetList />} />
      </Routes>
    </div>
  );
}

export default App;
