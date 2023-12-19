import './InboxPedijatar.css'
import Container from "../Container";
import ListContainer from "../ListContainer";
import {useState} from "react";
import * as React from "react";
import PediatricianEmail from "../Messages/PediatricianEmail";

export default function InboxPedijatar() {
    const pediatrician = {oib: 9090909, name: "Ivan", surname: "Lucić"};
    const patient = {oib: 999902020202, name: "Jakov", surname: "Župančić"};
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [createEmail, setCreateEmail] = useState(false);
    const emails = [
        { sender: 'john@example.com', receiver:'netko@mail.com', title: 'prvi mail', messageBody: 'Hi, let\'s discuss the agenda for tomorrow\'s meeting.', id:1 },
        { sender: 'john1111@example.com', receiver:'netko2@mail.com', title: 'drugi mail', messageBody: 'Bok ja sam drugi mail', id:2 },
        { sender: 'john12213123@example.com', receiver:'netko3333@mail.com', title: 'treci mail', messageBody: 'Hi, ja sam treci mail.' , id: 3}
    ];
    const openEmail = (email) => {
        setSelectedEmail(email);
    }

    const newEmail = () => {
        setCreateEmail(true);
    }

    return(
        <Container>
            {selectedEmail != null ?
                (<ListContainer items={selectedEmail} listAll={false}/>) :
                createEmail === false ?
                    (<ListContainer items={emails} listAll={true} myfunc={openEmail}/>) :
                    (<div className="listContainer"><PediatricianEmail sender={pediatrician} receiver={patient}/></div>)}

            <div className="AdditionalInfo">
                <p> placeholder za sliku</p>
                <button className={createEmail ? "nevidljivo" :"PediatricianMessage"} onClick={newEmail}>nova poruka</button>
            </div>
        </Container>
    )
}