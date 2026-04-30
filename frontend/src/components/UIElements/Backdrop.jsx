//import React from "react"; <- À corriger
import ReactDOM from "react-dom";
import "./Backdrop.css";

const Backdrop = (props) => {
    return ReactDOM.createPortal(
        <div onClick={props.onClick}></div>,
        document.getElementById("backdrop")
    );
};

export default Backdrop;
