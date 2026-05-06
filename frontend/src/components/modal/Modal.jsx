import { createPortal } from "react-dom";
import Card from "../UIElements/Card";
import { useTranslation } from "react-i18next"
import "./Modal.css"

const Modal = (props) => {
    const { t } = useTranslation();
    const content = (
        <div className="modal" onClick={props.onCancel}>
            <Card className="modal_container" onClick={(event) => event.stopPropagation()}>
                <header className="modal_header">
                    <h2>{props.title || "Confirmation"}</h2>
                </header>
                <div className="modal_body">
                    {props.children}
                </div>
                <footer className="modal_footer">
                    <button className="btn_cancel" onClick={props.onCancel}>{t('modal.cancel-button')}</button>
                    <button className="btn_confirm" onClick={props.onConfirm}>{t('modal.confirm-button')}</button>
                </footer>
            </Card>
        </div>
    );
    return createPortal(content, document.getElementById("dialog"));
};

export default Modal;