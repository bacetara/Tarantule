import React from "react";
import './Container.css'

export default function ListContainer({items, myfunc}) {
    console.log(items);
    return(
        <div className="listContainer">
            {
                <ul>
                    {items.map((email) => (
                        <li key={email.id} onClick={() => myfunc(email)}>
                            <span id="emailSender"> {email.sender} </span>
                            <span id="emailTitle">[{email.title}]</span>
                        </li>
                    ))}
                </ul>
            }

        </div>
    );
}