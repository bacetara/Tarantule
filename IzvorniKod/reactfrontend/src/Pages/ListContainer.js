import React from "react";
import './Container.css'

export default function ListContainer({items, myfunc, currentUser}) {
    return(
        <div className="listContainer">
            {
                <ul>
                    {items.length > 0 ?
                        items.map((email) => (
                        <li key={email.id} onClick={() => myfunc(email)}>
                            <span id="emailSender"> {currentUser === email.posoib ? "To: " : "From: "} {currentUser === email.posoib ? email.prioib : email.posoib} </span>
                            <span id="emailTitle">{email.naslov}</span>
                        </li>
                    )) : ""}
                </ul>
            }

        </div>
    );
}