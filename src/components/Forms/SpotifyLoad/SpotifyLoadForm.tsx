import React, { useState, useEffect, FC } from "react";
import { BsFileMusic, BsMic } from "react-icons/bs";
import SpotifyService from "../../../services/SpotifyService";
import { ArtistInterface } from "../../../interfaces/Artist.Interface";
import { SpotifyAlbumSearchResult, SpotifyLoadFormProps } from "../../../interfaces/Spotify.Interface";
import { getArtists } from "../../../services/ArtistService";
import FoundAlbumsList from "../../FoundAlbumsList/FoundAlbumsList";

const SpotifyLoadForm: FC<SpotifyLoadFormProps> = ({onSelect, setArtistId}) => {
    const [artist, setArtist] = useState<string>('');
    const [artists, setArtists] = useState<ArtistInterface[]>([]);
    const [albums, setAlbums] = useState<SpotifyAlbumSearchResult[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await getArtists();
            setArtists(data);
        };
        fetchArtists();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const query = `${searchQuery} ${artist}`;
        const data = await SpotifyService.getMatchingVinyls(query);
        setAlbums(data);
    };

    const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedArtistName = e.target.value;
        setArtist(selectedArtistName);

        const selectedArtist = artists.find(artist => artist.name === selectedArtistName);
        if (selectedArtist) {
            setArtistId(selectedArtist.id!);
        }
    };


    return (
        <form onSubmit={handleSearch}>
            <h1>Search for an album</h1>
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <BsFileMusic className='icon-wrapper'/>
                    <label htmlFor="title_modal">Title</label>
                </span>
                <input 
                    type="text" 
                    name="title" 
                    id="title_modal" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                />
            </div>
            <div className='add-edit-vinyl-form-group custom-select'>
                <span>
                    <BsMic className='icon-wrapper'/>
                    <label htmlFor="artist_modal">Artist</label>
                </span>
                <select 
                    value={artist}
                    name="artist" 
                    id="artist_modal"
                    onChange={(e) => handleArtistChange(e)}
                    required
                >
                    <option value="" disabled>Select an artist</option>
                    {artists?.map((artist) => (
                        <option key={artist.id} value={artist.name}>{artist.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">
                Search
            </button>
            <FoundAlbumsList onSelect={onSelect} albums={albums}/>
        </form>
    );
}

export default SpotifyLoadForm;