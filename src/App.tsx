import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ArtistsView from './views/Artists/Artists.View';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CoverFlow from './components/CoverFlow/CoverFlow';
import MainView from './views/Main/Main.View';
import SettingsView from './views/Settings/Settings.View';


const App = () => {

  return (
    <Router>
      <Navbar/>
      <SearchBar></SearchBar>
      <Routes>
        <Route path='/' element={<MainView/>}/>
        <Route path='/artists' element={<ArtistsView/>} />
        <Route path='/favourites' element={<CoverFlow/>} />
        <Route path='/settings' element={<SettingsView/>}/>
      </Routes>
    </Router>
  );
};

export default App;