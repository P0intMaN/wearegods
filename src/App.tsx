import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ChapterReader from './pages/ChapterReader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:phaseId/:chapterId" element={<ChapterReader />} />
      </Routes>
    </Router>
  );
}

export default App;
