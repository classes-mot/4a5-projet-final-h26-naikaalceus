import { createPortal } from "react-dom";

const SideDrawer = (props) => {
    const content = (
        <aside onClick={props.onClick}>
            {props.chidlren}
        </aside>
    );

    return createPortal(content, document.getElementById("drawer"));
};

export default SideDrawer;