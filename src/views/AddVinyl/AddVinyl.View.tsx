
import { FC, useEffect, useState } from 'react';
import './AddVinyl.View.css';
import { getArtists } from '../../services/ArtistService';
import { BsCalendar2Date, BsCashStack, BsFileEarmarkText, BsFileMusic, BsImage, BsMic } from "react-icons/bs";
import DraggableTrackList from '../../components/TrackList/DraggableTrackList';
import Modal from '../../components/Modal/Modal';
import SpotifyLoadForm from '../../components/Forms/SpotifyLoad/SpotifyLoadForm';
import { SpotifyAlbumSearchResult, SpotifyTrackInterface } from '../../interfaces/Spotify.Interface';
import SpotifyService from '../../services/SpotifyService';
import { TrackInputInterface, TrackInterface } from '../../interfaces/Track.Interface';
import { useNavigate } from 'react-router-dom';
import { createVinyl } from '../../services/VinylService';
import { VinylInputInterface } from '../../interfaces/Vinyl.Interface';
import { createTracks } from '../../services/TrackService';
import { ApolloError } from '@apollo/client';
import AddTrackButton from '../../components/AddTrackButton/AddTrackButton';
import TrackForm from '../../components/Forms/TrackForm/TrackForm';

const AddVinylView: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [artists, setArtists] = useState<{ value: string | undefined; label: string }[]>([]);
    
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [coverImage, setCoverImage] = useState<string>('');
    const [releaseDate, setReleaseDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tracks, setTracks] = useState<TrackInterface[]>([]);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    let selectedTrack: TrackInterface | null = null;

    const navigate = useNavigate();

    useEffect(() => {
       
        const fetchArtists = async () => {
            const data = await getArtists();
            setArtists(data.map((artist) => ({ value: artist.id, label: artist.name })));
        }
        fetchArtists();
    },[]);


    const formatDate = (dateString: string): string => {
        const parts = dateString.split('-');
        if (parts.length === 1) {
            return `${parts[0]}-01-01`;
        }
        return dateString;
    };

    const convertSpotifyTrackToTrack = (spotifyTrack: SpotifyTrackInterface): TrackInputInterface => {
        return {
            title: spotifyTrack.name,
            time: spotifyTrack.duration_ms,
            previewUrl: spotifyTrack.preview_url,
            url: spotifyTrack.external_urls.spotify,
            trackNumber: spotifyTrack.track_number,
            spotifyTrackId: spotifyTrack.id,
            artistId: artist
        };
    };

    const generateVinyl = (): VinylInputInterface => {
        return {
            title: title!,
            artistId: artist!,
            price: parseFloat(price!),
            coverImage,
            releaseDate,
            description
        };
    }

    const onLoadDataFromSpotify = async (albumSpotify: SpotifyAlbumSearchResult) => {
        setTitle(albumSpotify.name);
        setCoverImage(albumSpotify.images[0].url);
        setReleaseDate(formatDate(albumSpotify.release_date));

        const fetchedAlbum = await SpotifyService.getAlbumById(albumSpotify.id);
        const newTracks:any = fetchedAlbum.tracks.items.map(convertSpotifyTrackToTrack);
        setTracks(newTracks);
        setIsOpen(false);
    }

    const onGoBack = () => {
        navigate('/');
    }


    const onSubmit = async (e: React.FormEvent) => {
        // Call API to save the vinyl
        e.preventDefault();

        
        try{
            const createdVinyl = await createVinyl(generateVinyl());
            const createdTracks = tracks.map(track => ({
                ...track,
                albumId: createdVinyl.id,
                artistId: artist
            }));
            console.log("Created Vinyl", createdVinyl);
            setTracks(createdTracks);
            // Call API to save the tracks
            await createTracks(createdTracks);
            // Redirect to the vinyl details page
            navigate(`/vinyls/${createdVinyl.id}`);
        } catch (error) {
            if (error instanceof ApolloError) {
                console.error('ApolloError:', error.message);
                console.error('GraphQL Errors:', error.graphQLErrors);
                console.error('Network Error:', error.networkError);
            } else {
                console.error('Failed to create vinyl:', error);
            }
        }
    }

    const onTrackUpdate = (track: TrackInterface) => {
        console.log('track', track);
        const updatedTracks = tracks.map((t) => {
            if (t.id === track.id) {

                console.log('t', t);
                return track;
            }
            return t;
        });
        console.log('updatedTracks', updatedTracks);
        setTracks(updatedTracks!);
        setIsOpen(false);
    }

    const onAddTrack = (track: TrackInterface) => {
        setTracks([...tracks, track]);
        setIsOpen(false);
    }

    const onDeleteTrack = (trackId: string) => {
        const updatedTracks = tracks.filter((track) => track.id !== trackId);
        setTracks(updatedTracks);
        setIsOpen(false);
    }

    const renderModalContent = (type: string) => {
        if(type === 'spotify'){
            return (
                <SpotifyLoadForm onSelect={onLoadDataFromSpotify} setArtistId={setArtist}/>
            );
        }
        if (type === 'newTrack') {
            return (
                <TrackForm onSubmit={onAddTrack} onDelete={onDeleteTrack}/>
            );
        }
        if (type === 'existingTrack') {
            return (
                <TrackForm onSubmit={onTrackUpdate} initialValues={selectedTrack!}  onDelete={onDeleteTrack}/>
            );
        }
    }


    return (
        <div className="main-container add-edit-vinyl-container">
            <div className="add-edit-vinyl-heading">
                <h1>New Vinyl</h1>
                <button type='button' onClick={() => {
                    setModalContent(renderModalContent('spotify') || null)
                    setIsOpen(true);
                    }}>
                    Load album data from Spotify
                </button>
            </div>
            <form onSubmit={onSubmit}>
                <div className="add-edit-vinyl-form-container">
                    <section className="add-edit-vinyl-form-information">
                        <h2>Information</h2>
                        <div className='add-edit-vinyl-form-group'>
                            <span>
                                <BsFileMusic className='icon-wrapper'/>
                                <label htmlFor="title">Title</label>
                            </span>
                            <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} required/>
                        </div>
                        <div className='add-edit-vinyl-form-group custom-select'>
                            <span>
                                <BsMic className='icon-wrapper'/>
                                <label htmlFor="artist">Artist</label>
                            </span>
                            <select 
                            value={artist}
                            name="" 
                            id=""
                            onChange={(e) => setArtist(e.target.value)}
                            required
                            aria-label='Select an artist'
                            >
                            <option value="" disabled>Select an artist</option>
                            {artists.map((artist) => (
                                <option key={artist.value} value={artist.value}>{artist.label}</option>
                            ))}
                            </select>
                        </div>
                        <div className='add-edit-vinyl-form-group'>
                            <span>
                                <BsCashStack className='icon-wrapper'/>
                                <label htmlFor="price">Price</label>
                            </span>
                            <input type="number" name="price" id="price" onChange={(e) => setPrice(e.target.value)} value={price} required/>
                        </div>
                        <div className="add-edit-vinyl-form-group">
                            <span>
                                <BsImage className='icon-wrapper'/>
                                <label htmlFor="coverImage">Cover Image</label>
                            </span>
                            <input type="text" name="coverImage" id="coverImage" onChange={(e) => setCoverImage(e.target.value)} value={coverImage}/>
                        </div>
                        <div className="add-edit-vinyl-form-group">
                            <span>
                                <BsCalendar2Date className='icon-wrapper'/>
                                <label htmlFor="releaseDate">Release Date</label>
                            </span>
                            <input type="date" name="releaseDate" id="releaseDate" onChange={(e) => setReleaseDate(e.target.value)} value={releaseDate}/>
                        </div>
                        <div className="add-edit-vinyl-form-group">
                            <span>
                                <BsFileEarmarkText className='icon-wrapper'/>
                                <label htmlFor="description">Description</label>
                            </span>
                            <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                    </section>
                    <section>
                        <h2>Tracks</h2>
                        <DraggableTrackList
                            tracks={tracks}
                            setTracks={setTracks}
                            onAddTrack={(id: string) => {
                                const track = tracks.find((track) => track.id === id);
                                selectedTrack = track!; 
                                setModalContent(renderModalContent('existingTrack') || null);
                                setIsOpen(true);
                            }}
                        />
                        <AddTrackButton onClick={() => {
                            setModalContent(renderModalContent('newTrack') || null);
                            setIsOpen(true);
                        }} content='Add Track'></AddTrackButton>
                    </section>
                </div>
                <div className="ava-action-buttons-container">
                    <button type="button" onClick={()=> onGoBack()}>Cancel and Go Back</button>
                    <button type="submit">Add Vinyl</button>
                </div>
            </form>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    {modalContent}
                </Modal>
            )}
        </div>
    );
}

export default AddVinylView;