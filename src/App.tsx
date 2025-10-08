import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Turma from './pages/Turma';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turma/:id" element={<Turma />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
