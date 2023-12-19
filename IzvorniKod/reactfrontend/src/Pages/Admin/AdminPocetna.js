import './AdminPocetna.css'
import {Outlet, Link} from "react-router-dom";
import Container from "../Container";

export default function AdminPocetna() {
    return (
        <>
            <Container>
                <div className="listContainer">
                    <ul>
                        {/*{items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}*/}
                        <li><Link className="link_na_stranicu" to="/Information">OIB ime prezime</Link></li>
                    </ul>
                </div>
                <div className="buttons">
                    <div className="addChild" > <Link className="link_na_stranicu" to="/addchild">Dodaj dijete</Link></div>
                    <div className="addParent"> <Link className="link_na_stranicu" to="/addparent">Dodaj roditelja</Link> </div>
                </div>
            </Container>

            <Outlet/>
        </>

    );
}
