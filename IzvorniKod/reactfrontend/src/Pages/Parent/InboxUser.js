import './Inbox.css'
import Container from "../Container";
import {useState} from "react";
import ListContainer from "../ListContainer";
import ComposeEmail from "../Messages/ComposeEmail";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import ReadEmail from "../Messages/ReadEmail";
import {Link, useNavigate} from "react-router-dom";
import MapHelp from "../Messages/mapHelp";

export default function InboxUser({user, emails, medical, onLogout}) {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [createEmail, setCreateEmail] = useState(false);
    const navigate = useNavigate();

    const openEmail = (email) => {
        setSelectedEmail(email);
        setCreateEmail(false);
    }

    const newEmail = () => {
        setCreateEmail(true);
        setSelectedEmail(null);
    }

    const onLogOutFunction = () => {
        onLogout();
        navigate("/");
    }

    return (
        <>
            <div className="header">

                <div className="backOptions">
                    <div className="logOut" onClick={() => onLogOutFunction()}>
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}} />
                        <p id="logOutText">log out</p>
                    </div>

                    <div className="logOut">
                        <FontAwesomeIcon icon={faHouse} style={{color: "#fcfcfd",}} />
                        <Link to="/parentInfo" id="logOutText">switch profiles</Link>
                    </div>
                </div>

                <div className="profileName">
                    {user ? user.ime  : ""} {user ? user.prezime : ""} [{user ? user.oib : ""}]
                </div>

            </div>

        <Container>

            <div className="AdditionalInfo">
                <div className="profilePhoto">
                    <Link to={`/updateInfo/${user ? user.oib : ""}`}>
                        <FontAwesomeIcon id="profileIcon" icon={faUser} />
                    </Link>
                </div>
                <button className={createEmail ? "nevidljivo" :"Message"} onClick={newEmail}>naruči</button>
            </div>

            {selectedEmail != null ? (
                //treba promijenit za specijalista da se mail s kartom iscrta!!!!!!!!!!!!!!!!!!!!
                <div className="listContainer">
                    {selectedEmail.tip === "1" && <ReadEmail email={selectedEmail} user={user}/>}
                    {selectedEmail.tip === "4" && <MapHelp sender={medical} receiver={user} email={selectedEmail} />}
                </div>
            ) :createEmail === false ?
                    (<ListContainer items={emails} myfunc={openEmail} currentUser={user? user.oib : ""}/>) :
                    (<div className="listContainer"><ComposeEmail email={{sender: user ? user.oib : "", receiver: medical ? medical.oib : ""}} /></div>)}

        </Container>

        </>
    )
}