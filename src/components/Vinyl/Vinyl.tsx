import { FC } from "react";
import { VinylInterface } from "../../interfaces/Vinyl.Interface";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import './Vinyl.css';
import AlbumPlaceholder from "../Placeholders/AlbumPlaceholder";

const Vinyl: FC<VinylInterface> = (props) => {
    const { _id, title, coverImage, artist, price } = props;
    const formatPrice = useFormatCurrency('en-US', 'USD');


    return (
        <>
            <div key={_id} className='vinyl-item'>
                <div className="vinyl-image-container">
                    {coverImage ? (
                        <img src={coverImage} alt={title + " Cover Image"} draggable="false" />
                    ) : ( 
                        <AlbumPlaceholder className="svg-container generic-album-placeholder album-grid-img"/>
                    )}
                </div>
                <h3>{title}</h3>
                {typeof artist === 'string' ? (
                    <p>{artist}</p>
                ) : (
                    <p>{artist.name}</p>
                )}
                <p>{formatPrice(price)}</p>
                <button>Delete</button>
            </div>
        </>
    );
}

export default Vinyl;