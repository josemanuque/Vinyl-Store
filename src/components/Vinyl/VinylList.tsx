import { FC } from "react";
import {v4 as uuid} from 'uuid';
import Vinyl from "./Vinyl";
import './VinylList.css';
import { VinylInterface } from "../../interfaces/Vinyl.Interface";

interface VinylListProps {
    vinyls: VinylInterface[];
}

const VinylList: FC<VinylListProps> = ({vinyls}) => {

    return (
        <div className="vinyls-container">
            <div className='vinyl-list'>
            {
                vinyls.map(vinyl => {
                    vinyl._id = uuid();
                    return (
                        <Vinyl
                            key={vinyl._id}
                            _id={vinyl._id}
                            title={vinyl.title}
                            coverImage={vinyl.coverImage}
                            artist={vinyl.artist}
                            price={vinyl.price}
                        />
                    )
                })
            }
            </div>
        </div>
    );
};

export default VinylList;