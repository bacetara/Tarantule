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
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [createEmail, setCreateEmail] = useState(false);
    const [info, setInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [medical, setMedical] = useState({});
    const [emails, setEmails] = useState({});


    useEffect(() => {
        fetch('/api/parent/me')
            .then(data => data.json())
            .then(data => {
                setInfo(data);

                if (data.roditelj.oib === oib) {
                    setUser(data.roditelj);
                } else {
                    for (var i = 0; i < data.djeca.length; i++) {
                        if (data.djeca[i].oib === oib) {
                            setUser(data.djeca[i]);
                            break;
                        }
                    }
                }

                if (user) {
                    setMedical(user.doktor);
                }

            })

    }, [oib, user]);

    useEffect(() => {
        if (user) {
            fetch(user.uloga === "roditelj" ? `/api/parent/${oib}` : `/api/parent/child/${oib}`)
                .then(data => data.json())
                .then(data => {
                    if (data)
                        setEmails(data)
                    console.log(emails)
                })
                .catch(error => {
                    console.error('Error fetching child data:', error);
                });
        }
    }, [emails, oib, user]);




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
                    <Link to="/updateInfo">
                        <FontAwesomeIcon id="profileIcon" icon={faUser} />
                    </Link>
                </div>
                <button className={createEmail ? "nevidljivo" :"Message"} onClick={newEmail}>naruči</button>
            </div>

            {selectedEmail != null ? (
                //treba promijenit za specijalista da se mail s kartom iscrta!!!
                <div className="listContainer">
                    {selectedEmail.tip === "1" && <ReadEmail email={selectedEmail} user={user}/>}
                    {selectedEmail.tip === "4" && <ReadEmail email={selectedEmail} user={user}/>}
                    {selectedEmail.tip === "3" && <ReadEmail email={selectedEmail} user={user}/>}
                </div>
            ) :createEmail === false ?
                    (<ListContainer items={emails} myfunc={openEmail}/>) :
                    (<div className="listContainer"><ComposeEmail email={{sender: user ? user.oib : "", receiver: medical ? medical.oib : ""}}/></div>)}

        </Container>

        </>
    )
}