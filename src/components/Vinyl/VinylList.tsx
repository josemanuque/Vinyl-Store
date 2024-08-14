import { FC } from "react";
import Vinyl from "./Vinyl";
import './VinylList.css';
import { VinylInterface } from "../../interfaces/Vinyl.Interface";

interface VinylListProps {
    vinyls?: VinylInterface[];
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const VinylList: FC<VinylListProps> = ({vinyls, onDelete, onEdit}) => {
    return (
        <div className="vinyls-container">
            <div className="vinyl-list">
                <ul>
                    <li>
                    {
                        vinyls?.map(vinyl => {
                            return (
                                <Vinyl
                                    key={vinyl.id}
                                    id={vinyl.id}
                                    title={vinyl.title}
                                    coverImage={vinyl.coverImage}
                                    artist={vinyl.artist}
                                    price={vinyl.price}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                />
                            )
                        })
                    }
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VinylList;