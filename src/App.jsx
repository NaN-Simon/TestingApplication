import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Score from './pages/Score';
import TestId from './pages/testId/TestId';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/test/:id" element={<TestId />} />
        <Route path='/score' element={<Score />} />
      </Routes>
    </>
  );
}

export default App;
