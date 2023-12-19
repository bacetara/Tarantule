import *  as React from "react";
import './User.css'
import ComposeEmail from "./Messages/ComposeEmail";
import ReadEmail from "./Messages/ReadEmail";
import Container from "./Container";
import ListContainer from "./ListContainer";
import {useState} from "react";
export default function User() {

    const [user, setUser] = React.useState({oib : '12345678910', ime : 'Tara', prezime : 'Bace', mail : '', datumRod : '', adresa : '', adminPrava : '', lozinkaHash : '', uloga : '', roditelj : '', doktor : ''});
    const [isNewMailVisible, setNewMailVisible] = useState(false);
    const [openingEmail, setOpeningEmail] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const emails = [
        { sender: 'john@example.com', receiver:'netko@mail.com', title: 'prvi mail', messageBody: 'Hi, let\'s discuss the agenda for tomorrow\'s meeting.', id:1 },
        { sender: 'john1111@example.com', receiver:'netko2@mail.com', title: 'drugi mail', messageBody: 'Bok ja sam drugi mail', id:2 },
        { sender: 'john12213123@example.com', receiver:'netko3333@mail.com', title: 'treci mail', messageBody: 'Hi, ja sam treci mail.' , id: 3}
    ];

    console.log(isNewMailVisible);
    console.log(openingEmail);

    /*React.useEffect(() => {
        fetch('/api/user')
        .then(data => data.json())
        .then(user => setUser(user))
    }, []);*/

    const createNewMail = () => {
        setNewMailVisible(true);
    }

    const openEmail = (email) => {
        setOpeningEmail(true);
        setSelectedEmail(email);
    }

    return (
        <>


        <Container>
            {openingEmail ?
                (<ListContainer items={selectedEmail} listAll={false}/>) :
                (<ListContainer items={emails} listAll={true} onClick={openEmail}/>)}

        </Container>


        </>
    )
}