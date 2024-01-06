import '../Admin/AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";
import Container from "../Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

export default function DodavanjePacijenta2() {
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">doctor [989898899]</div>
            </div>
            <Container>
                <div className="listContainer">
                    <ul>
                        {/*{items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}*/}
                        <li>
                            <Link className="osnovneinfo" to="/doctor">
                                <span className="info">OIB</span>
                                <span className="info"> ime</span>
                                <span className="info"> prezime</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="osnovneinfo" to="/doctor">
                                <span className="info">OIB</span>
                                <span className="info"> ime</span>
                                <span className="info"> prezime</span>
                            </Link>
                        </li>
                    </ul>
                </div>


            </Container>

            <Outlet/>
        </>

    );
}
