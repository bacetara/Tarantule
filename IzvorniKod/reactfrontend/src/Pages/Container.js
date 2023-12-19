import React from "react";
import './Container.css'

export default function Container(props) {
    const {children} = props;
    return(
        <>
            <div className="containerOutlet">
                {children}
            </div>
        </>
    )
}