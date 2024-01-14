import './AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";
import Container from "../Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from 'react';
import *  as React from "react";



export default function AdminPocetna() {
    const [user, setUser] = React.useState({});
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/admin/me')
            .then(data => data.json())
            .then(user => setUser(user))
            .then(console.log(user))
    }, []);

    React.useEffect(()=>{
        fetch('api/admin/listAll?unregistered=true')
            .then(data => data.json())
            .then(data => setItems(data))
            .then(console.log(items))
    })
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">{user.ime} [{user.oib}]</div>
            </div>
            <Container>
                <div className="buttons">
                    <div className="addParent"><Link className="link_na_stranicu" to="/addchild">Dodaj dijete</Link>
                    </div>
                    <div className="addParent"><Link className="link_na_stranicu" to="/addparent">Dodaj roditelja</Link>
                    </div>
                </div>

                <div className="listContainer">
                    <ul>

                        {items.map((osoba) => (
                            <li key={osoba.oib}><Link className="link_na_stranicu" to={`/information/${osoba.oib}`}>{osoba.oib} {osoba.ime} {osoba.prezime}</Link></li>
                        ))}


                        <li><Link className="link_na_stranicu" to="/Information/">OIB ime prezime</Link></li>
                    </ul>
                </div>

            </Container>

            <Outlet/>
        </>

    );
}
