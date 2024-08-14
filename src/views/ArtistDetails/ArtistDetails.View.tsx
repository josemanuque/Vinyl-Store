import { FC, useEffect, useState } from "react";
import CoverFlow from "../../components/CoverFlow/CoverFlow";
import './ArtistDetails.View.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteArtist, getArtistById } from "../../services/ArtistService";
import { ArtistInterface } from "../../interfaces/Artist.Interface";
import { VinylInterface } from "../../interfaces/Vinyl.Interface";
import GenericDelete from "../../components/Forms/GenericDelete/GenericDelete";
import GenericInfo from "../../components/Forms/GenericInfo/GenericInfo";
import Modal from "../../components/Modal/Modal";
import VinylList from "../../components/Vinyl/VinylList";

const ArtistDetailsView: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [artist, setArtist] = useState<ArtistInterface>();
    const [vinyls, setVinyls] = useState<VinylInterface[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const navigate = useNavigate();
    const [supportsViewTimeline, setSupportsViewTimeline] = useState(false);

    useEffect(() => {
        setSupportsViewTimeline(CSS.supports('view-timeline', '--works'));
    }, []);

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchArtist = async () => {
            const data = await getArtistById(id!);
            setArtist(data);
            setVinyls(data.vinyls);
        }
        fetchArtist();
    },[]);

    const openDeleteModal = () => {
        setIsOpen(true);
        setModalContent(<GenericDelete 
                        title='Delete Artist'
                        primaryMessage='This action cannot be undone.' 
                        secondaryMessage='Are you sure you want to delete this artist?'
                        onCancel={closeModal} 
                        onSubmit={onDeleteArtist} />);
    }

    const openDenyModal = () => {
        console.log('openDenyModal');
        setIsOpen(true);
        setModalContent(<GenericInfo 
                        title='Unable to Delete Artist'
                        primaryMessage='The artist has vinyls associated with it.' 
                        secondaryMessage='In order to delete this artist, you must first delete all associated vinyls.'
                        onCancel={closeModal} 
                        />);
    }

    const onDeleteArtist = async () => {
        try {
            console.log('onDeleteArtist', id);
            const response = await deleteArtist(id!);
            if (response) {
                navigate('/artists');
            }
        } catch (error) {
            console.error('Failed to delete artist:', error);
        }
    }

    const handleDeleteRequest = () => {
        if (vinyls.length > 0) {
            openDenyModal();
        } else {
            openDeleteModal();
        }
    }

    return (
        <>
        <div className="main-container artist-details-container">
            <div className="artist-info-container">
                <div className="artist-glance-container">
                    <h1>{artist?.name}</h1>
                    <img src={artist?.imageURL} alt={`${artist?.name} image`} />
                </div>
                <div className="artist-options-container">
                    <div className="action-buttons-container">
                        <button onClick={(e) => {
                            console.log('editArtist', id);
                            e.preventDefault();
                            navigate(`/editArtist/${id}`);
                        }}
                        >Edit</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDeleteRequest();
                        }}
                        >Delete</button>
                    </div>
                    <div className="artist-description-container">
                        <p>{artist?.biography}</p>
                    </div>
                </div>
            </div>
            <h2>Vinyls</h2>
        </div>
        {supportsViewTimeline ? (
                <CoverFlow vinyls={vinyls}></CoverFlow>
            ) : (
                <VinylList vinyls={vinyls}></VinylList>
            )}
        {isOpen && (
            <Modal onClose={() => setIsOpen(false)}>
            {modalContent}
            </Modal>
        )}
        </>
    );
}

export default ArtistDetailsView;