import { createPortal } from "react-dom";
import Card from "../UIElements/Card";

const Modal = (props) => {
    const content = (
        <div className="modal">
            <Card className="modal_container" onClick={(event) => event.stopPropagation()}>
                <header className="modal_header">
                    <h2>{props.title || "Confirmation"}</h2>
                </header>
                <div className="modal_body">
                    {props.children}
                </div>
                <footer modal_footer>
                    <button className="btn_cancel" onClick={props.onCancel}>Annuler</button>
                    <button className="btn_confirm" onClick={props.onConfirm}>Confirmer</button>
                </footer>
            </Card>
        </div>
    );
    return createPortal(content, document.getElementById("dialog"));
};

export default Modal;