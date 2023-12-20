import './Inbox.css'
import Container from "../Container";
import {useState} from "react";
import ListContainer from "../ListContainer";
import ComposeEmail from "../Messages/ComposeEmail";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export default function InboxDijete() {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [createEmail, setCreateEmail] = useState(false);
    const emails = [
        { sender: 'john@example.com', receiver:'netko@mail.com', title: 'prvi mail', messageBody: 'Hi, let\'s discuss the agenda for tomorrow\'s meeting.', id:1 },
        { sender: 'john1111@example.com', receiver:'netko2@mail.com', title: 'drugi mail', messageBody: 'Bok ja sam drugi mail', id:2 },
        { sender: 'john12213123@example.com', receiver:'netko3333@mail.com', title: 'treci mail', messageBody: 'Hi, ja sam treci mail.' , id: 3}
    ];
    const pediatrician = {oib: 9090909, name: "Ivan", surname: "Lucić"};
    const child = {oib: 999902020202, name: "Jakov", surname: "Župančić"};

    const openEmail = (email) => {
        setSelectedEmail(email);
    }

    const newEmail = () => {
        setCreateEmail(true);
    }

    return(
        <>
            <div className="header">

                <div className="logOut">
                    <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}} />
                    <p id="logOutText">log out</p>
                </div>

                <div className="profileName">
                    {child.name} {child.surname}
                </div>

            </div>

        <Container>
            {selectedEmail != null ?
                (<ListContainer items={selectedEmail} listAll={false}/>) :
                createEmail === false ?
                    (<ListContainer items={emails} listAll={true} myfunc={openEmail}/>) :
                    (<div className="listContainer"><ComposeEmail email={{sender: child.oib, receiver: pediatrician.oib}}/></div>)}

            <div className="AdditionalInfo">
                <button className={createEmail ? "nevidljivo" :"Message"} onClick={newEmail}>naruči</button>

            </div>
        </Container>

            </>
    )
}