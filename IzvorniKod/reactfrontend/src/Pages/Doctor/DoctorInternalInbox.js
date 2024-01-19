import Container from "../Container";
import ListContainer from "../ListContainer";
import {useEffect, useState} from "react";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faHouse} from "@fortawesome/free-solid-svg-icons";
import ReadEmail from "../Messages/ReadEmail";
import {Link, useNavigate} from "react-router-dom";


export default function DoctorInternalInbox({onLogout}) {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [medicEmails, setMedicEmails] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/doctor/me')
            .then(data => data.json())
            .then(data => setUser(data.doktor))
    }, []);

    useEffect(() => {
        fetch('/api/doctor/inbox/internal')
            .then(data => data.json())
            .then(data => setMedicEmails(data))
    }, []);

    const openEmail = (email) => {
        setSelectedEmail(email);
        console.log(email)
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
                        <Link to={"/doctor"} id="logOutText">switch profiles</Link>
                    </div>
                </div>


                <div className="profileName">
                    <div>doktor {user ? user.ime : ""} {user ? user.prezime : ""} [{user ? user.oib : ""}]</div>
                </div>

            </div>


            <Container>

                <div className="listContainer2">
                {selectedEmail != null ? (
                        <div >
                            <ReadEmail email={selectedEmail} user={user}/>
                        </div>
                    ) :
                    (<ul> {
                    medicEmails.length > 0 && (medicEmails.map((item) => (
                        item.tip !== "6" && (
                        <li key={item.id} onClick={() => openEmail(item)}>
                            <span id="emailSender"> {user && user.oib === item.posoib ? "To: " : "From: "} {user && user.oib === item.posoib ? item.prioib : item.posoib} </span>
                            <span id="emailTitle">{item.naslov}</span></li>)
                    )))
                    } </ul>)
                }

                </div>

            </Container>
        </>
    )
}