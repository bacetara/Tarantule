import React from "react";
import './Container.css'

export default function ListContainer({items, myfunc, currentUser}) {
    return(
        <div className="listContainer">
            {
                <ul>
                    {console.log(items)}
                    {items.length > 0 ?
                        items.map((email) => (
                        <li key={email.id} onClick={() => myfunc(email)}>
                            <span id="emailSender"> {currentUser === email.posoib ? "Sent to: " : "Received from: "} {currentUser === email.posoib ? email.prioib : email.posoib} </span>
                            <span id="emailTitle">{email.naslov}</span>
                        </li>
                    )) : ""}
                </ul>
            }

        </div>
    );
}