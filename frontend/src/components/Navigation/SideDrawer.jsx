import { createPortal } from "react-dom";
import "./SideDrawer.css";

const SideDrawer = (props) => {
    const content = (
        <aside className="side-drawer" onClick={props.onClick}>
            {props.chidlren}
        </aside>
    );

    return createPortal(content, document.getElementById("drawer"));
};

export default SideDrawer;