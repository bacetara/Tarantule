import '../Admin/DodajRoditelja.css'
import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useNavigate } from 'react-router-dom';

const AzuriranjePodataka= () => {
    const { oib } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = React.useState({});

    var dijete = 0;

    React.useEffect(() => {
        fetch(`/api/parent/me`)
            .then(data => data.json())
            .then(data => {
                if (data.roditelj.oib === oib){
                    setUser(data.roditelj)
                    dijete = 0
                }else{
                for (var i = 0; i < data.djeca.length; i++) {
                    if (data.djeca[i].oib === oib) {
                        setUser(data.djeca[i]);
                        dijete=1;
                        break
                    }
                }
            }}
                )

    }, [oib]);

    function onChange(event) {
        console.log("jdksjfh")
        const {name, value} = event.target;
        const updatedValue = value === null ? '' : value;
        setUser(oldForm => ({...oldForm, [name]: updatedValue}));
    }

    const handleClick = () => {
        navigate(-1);
    };

    function onSubmit(e){
        e.preventDefault();
        console.log(user.adresa)
        // setError("");
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
            roditelj: dijete===1? user.roditelj:null

        }
        console.log(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch(`/api/parent/${dijete === 1?`child/${oib}`:"me"}`, options)
            .then(response => {
                if (response.status === 200) {
                    console.log("usojeh")
                    return response.json();
                } else {
                    // setError("Neuspjela prijava.");
                    throw new Error("status 400!")
                }
            })
            .then(
                navigate(-1)

            )
            .catch(error => {
                // console.error (error);
            });
    }


    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">{user ? user.ime : ""} {user ? user.prezime : ""} [{user ? user.oib : ""}]</div>
            </div>
            <form className="containerdodajroditelja" onSubmit={onSubmit}>
                {/*ovisno o tome prikazujem li roditelja ili dijete (to gledam u roleu), radim neke drukcijje stvari u prikazu*/}
                <div>PROMJENA PODATAKA</div>
                <div className="info"><label>IME: </label><input  name="ime" type="text" value={user.ime} disabled={true} /></div>
                <div className="info"><label>PREZIME: </label><input name="prezime" type="text" value={user.prezime} disabled={true} /></div>
                <div className="info"><label>OIB: </label><input name="oib" type="text" value={user.oib} disabled={true}/></div>
                <div className="info"><label>DATUM ROĐENJA: </label><input name="datumRod" type="text" value={user.datumRod} disabled={true}/></div>
                <div className="info"><label>ADRESA: </label><input name="adresa" type="text" value={user.adresa} onChange={onChange}/></div>
                <div className="info"><label>MAIL USTANOVE: </label><input name="mail" type="text" value={user.mail} onChange={onChange}/></div>

                <div className="buttons_horizontal">
                    <div className="addChild" onClick={handleClick}>
                        <span className="link_na_stranicu">Odustani</span>
                    </div>
                    <div className="addChild" onClick={handleClick}>
                        <span className="link_na_stranicu">Ažuriraj</span>
                    </div>
                    <button onSubmit={onSubmit} disabled={false} className="addChild">
                        spremi
                    </button>
                </div>


            </form>
        </>
    );
};
export default AzuriranjePodataka;