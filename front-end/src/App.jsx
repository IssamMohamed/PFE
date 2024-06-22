import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Home';
import Employee from './assets/Employer';
import Director from './assets/Derecteur';
import ChefGroup from './assets/ChefGroup';
import Admin from './assets/Admin';

function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="/director/:id" element={<Director />} />
        <Route path="/chef-group/:id" element={<ChefGroup />} />
        <Route path="/admine/:id" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
