import { FC, useEffect } from "react";
import { ModalProps } from "../../interfaces/Modal.Interface";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import FocusTrap from "focus-trap-react";

const Modal: FC<ModalProps> = ({onClose, children}) => {
    useEffect(() => {
        // Add noScroll class to body when modal is open
        document.body.classList.add(styles.noScroll);

        // Cleanup function to remove noScroll class when modal is closed
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, []);

    return createPortal(
        <FocusTrap focusTrapOptions={{initialFocus: false}}>
            <div className={styles.modalBackdrop} onClick={onClose}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={`${styles.modalClose}`} onClick={onClose} aria-label="Close modal">
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </FocusTrap>,
        document.body
    )
}

export default Modal;