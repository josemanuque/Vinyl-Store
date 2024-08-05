import { FC } from "react";
import { ModalProps } from "../../interfaces/Modal.Interface";
import { createPortal } from "react-dom";
import './Modal.css';

const Modal: FC<ModalProps> = ({onClose, children}) => {
    

    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal;