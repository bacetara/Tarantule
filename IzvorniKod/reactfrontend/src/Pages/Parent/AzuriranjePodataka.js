import '../Admin/DodajRoditelja.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

const AzuriranjePodataka= () => {
    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">parent [989898899]</div>
            </div>
            <form className="containerdodajroditelja">
                {/*ovisno o tome prikazujem li roditelja ili dijete (to gledam u roleu), radim neke drukcijje stvari u prikazu*/}
                <div>PROMJENA PODATAKA</div>
                <div className="info"><label>IME: </label>{/*<input name="firstname" type="text"   />*/}</div>
                <div className="info"><label>PREZIME: </label>{/*<input name="lastname" type="text"   />*/}</div>
                <div className="info"><label>OIB: </label>{/*<input name="oib" type="text"/>*/}</div>
                <div className="info"><label>DATUM ROĐENJA: </label>{/*<input name="dateofbirth" type="date"/>*/}</div>
                <div className="info"><label>ADRESA: </label><input name="adress" type="text"/></div>
                <div className="info"><label>MAIL USTANOVE: </label><input name="email" type="text"/></div>

                <div className="buttons_horizontal">
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/parentInfo">Odustani</Link>
                    </div>
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/parentInfo">Ažuriraj</Link>
                    </div>
                </div>


            </form>
        </>
    );
};
export default AzuriranjePodataka;