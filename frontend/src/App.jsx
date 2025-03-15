import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Pages/Home';
import Contests from '../Pages/Contests';
import Youtubelinks from '../Pages/Youtubelinks';
import './index.css';
import Navbar from '../components/Navbar';

function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests" element={<Contests />} />
        <Route path='/youtubelinks' element={<Youtubelinks/>} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
