import './Home.css'
import {Outlet, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStaffSnake} from "@fortawesome/free-solid-svg-icons";

export default function home() {
    return (
        <>

            <div className="header">

                <FontAwesomeIcon className="logo" icon={faStaffSnake} style={{color: "#65b58a",}} />
                <div className="gumbi">
                    <div className="gumb" id="register" > <Link className="link_na_stranicu" to="/login">registracija</Link></div>
                    <div className="gumb" id="login"> <Link className="link_na_stranicu" to="/login">prijava</Link> </div>
                </div>

            </div>

            <div className="textbox">
                Dobro došli na aplikaciju <i style={{ color: '#65B58A' }}>Ozdravi</i>... <br/> platformu koja sjedinjuje moderne doktore i roditelje djece koja će uskoro ozdraviti!
            </div>

            <Outlet/>
        </>

    );
}