import './DodajRoditelja.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

const PregledajOsobu = () => {
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">admin [989898899]</div>
            </div>
            <form className="containerdodajroditelja">

                <div className="info"><label>ULOGA: </label><input name="role" type="text"/></div>
                <div className="info"><label>IME: </label><input name="firstname" type="text"/></div>
                <div className="info"><label>PREZIME: </label><input name="lastname" type="text"/></div>
                <div className="info"><label>OIB: </label><input name="oib" type="text"/></div>
                <div className="info"><label>ADRESA: </label><input name="adress" type="text"/></div>
                <div className="info"><label>DATUM ROĐENJA: </label><input name="dateofbirth" type="date"/></div>
                <div className="info"><label>MAIL USTANOVE: </label><input name="email" type="text"/></div>
                <div className="info"><label>DOKTOR: </label><input name="doctor" type="text"/></div>


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