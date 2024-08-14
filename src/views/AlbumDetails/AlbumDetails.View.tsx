import { FC, useEffect, useState } from "react";
import './AlbumDetails.View.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteVinyl, getVinylById } from "../../services/VinylService";
import { VinylResponseInterface } from "../../interfaces/Vinyl.Interface";
import TrackList from "../../components/TrackList/TrackList";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import Modal from "../../components/Modal/Modal";
import GenericDelete from "../../components/Forms/GenericDelete/GenericDelete";

const AlbumDetailsView: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<VinylResponseInterface>();
    const [tracks, setTracks] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const formatPrice = useFormatCurrency('en-US', 'USD');
    const navigate = useNavigate();

    useEffect(() => {
        // const fetchData = async () => {
        //     const data = await axios.get('https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=16ada67ecd1e97fb8b3e366e658acdca&artist=Michael Jackson&album=Thriller&format=json');
        //     setTracks(data.data.album.tracks.track);
        // };
        // fetchData();

        const fetchAlbum = async () => {
            const data = await getVinylById(id!);
            setTracks(data.tracks);
            setAlbum(data);
        };

        fetchAlbum();
    },[]);

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

    const onVinylDelete = async (vinylId: string) => {
        try {
          const response = await deleteVinyl(vinylId);
          if (response) {
            navigate('/');
          }
        } catch (error) {
          console.error('Failed to delete vinyl:', error);
        } finally {
          setIsOpen(false);
        }
    }

    const goToEdit = (id: string) => {
        navigate(`/editVinyl/${id}`);
    }

    return (
        <>
        <div className="main-container album-details-container">
            <div className="album-info-container">
                <h1>{album?.title}</h1>
                <img src={album?.coverImage} alt="" />
                <h2>{album?.artist.name}</h2>
                <dl>
                    <dt><strong>Release Date:</strong></dt>
                    <dd>{album?.releaseDate}</dd>
                </dl>
                <dl>
                    <dt><strong>Price:</strong></dt>
                    <dd>{formatPrice(album?.price!)}</dd>
                </dl>
                <div className="album-description-container">
                    <p>{album?.description}</p>
                </div>
            </div>
            <div className="tracklist-container">
                <div className="action-buttons-container">
                    <button onClick={(e) => {
                        e.preventDefault();
                        goToEdit(album!.id);
                    }}
                    >Edit</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        openDeleteModal(album!.id);
                    }}>Delete</button>
                </div>
                <TrackList tracks={tracks} setTracks={setTracks}></TrackList>
            </div>
        </div>
        {isOpen && (
            <Modal onClose={() => setIsOpen(false)}>
            {modalContent}
            </Modal>
        )}
        </>
    );
}

export default AlbumDetailsView;