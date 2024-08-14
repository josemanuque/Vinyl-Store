import { FC, useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import VinylList from '../../components/Vinyl/VinylList';
import { VinylInterface } from '../../interfaces/Vinyl.Interface';

import styles from './Main.View.module.css';
import { deleteVinyl, getVinyls } from '../../services/VinylService';
import GenericDelete from '../../components/Forms/GenericDelete/GenericDelete';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';

const MainView: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [vinyls, setVinyls] = useState<VinylInterface[]>([]);
  const [filteredVinyls, setFilteredVinyls] = useState<VinylInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const navigate = useNavigate();
  // const openModal = (input: any) => {
  //   setIsOpen(true);
  // }

  const closeModal = () => {
    setIsOpen(false);
  };

  const openDeleteModal = (vinylId: string) => {
    setIsOpen(true);
    setModalContent(<GenericDelete 
                    title='Delete Vinyl'
                    primaryMessage='Deleting this vinyl will also remove all its associated tracks. This action cannot be undone.' 
                    secondaryMessage='Are you sure you want to delete this vinyl?'
                    onCancel={closeModal} 
                    onSubmit={() => onVinylDelete(vinylId)} />);
  }


  const goToEdit = (id: string) => {
    navigate(`/editVinyl/${id}`);
  }

  useEffect(() => {
    const fetchVinyls = async () => {
      const data = await getVinyls();
      setVinyls(data);
    }
    fetchVinyls();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredVinyls(
      vinyls.filter((vinyl) =>
        vinyl.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      (typeof vinyl.artist === 'string' ? vinyl.artist.toLowerCase().includes(lowerCaseSearchTerm) : vinyl.artist?.name.toLowerCase().includes(lowerCaseSearchTerm) )
      )
    );
  }, [searchTerm, vinyls]);

  const onVinylDelete = async (vinylId: string) => {
    try {
      const response = await deleteVinyl(vinylId);
      if (response) {
        setVinyls((prevData) => prevData.filter((v) => v.id !== vinylId));
      }
    } catch (error) {
      console.error('Failed to delete vinyl:', error);
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <div className={`main-container`}>
      <div className={styles.viewTopContainer}>
        <h1 className='main-title'>Vinyls</h1>
        <Link to="/newVinyl" className={'anchor-button'}>
          Add
        </Link>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <VinylList vinyls={filteredVinyls} onEdit={(id: string) => { goToEdit(id) }}  onDelete={(id: string) => { openDeleteModal(id) }} />
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {modalContent}
        </Modal>
      )}

    </div>
  );
};

export default MainView;