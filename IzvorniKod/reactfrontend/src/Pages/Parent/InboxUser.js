import './Inbox.css'
import Container from "../Container";
import {useEffect, useState} from "react";
import ListContainer from "../ListContainer";
import ComposeEmail from "../Messages/ComposeEmail";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import ReadEmail from "../Messages/ReadEmail";
import {Link, useParams} from "react-router-dom";

export default function InboxUser() {
    const { oib } = useParams();
    console.log(oib);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [createEmail, setCreateEmail] = useState(false);
    const emails = [
        { sender: 'john@example.com', receiver:'netko@mail.com', title: 'prvi mail', messageBody: 'Hi, let\'s discuss the agenda for tomorrow\'s meeting.', id:1, type: 'obicna' },
        { sender: 'john1111@example.com', receiver:'netko2@mail.com', title: 'drugi mail', messageBody: 'Bok ja sam drugi mail', id:2, type: 'obicna' },
        { sender: 'john12213123@example.com', receiver:'netko3333@mail.com', title: 'treci mail', messageBody: 'Hi, ja sam treci mail.' , id: 3, type: 'obicna'}
    ];
    const pediatrician = {oib: 9090909, name: "Ivan", surname: "Lucić"};
    const child = {oib: oib, name: "Jakov", surname: "Župančić"};

    /*useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/profile/${oib}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    // Handle error
                    console.error('Error fetching profile data');
                }
            } catch (error) {
                // Handle fetch error
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, [oib]);*/

    const openEmail = (email) => {
        setSelectedEmail(email);
        setCreateEmail(false);
    }

    const newEmail = () => {
        setCreateEmail(true);
        setSelectedEmail(null);
    }

    return(
        <>
            <div className="header">

                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}} />
                        <p id="logOutText">log out</p>
                    </div>

                    <div className="logOut">
                        <FontAwesomeIcon icon={faHouse} style={{color: "#fcfcfd",}} />
                        <p id="logOutText" > switch profiles</p>
                    </div>
                </div>

                <div className="profileName">
                    {child.name} {child.surname} [{child.oib}]
                </div>

            </div>

        <Container>

            <div className="AdditionalInfo">
                <div className="profilePhoto">
                    <Link to="/updateInfo">
                        <FontAwesomeIcon id="profileIcon" icon={faUser} />
                    </Link>
                </div>
                <button className={createEmail ? "nevidljivo" :"Message"} onClick={newEmail}>naruči</button>
            </div>

            {selectedEmail != null ? (
                //treba promijenit za specijalista da se mail s kartom iscrta!!!
                <div className="listContainer">
                    {selectedEmail.type === 'obicna' && <ReadEmail email={selectedEmail} />}
                    {selectedEmail.type === 'specialist' && <ReadEmail email={selectedEmail} />}
                    {selectedEmail.type === 'bolovanje' && <ReadEmail email={selectedEmail}/>}
                </div>
            ) :createEmail === false ?
                    (<ListContainer items={emails} myfunc={openEmail}/>) :
                    (<div className="listContainer"><ComposeEmail email={{sender: child.oib, receiver: pediatrician.oib}}/></div>)}

        </Container>

            </>
    )
}