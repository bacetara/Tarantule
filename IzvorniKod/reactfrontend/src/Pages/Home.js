import './Home.css'
import {Outlet, Link} from "react-router-dom";

export default function home() {
    return (
        <>
            <div className="header">

                <div className="logo"> logo </div>
                <div className="gumbi">
                    <div className="register" > <Link className="link_na_stranicu" to="/login">registracija</Link></div>
                    <div className="login"> <Link className="link_na_stranicu" to="/login">prijava</Link> </div>
                </div>

            </div>

            <div className="textbox">
                Dobro došli na aplikaciju <i style={{ color: '#65B58A' }}>Ozdravi</i>.. platformu koja sjedinjuje moderne doktore i roditelje djece koja će uskoro ozdraviti.
            </div>

            <Outlet/>
        </>

    );
}