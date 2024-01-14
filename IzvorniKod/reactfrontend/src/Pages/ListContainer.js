import React from "react";
import './Container.css'

export default function ListContainer({items, myfunc}) {
    console.log(items);
    return(
        <div className="listContainer">
            {
                <ul>
                    {items.length > 0 ?
                        items.map((email) => (
                        <li key={email.id} onClick={() => myfunc(email)}>
                            <span id="emailSender"> {email.posoib} </span>
                            <span id="emailTitle">{email.naslov}</span>
                        </li>
                    )) : ""}
                </ul>
            }

        </div>
    );
}