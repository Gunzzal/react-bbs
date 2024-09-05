import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import BbsViewPage from './bbs/component/pages/BbsViewPage';
import BbsWirtePage from './bbs/component/pages/BbsWirtePage';
import ForecastWritePage from './bbs/component/pages/ForecastWritePage';
import ForecastViewPage from './bbs/component/pages/ForecastViewPage';
import HomePage from './bbs/component/pages/HomePage';

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
        <Route path="/forecast-write" element={<ForecastWritePage/>}></Route>
        <Route path="/forecast-view" element={<ForecastViewPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
