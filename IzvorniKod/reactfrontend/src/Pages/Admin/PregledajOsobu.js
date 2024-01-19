import './DodajRoditelja.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useState} from "react";
import dodajRoditelja from "./DodajRoditelja";

const PregledajOsobu = ({onLogout}) => {
    const { oib } = useParams();
    const [user, setUser] = React.useState({});
    const [current, setCurrent] = React.useState({});
    const [doctors, setDoctors] = React.useState([]);

    React.useEffect(() => {
        fetch(`/api/admin/listAll?type=${user.uloga === "dijete"? "pedijatar" : ""}${user.uloga === "roditelj"? "doktor" : ""}&unregistered=true`)
            .then(data => data.json())
            .then(doctors => setDoctors(doctors))
             //.then(console.log(doctors))
    }, [user.uloga]);

    React.useEffect(() => {
        fetch('/api/admin/me')
            .then(data => data.json())
            .then(current => setCurrent(current))
            // .then(console.log(current))
    }, []);


    React.useEffect(() => {
        fetch(`/api/admin/viewPerson/${oib}`)
            .then(data => data.json())
            .then(user => setUser(user))
    }, [oib]);

    function onChange(event) {
        console.log("jdksjfh")
        const {name, value} = event.target;
        const updatedValue = value === null ? '' : value;
        setUser(oldForm => ({...oldForm, [name]: updatedValue}));
    }

    const handleSelectChange = (event) => {
        const oib = event.target.value;
        console.log(oib)
        let noviDoktor = null;
        doctors.forEach(doctor => {if(doctor.oib === oib){
            noviDoktor = doctor;

            }
        })

        // Set the selected doctor in the user state
        setUser(oldForm => ({...oldForm, doktor: noviDoktor }));

        //console.log(noviDoktor)
    };

    const navigate = useNavigate();


    /*function isValid(){
        const {oib, password} = User;
        let valid = oib.match("[0-9]{11}") && password.length >= 5;
        return valid;
    }*/

    function DeletePerson(e){
        e.preventDefault();
        //console.log(user.adresa)
        // setError("");
        const data = {
            oib: null,
            ime: user.ime,
            prezime: user.prezime,
            uloga: user.uloga,
            adresa: user.adresa,
            datumRod: user.datumRod,
            mail: user.mail,
            doktor: user.doktor,
            adminPrav: user.adminPrav,
            lozinkaHash: user.lozinkaHash,
            roditelj: user.roditelj
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch(`/api/admin/viewPerson/${oib}`, options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    // setError("Neuspjela prijava.");
                    throw new Error("status 400!")
                }
            })
            .then(
                navigate("/admin")

            )
            .catch(error => {
                // console.error (error);
            });
    }
    const isValidEmail = (email) => {
        // Regular expression for a basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (emailPattern.test(email) || email === "" || email === null);
    };

    const isValidOIB = (oib) => {
        // Regular expression for 11-digit numeric input
        const oibPattern = /^\d{11}$/;
        return oibPattern.test(oib);
    };

    function onSubmit(e){
        e.preventDefault();
        //console.log(user.adresa)
        // setError("");

        if(isValidEmail(user.mail) && isValidOIB(user.oib)){

        const data = {
            oib: user.oib,
            ime: user.ime,
            prezime: user.prezime,
            uloga: user.uloga,
            adresa: user.adresa,
            datumRod: user.datumRod,
            mail: user.mail,
            doktor: user.doktor,
            adminPrav: user.adminPrav,
            lozinkaHash: user.lozinkaHash,
            roditelj: user.roditelj
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch(`/api/admin/viewPerson/${oib}`, options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    // setError("Neuspjela prijava.");
                    throw new Error("status 400!")
                }
            })
            .then(
                        navigate("/admin")

            )
            .catch(error => {
                // console.error (error);
            });}
    }

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

                <div className="profileName">{current.ime}  {current.prezime} [{current.oib}]</div>
            </div>
            <form className="containerdodajroditelja" onSubmit={onSubmit}>

                <div className="info"><label>ULOGA: </label><input onChange={onChange} name="uloga" type="text" value={user.uloga}/> </div>
                <div className="info"><label>IME: </label><input onChange={onChange} name="ime" type="text" value={user.ime}/> </div>
                <div className="info"><label>PREZIME: </label><input onChange={onChange} name="prezime" type="text" value={user.prezime}/> </div>
                <div className="info"><label>OIB: </label><input onChange={onChange} name="oib" type="text" value={user.oib}/> </div>
                {isValidOIB(user.oib) ? null : <p style={{ color: 'red' }}>OIB more imati 11 znamenki</p>}
                <div className="info"><label>ADRESA: </label><input onChange={onChange} name="adresa" type="text" value={user.adresa} /> </div>
                <div className="info"><label>DATUM ROĐENJA: </label><input onChange={onChange} name="datumRod" type="datetime-local"
                                                                           value={user && user.datumRod ? user.datumRod.slice(0, 16) : ''}/></div>
                {user.uloga === "dijete" || user.uloga ==="roditelj" ?
                    <><div className="info"><label>MAIL USTANOVE: </label><input onChange={onChange} name="mail" type="text" value={user.mail}/></div>
                        {isValidEmail(user.mail) ? null : <p style={{ color: 'red' }}>Krivo napisan email</p>}
                        <div className="info"><label>DOKTOR: </label><select id="dropdown" onChange={handleSelectChange}
                                                                         value={user.doktor ? `${user.doktor.ime} ${user.doktor.prezime}` : ''}>
                        <option value={user.doktor ? `${user.doktor.ime} ${user.doktor.prezime}` : ''}
                                disabled>{user.doktor ? `${user.doktor.ime} ${user.doktor.prezime}` : 'select someone'}</option>
                        {/* Map through the 'osoba' array to create dropdown options */}
                        {doctors.map((person) => (
                            <option key={person.oib} value={person.oib}>
                                {person.ime} {person.prezime}
                            </option>
                        ))}
                    </select>
                    </div> </> : ""
                }
                <div className="buttons_horizontal">
                    <div className="addChild">
                    <Link className="link_na_stranicu" to="/admin">Odustani</Link>
                    </div>
                    <div className="addChild">
                        <Link className="link_na_stranicu" onClick={DeletePerson} to="/admin">Obriši</Link>
                    </div>

                    <button onSubmit={onSubmit} disabled={false} className="addChild" >
                        spremi
                    </button>

                </div>

            </form>

        </>
    );
};
export default PregledajOsobu;