import { createPortal } from 'react-dom';


export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    if (!show) return null;

    return createPortal(
        <div className="modal_overlay">
            <div className="modal">
                <h2>{title}</h2>
                <div className="modal_content">
                    {content}
                </div>
                <div className="modal_actions">
                    <button className="btn_cancel" onClick={onClose}>Annulla</button>
                    <button className="btn_confirm" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}