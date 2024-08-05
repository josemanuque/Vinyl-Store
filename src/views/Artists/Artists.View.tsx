import { FC, useEffect, useState } from "react";
import { ArtistInterface } from "../../interfaces/Artist.Interface";
import { getArtists } from "../../services/ArtistService";
import ArtistPlaceholder from "../../components/Placeholders/ArtistPlaceholder";
import "./Artists.View.css";

const ArtistsView: FC = () => {

    const [artists, setArtists] = useState<ArtistInterface[]>([]);

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await getArtists();
            setArtists(data);
        }
        fetchArtists();
    }, []);

    return (
        <div className="main-container artists-view-container">
            <h1>Artists</h1>
            <ul className="artists-list">
                {artists.map((artist) => (
                    <li key={artist._id}>
                        <div className="artist-image-container">
                            {artist.image ? (
                                <img src={artist.image} alt={artist.name + " Image"} />
                            ) : ( 
                                <ArtistPlaceholder/>
                            )
                            }
                        </div>
                        <h2>{artist.name}</h2>

                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default ArtistsView;
