import '../Admin/AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";
import Container from "../Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

export default function PedijatarPocetna() {
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}} />
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">pediatrician [989898899]</div>
            </div>

            <Container>
                <div className="buttons">
                    <div className="addParent" > <Link className="link_na_stranicu" to="/addPatient1">Dodaj pacijenta</Link></div>
                </div>

                <div className="listContainer">
                    <ul>
                        {/*{items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}*/}
                        <li><Link className="link_na_stranicu" to="/pediatrician/${oib_pacijenta}">OIB ime prezime</Link></li>
                    </ul>
                </div>

            </Container>

            <Outlet/>
        </>

    );
}
