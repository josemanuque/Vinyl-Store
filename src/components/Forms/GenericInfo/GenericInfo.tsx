import { FC } from "react"
import { InfoProps } from "../../../interfaces/Info.Interface"
import styles from './GenericInfo.module.css'


const GenericInfo: FC<InfoProps> = ({title, primaryMessage, secondaryMessage, onCancel}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{primaryMessage}</p>
            <p>{secondaryMessage}</p>
            <div className={styles.modalBtnContainer}>
                <button className="btn-cancel" onClick={onCancel}>Ok</button>
            </div>
        </div>
    )
}


export default GenericInfo;