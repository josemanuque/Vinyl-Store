import { FC } from "react";
import styles from './GenericDelete.module.css';
import { DeleteFormProps } from "../../../interfaces/DeleteForm.Interface";


const GenericDelete: FC<DeleteFormProps> = (props) => {
    const { title, primaryMessage, secondaryMessage, onCancel, onSubmit } = props;
    
    return (
        <div>
            <h1>{title}</h1>
            <p>{primaryMessage}</p>
            <p>{secondaryMessage}</p>
            <div className={styles.modalBtnContainer}>
                <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                <button className="btn-danger" onClick={onSubmit}>Delete</button>
            </div>
        </div>
    );
}

export default GenericDelete;