import { FC } from "react";
import { VinylProps } from "../../interfaces/Vinyl.Interface";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import './Vinyl.css';
import AlbumPlaceholder from "../Placeholders/AlbumPlaceholder";
import { Link } from "react-router-dom";

const Vinyl: FC<VinylProps> = (props) => {
    const { id, title, coverImage, artist, price, onDelete, onEdit} = props;
    const formatPrice = useFormatCurrency('en-US', 'USD');


    return (
        <>
            <Link to={`/vinyls/${id}`}>
                <div key={id} className='vinyl-item'>
                    <div className="vinyl-image-container">
                        {coverImage ? (
                            <img src={coverImage} alt={title + " Cover Image"} draggable="false" />
                        ) : ( 
                            <AlbumPlaceholder className="svg-container generic-album-placeholder album-grid-img"/>
                        )}
                    </div>
                    <h2>{title}</h2>
                    {typeof artist === 'string' ? (
                        <p>{artist}</p>
                    ) : (
                        <p>{artist.name}</p>
                    )}
                    <p>{formatPrice(price)}</p>
                    {onDelete && onEdit && (
                    <div className="vi-buttons-container">
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit!(id);
                        }}>Edit</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete!(id);
                        }}>Delete</button>
                    </div>
                    )}
                </div>
            </Link>
        </>
    );
}

export default Vinyl;