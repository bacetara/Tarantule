import '../Admin/AdminPocetna.css'
import {Outlet, Link, useNavigate} from "react-router-dom";
import Container from "../Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faHouse} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useEffect, useState} from "react";

export default function DodavanjePacijenta2() {
    const [unassigned, setUnassigned] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [doctor, setDoctor] = useState(null);

    function selectUser(id) {

        if (isClicked && selected !== id) {
            //do nothing -> someone is already selected
        } else if (isClicked && selected === id) {
            //unselect it
            setIsClicked(false);
            setSelected(null);
        } else if (!isClicked) {
            //new one is clicked
            setIsClicked(true);
            setSelected(id);
        }

    }

    const navigate = useNavigate();


    function sendData() {

        const data = {
            oib : selected
        }

        console.log(data)
        const options = {
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }

        return fetch('/api/doctor/assign', options)
            .then(response => {
                if (response.status === 200){
                    console.log("uspjeh")
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(navigate("/doctor"))
            .catch(err => console.log(err));

    }

    useEffect(() => {
        fetch('/api/doctor/unassigned')
            .then(data => data.json())
            .then(data => setUnassigned(data))
    }, []);

    useEffect(() => {
        fetch('api/doctor/me')
            .then(data => data.json())
            .then(data => setDoctor(data.doktor))
    }, []);



    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>

                    <div className="logOut">
                        <FontAwesomeIcon icon={faHouse} style={{color: "#fcfcfd",}} />
                        <Link to={"/doctor"} id="logOutText">switch profiles</Link>
                    </div>
                </div>

                <div className="profileName"> doktor {doctor?.ime} {doctor?.prezime} [{doctor?.oib}]</div>
            </div>

            <button className="upisPacijenta" disabled={!isClicked} onClick={sendData}>
                Upiši
            </button>

            <Container>
                <div className="listContainer2">
                    <ul>
                        {unassigned && (unassigned.map((item) => (
                            <li key={item.oib} onClick={() => selectUser(item.oib)} id={isClicked ? "selectedUser" : ""}> [{item.oib}] {item.ime} {item.prezime}</li>
                        )))}
                    </ul>
                </div>
            </Container>

            <Outlet/>
        </>

    );
}
