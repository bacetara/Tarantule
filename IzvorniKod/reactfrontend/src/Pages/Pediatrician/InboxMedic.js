import './InboxPedijatar.css'
import Container from "../Container";
import ListContainer from "../ListContainer";
import {useEffect, useState} from "react";
import * as React from "react";
import PediatricianEmail from "../Messages/PediatricianEmail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faHouse, faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import ReadEmail from "../Messages/ReadEmail";
import {Link, useNavigate, useParams} from "react-router-dom";


export default function InboxMedic({user, medical, emails, onLogout}) {
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

    return(
        <>
        <div className="header">

            <div className="backOptions">
                <div className="logOut" onClick={() => onLogOutFunction()}>
                    <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}} />
                    <p id="logOutText">log out</p>
                </div>

                <div className="logOut">
                    <FontAwesomeIcon icon={faHouse} style={{color: "#fcfcfd",}} />
                    <Link to={medical && medical.uloga==="pedijatar" ? "/pediatrician" : "/doctor"} id="logOutText">switch profiles</Link>
                </div>
            </div>


            <div className="profileName">
                <div>{user?.ime} {user?.prezime} {user?.oib}</div>
                <div>({medical?.uloga} {medical ? medical.oib : ""})</div>
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
                        {selectedEmail.tip === '1' && <ReadEmail email={selectedEmail} user={medical}/>}
                        {selectedEmail.tip === '4' && <ReadEmail email={selectedEmail} user={medical}/>}
                        {selectedEmail.tip === '3' && <ReadEmail email={selectedEmail} user={medical}/>}
                    </div>
                ) :
                createEmail === false ? emails ?
                    (<ListContainer items={emails} myfunc={openEmail} currentUser={medical? medical.oib : ""}/>) : null :
                    (<div className="listContainer">
                        <PediatricianEmail sender={medical ? medical : ""} receiver={user ? user : ""}/>
                    </div>)}


        </Container>
            </>
    )
}