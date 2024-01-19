import '../Admin/AdminPocetna.css'
import {Outlet, Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import Container from "../Container";
import {useEffect, useState} from "react";
import DoctorInternalInbox from "./DoctorInternalInbox";

export default function LijecnikPocetna({onLogout}) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('api/doctor/me')
            .then(data => data.json())
            .then(data => setData(data))
    }, []);

    const onLogOutFunction = () => {
        onLogout();
        navigate("/");
    }

    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut" onClick={() => onLogOutFunction()}>
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">doktor {data?.doktor.ime} {data?.doktor.prezime}[{data?.doktor.oib}]</div>
            </div>


            <Container>
                <div className="buttons">
                    <div className="addParent"><Link className="link_na_stranicu" to="/addPatient2">Dodaj
                        pacijenta</Link></div>
                </div>

                <div className="listContainer">
                    <ul>
                        <li key={"doktor"} id="myInbox"><Link className="link_na_stranicu" to={'/doktor/inbox'}>Osobni mailovi</Link></li>

                        {data && (
                            data.pacijenti.map((item) => (
                                    <li key={item.oib}><Link className="link_na_stranicu" to={`/doctor/${item.oib}`}> {item.oib} {item.ime} {item.prezime}</Link></li>
                                ))
                        )}
                    </ul>
                </div>
            </Container>

            <Outlet/>
        </>

    );
}
