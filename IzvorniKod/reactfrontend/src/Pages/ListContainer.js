import React from "react";
import {Link} from "react-router-dom";
import ReadEmail from "./Messages/ReadEmail";
import './Container.css'

export default function ListContainer({items, listAll, onClick}) {
    console.log(items);
    return(
        <div className="listContainer">
            {listAll ?
                (<ul>
                    {items.map((email) => (
                        <li key={email.id} onClick={() => onClick(email)}>
                            <span id="emailSender"> {email.sender} </span>
                            <span id="emailTitle">[{email.title}]</span>
                        </li>
                    ))}
                </ul>) :
                (<ReadEmail email={items}/>)}

        </div>
    );
}