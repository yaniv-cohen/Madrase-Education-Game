import logo from './logo.svg';
import './App.css';
import Layout from './pages/Layout';
import Connect from './pages/Connect';
import Flashcards from './pages/Flashcards';

import { Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
<Route path="*" element={<Layout/>}></Route>
<Route path="connect" element={<Connect/>}></Route>
<Route path="flashcards" element={<Flashcards/>}></Route>
    </Routes>

  );
}

export default App;
