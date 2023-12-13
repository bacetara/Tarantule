import '../Admin/AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";

export default function DodavanjePacijenta1() {
    return (
        <>
            <div className="containeradmin">
                <div className="listContainerDodavanje">
                    <ul>
                        {/*{items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}*/}
                        <li>
                            <Link className="osnovneinfo" to="/pediatrician">
                                <span className="info">OIB</span>
                                <span className="info"> ime</span>
                                <span className="info"> prezime</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="osnovneinfo" to="/pediatrician">
                                <span className="info">OIB</span>
                                <span className="info"> ime</span>
                                <span className="info"> prezime</span>
                            </Link>
                        </li>
                    </ul>
                </div>


            </div>

            <Outlet/>
        </>

    );
}
