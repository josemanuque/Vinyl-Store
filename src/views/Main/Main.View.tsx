import { FC, useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { ArtistInterface } from '../../interfaces/Artist.Interface';
import VinylList from '../../components/Vinyl/VinylList';
import { VinylInterface } from '../../interfaces/Vinyl.Interface';
import ArtistForm from '../../components/Forms/Artist/ArtistForm';
import VinylForm from '../../components/Forms/Vinyl/VinylForm';
import { createVinyl, getVinyls } from '../../services/VinylService';
import { createArtist } from '../../services/ArtistService';

import './Main.View.css';

const MainView: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<'artist' | 'vinyl' | null>(null);
  const [vinyls, setVinyls] = useState<VinylInterface[]>([]);
  const [artists, setArtists] = useState<ArtistInterface[]>([]);


  const openModal = (type: 'artist' | 'vinyl') => {
    setFormType(type);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setFormType(null);
  };

  
  useEffect(() => {
        const fetchVinyls = async () => {
            const data = await getVinyls();
            setVinyls(data);
        }
        fetchVinyls();
    },[]);
  
  const addNewVinyl = async (vinyl: VinylInterface) => {
    try {
      const newVinyl = await createVinyl(vinyl);
      setVinyls((prevData) => [...prevData, newVinyl]);
    } catch (error) {
      console.error('Failed to add vinyl:', error);
    }
  };

  const addNewArtist = async (artist: ArtistInterface) => {
    try {
      const newArtist = await createArtist(artist);
      setArtists((prevData) => [...prevData, newArtist]);
    } catch (error) {
      console.error('Failed to add artist:', error);
    }
  };

  const renderForm = () => {
    switch (formType) {
      case 'artist':
        return <ArtistForm onSubmit={async (values: ArtistInterface) => {
          addNewArtist(values);
          closeModal();
        }} />;
      case 'vinyl':
        return <VinylForm onSubmit={async (values: VinylInterface) => {
          addNewVinyl(values);
          closeModal();
        }} />;
      default:
        return null;
    }
  };

  return (
    <div className='main-container main-view-container'>
      {/* <button onClick={()=> openModal('artist')}>Add Artist</button>
      <button onClick={() => openModal('vinyl')}>Add Vinyl</button> */}
      <h1>Vinyls</h1>
      <VinylList vinyls={vinyls}/>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {renderForm()}
        </Modal>
      )}

    </div>
  );
};

export default MainView;