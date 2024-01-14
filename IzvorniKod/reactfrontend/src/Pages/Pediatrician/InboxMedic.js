import './InboxPedijatar.css'
import Container from "../Container";
import ListContainer from "../ListContainer";
import {useEffect, useState} from "react";
import * as React from "react";
import PediatricianEmail from "../Messages/PediatricianEmail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faHouse, faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import ReadEmail from "../Messages/ReadEmail";
import {Link, useParams} from "react-router-dom";


export default function InboxMedic() {
    const { oib } = useParams();
    const [user, setUser] = useState(null); //parent's/child's profile
    const [medical, setMedical] = useState(null); //loged in user == doctor/pediatrician
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [createEmail, setCreateEmail] = useState(false);
    const [emails, setEmails] = useState(null);
    /*const emails = [
        { sender: 'john@example.com', receiver:'netko@mail.com', title: 'prvi mail', messageBody: 'Hi, let\'s discuss the agenda for tomorrow\'s meeting.', id:1, type: 'obicna' },
        { sender: 'john1111@example.com', receiver:'netko2@mail.com', title: 'drugi mail', messageBody: 'Bok ja sam drugi mail', id:2, type: 'bolovanje'},
        { sender: 'john12213123@example.com', receiver:'netko3333@mail.com', title: 'treci mail', messageBody: 'Hi, ja sam treci mail.' , id: 3, type: 'obicna'}
    ];*/

    useEffect(() => {
        fetch(`/api/doctor/inbox/${oib}`)
            .then(data => data.json())
            .then(data => {
                setEmails(data);
            })

        fetch(`/api/doctor/me`)
            .then(data => data.json())
            .then(data => {
                setMedical(data.doktor);
            })
    }, [oib]);



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
                    <Link to={user && user.role==="pedijatar" ? "/pediatrician" : "/doctor"} id="logOutText">switch profiles</Link>
                </div>
            </div>


            <div className="profileName">

            </div>

        </div>


        <Container>

            <div className="AdditionalInfo">
                <div className="profilePhoto">
                    <FontAwesomeIcon id="profileIcon2" icon={faUserDoctor} />
                </div>
                <button className={createEmail ? "nevidljivo" :"Message"} onClick={newEmail}>nova poruka</button>
            </div>

            {selectedEmail != null ? (
                //treba promijenit za specijalista da se mail s kartom iscrta!!!
                    <div className="listContainer">
                        {selectedEmail.type === 'obicna' && <ReadEmail email={selectedEmail} />}
                        {selectedEmail.type === 'specialist' && <ReadEmail email={selectedEmail} />}
                        {selectedEmail.type === 'bolovanje' && <ReadEmail email={selectedEmail}/>}
                    </div>
                ) :
                createEmail === false ? emails ?
                    (<ListContainer items={emails} myfunc={openEmail}/>) : null :
                    (<div className="listContainer">
                        <PediatricianEmail sender={medical ? medical: ""} receiver={oib ? oib : ""}/>
                    </div>)}


        </Container>
            </>
    )
}