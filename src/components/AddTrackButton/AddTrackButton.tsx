import { FC } from "react";
import styles from './AddTrackButton.module.css';

interface AddTrackButtonProps {
    onClick: () => void;
    content: string;
}

const AddTrackButton: FC<AddTrackButtonProps> = ({ onClick, content = "Add Track" }) => {
    return (
        <div className={`${styles.trackItemContainer} ${styles.grabbableItem}`}>
            <button 
                onClick={onClick} 
                type="button"
                aria-label={content}
                className="transparent-button btn-no-hover full-width"
            >
                {content}
            </button>
        </div>
    );
};

export default AddTrackButton;
