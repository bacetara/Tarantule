import './DodajRoditelja.css'
import {Link} from "react-router-dom";

const DodajDijete = () => {
    return (
        <div className="containerdodajroditelja">
            <div>NOVO DIJETE</div>
            <div className="info"><label>IME: </label><input type="text"   /></div>
            <div className="info"><label>PREZIME: </label><input type="text"   /></div>
            <div className="info"><label>OIB: </label><input type="text"   /></div>
            <div className="info"><label>OIB RODITELJA: </label><input type="text"   /></div>
            <div className="info"><label>DATUM RODJENJA: </label><input type="text"   /></div>

            <div className="addPerson"> <Link className="link_na_stranicu" to="/admin">Dodaj osobu</Link> </div>


        </div>
    );
};
export default DodajDijete;