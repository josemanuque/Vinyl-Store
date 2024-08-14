import { FC } from "react";
import { SpotifyAlbumSearchResultProps } from "../../interfaces/Spotify.Interface";
import styles from './FoundAlbumsList.module.css';

const FoundAlbumsList: FC<SpotifyAlbumSearchResultProps> = ({albums, onSelect}) => {
    return (
        <div className={styles.foundAlbumsList}>
            {albums.map((album) => (
                <div key={album.id} className={styles.foundAlbumItem}>
                    
                    <button className="transparent-button full-width" onClick={() => onSelect(album)}>
                        <img src={album.images[0]?.url} alt={album.name} height={album.images[0]?.height} width={album.images[0]?.width} />
                        <div className={styles.foundAlbumItem__info}>
                            <h2>{album.name}</h2>
                            <h3>{album.artists.map(artist => artist.name).join(', ')}</h3> {/* Join artist names */}
                        </div>
                        <p>{album.release_date}</p>
                        <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} >Open in Spotify</a>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FoundAlbumsList;