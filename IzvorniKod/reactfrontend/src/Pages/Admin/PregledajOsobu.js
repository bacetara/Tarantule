import './DodajRoditelja.css'
import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useState} from "react";

const PregledajOsobu = () => {
    const { oib } = useParams();
    const [user, setUser] = React.useState({});
    const [current, setCurrent] = React.useState({});
    const [doctors, setDoctors] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/admin/listAll?type=doktor&unregistered=true')
            .then(data => data.json())
            .then(doctors => setDoctors(doctors))
            // .then(console.log(doctors))
    }, [doctors]);

    React.useEffect(() => {
        fetch('/api/admin/me')
            .then(data => data.json())
            .then(current => setCurrent(current))
            // .then(console.log(current))
    }, [current]);
    var dateOfBirth
    React.useEffect(() => {
        fetch(`/api/admin/viewPerson/${oib}`)
            .then(data => data.json())
            .then(user => setUser(user))
            .then(() => { dateOfBirth = new Date(user.datumRod);
            // console.log(dateOfBirth)
            })
    }, [oib]);

    function onChange(event) {
        console.log("jdksjfh")
        const {name, value} = event.target;
        setUser(oldForm => ({...oldForm, [name]: value}));
    }

    const handleSelectChange = (event) => {
        const oib = event.target.value;
        console.log(oib)
        let noviDoktor = null;
        doctors.forEach(doctor => {if(doctor.oib == oib){
            noviDoktor = doctor;

            }
        })

        // Set the selected doctor in the user state
        setUser(oldForm => ({...oldForm, doktor: noviDoktor }));

        console.log(noviDoktor)
    };
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">{current.ime}  {current.prezime} [{current.oib}]</div>
            </div>
            <form className="containerdodajroditelja">

                <div className="info"><label>ULOGA: </label><input onChange={onChange} name="uloga" type="text" value={user.uloga}/> </div>
                <div className="info"><label>IME: </label><input onChange={onChange} name="ime" type="text" value={user.ime}/> </div>
                <div className="info"><label>PREZIME: </label><input onChange={onChange} name="prezime" type="text" value={user.prezime}/> </div>
                <div className="info"><label>OIB: </label><input onChange={onChange} name="oib" type="text" value={user.oib}/> </div>
                <div className="info"><label>ADRESA: </label><input onChange={onChange} name="adresa" type="text" value={user.adresa}/> </div>
                #TREBA OMOGUČIT PRIKAZIVANJE UPISANOG VREMENA IZ BAZE#
                <div className="info"><label>DATUM ROĐENJA: </label><input onChange={onChange} name="datumRod" type="datetime-local"
                                                                           value={dateOfBirth}/></div>
                <div className="info"><label>MAIL USTANOVE: </label><input onChange={onChange} name="mail" type="text" value={user.mail}/>
                </div>
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
                </div>

                <div className="buttons_horizontal">
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/admin">Odustani</Link>
                    </div>
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/admin">Obriši</Link>
                    </div>
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/admin">Pohrani</Link>
                    </div>
                </div>

            </form>

        </>
    );
};
export default PregledajOsobu;