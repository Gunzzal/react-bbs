import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './bbs/component/pages/HomePage';
import BbsWirtePage from './bbs/component/pages/BbsWirtePage';
import { useNavigate } from 'react-router-dom';
import BbsViewPage from './bbs/component/pages/BbsViewPage';

function Header() {
  const navigate = useNavigate();
  return (
    <h2 onClick={() => navigate('/')}>
      React BBS Project
    </h2>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/bbs-write" element={<BbsWirtePage/>}></Route>
        {/* <Route path="/bbs-fixe/:id" element={<BbsWirtePage/>}></Route> */}
        <Route path="/bbs-fixe" element={<BbsWirtePage/>}></Route>
        <Route path="/bbs-view/:id" element={<BbsViewPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
