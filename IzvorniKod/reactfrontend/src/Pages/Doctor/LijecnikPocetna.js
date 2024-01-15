import '../Admin/AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import Container from "../Container";
import {useEffect, useState} from "react";

export default function LijecnikPocetna() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('api/doctor/me')
            .then(data => data.json())
            .then(data => setData(data))
    }, []);
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
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
