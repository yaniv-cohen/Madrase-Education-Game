// import logo from './logo.svg';
import './App.css';
import Layout from './pages/Layout';
// import Connect from './pages/Connect';

import { Routes, Route } from 'react-router-dom';
import Teacher from './pages/Teacher';
import Student from './pages/Student';
function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}></Route>
      {/* <Route path="rows" element={<Connect/>}></Route> */}
      <Route path="student" element={<Student />}></Route>
      <Route path="teacher" element={<Teacher />}></Route>
    </Routes>

  );
}

export default App;
