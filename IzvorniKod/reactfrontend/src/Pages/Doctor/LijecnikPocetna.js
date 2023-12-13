import '../Admin/AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";

export default function LijecnikPocetna() {
    return (
        <>
            <div className="containeradmin">
                <div className="listContainer">
                    <ul>
                        {/*{items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}*/}
                        <li><Link className="link_na_stranicu" to="/PRIKAZMEJLOVATOGPACIJENTA">OIB ime prezime</Link></li>
                    </ul>
                </div>




                <div className="buttons">
                    <div className="addChild" > <Link className="link_na_stranicu" to="/addPatient2">Dodaj pacijenta</Link></div>
                </div>
            </div>

            <Outlet/>
        </>

    );
}
