import { FC, useEffect, useState } from "react";
import { ArtistInterface } from "../../interfaces/Artist.Interface";
import ArtistPlaceholder from "../../components/Placeholders/ArtistPlaceholder";
import "./Artists.View.css";
import { getArtists } from "../../services/ArtistService";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const ArtistsView: FC = () => {

    const [artists, setArtists] = useState<ArtistInterface[]>([]);
    const [filteredArtists, setFilteredArtists] = useState<ArtistInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await getArtists();
            setArtists(data);
        }
        fetchArtists();
    }, []);

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        setFilteredArtists(
            artists.filter((artist) =>
                artist.name.toLowerCase().includes(lowerCaseSearchTerm)
            )
        );
    }, [searchTerm, artists]);

    return (
        <div className="main-container artists-view-container">
            <div className="view-top-container">
                <h1 className='main-title'>Artists</h1>
                <Link to="/newArtist" className={'anchor-button'}>
                Add
                </Link>
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
            <ul className="artists-list">
                {filteredArtists.map((artist) => (
                    <li key={artist.id}>
                        <Link to={`/artists/${artist.id}`}>
                        <div className="artist-image-container">
                            {artist.imageURL ? (
                                <img src={artist.imageURL} alt={artist.name + " Image"} />
                            ) : ( 
                                <ArtistPlaceholder/>
                            )
                            }
                        </div>
                        <h2>{artist.name}</h2>
                        </Link>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default ArtistsView;
