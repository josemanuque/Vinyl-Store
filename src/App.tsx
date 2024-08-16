import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ArtistsView from './views/Artists/Artists.View';
import './App.css';
import MainView from './views/Main/Main.View';
import SettingsView from './views/Settings/Settings.View';
import AlbumDetailsView from './views/AlbumDetails/AlbumDetails.View';
import ArtistDetailsView from './views/ArtistDetails/ArtistDetails.View';
import AddVinylView from './views/AddVinyl/AddVinyl.View';
import AddArtistView from './views/AddArtist/AddArtist';
import EditArtistView from './views/EditArtist/EditArtist.View';
import EditVinylView from './views/EditVinyl/EditVinyl.View';


const App = () => {
  return (
    <Router>
      <Navbar/>
      {/* <SearchBar></SearchBar> */}
      <Routes>
        <Route path='/' element={<MainView/>}/>
        <Route path='/artists' element={<ArtistsView/>} />
        <Route path='/settings' element={<SettingsView/>}/>
        <Route path='/vinyls/:id' element={<AlbumDetailsView/>}/>
        <Route path='/artists/:id' element={<ArtistDetailsView/>}/>
        <Route path='/newVinyl' element={<AddVinylView/>}/>
        <Route path='/newArtist' element={<AddArtistView/>}/>
        <Route path='/editVinyl/:id' element={<EditVinylView/>}/>
        <Route path='/editArtist/:id' element={<EditArtistView/>}/>
      </Routes>
    </Router>
  );
};

export default App;