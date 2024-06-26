import '../Admin/AdminPocetna.css'
import {Outlet, Link, useNavigate} from "react-router-dom";
import Container from "../Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useEffect, useState} from "react";

export default function PedijatarPocetna({onLogout}) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('api/pediatrician/me')
            .then(data => data.json())
            .then(data => {
                setData(data);
            })
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
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}} />
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">pedijatar {data?.doktor.ime} {data?.doktor.prezime} [{data?.doktor.oib}]</div>
            </div>

            <Container>
                <div className="buttons">
                    <div className="addParent" > <Link className="link_na_stranicu" to="/addPatient1">Dodaj pacijenta</Link></div>
                </div>

                <div className="listContainer">
                    <ul>
                        {data && data.pacijenti.length > 0 &&(data.pacijenti.map((item) => (
                                <li key={item?.oib}><Link className="link_na_stranicu" to={`/pediatrician/${item.oib}`}>[{item.oib}] {item.ime} {item.prezime}</Link></li>
                        )))}

                    </ul>
                </div>

            </Container>

            <Outlet/>
        </>

    );
}
