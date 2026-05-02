import { createPortal } from "react-dom";
import Card from "../UIElements/Card";

const Modal = (props) => {
    const content = (
        <div>
            <Card onClick={(event) => event.stopPropagation()}>
                <header>
                    <h2>{props.title || "Confirmation"}</h2>
                </header>
                <div>
                    {props.children}
                </div>
                <footer>
                    <button onClick={props.onCancel}>Annuler</button>
                    <button onClick={props.onConfirm}>Confirmer</button>
                </footer>
            </Card>
        </div>
    );
    return createPortal(content, document.getElementById("dialog"));
};

export default Modal;