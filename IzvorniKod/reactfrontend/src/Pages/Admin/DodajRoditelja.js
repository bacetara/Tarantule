import './DodajRoditelja.css'
import {Link} from "react-router-dom";

const DodajRoditelja = () => {
    return (
        <div className="containerdodajroditelja">
            <div>NOVI RODITELJ</div>
            <div className="info"><label>IME: </label><input name="firstname" type="text"   /></div>
            <div className="info"><label>PREZIME: </label><input name="lastname" type="text"   /></div>
            <div className="info"><label>OIB: </label><input name="oib" type="text"   /></div>
            <div className="info"><label>DATUM RODJENJA: </label><input name="dateofbirth" type="date"   /></div>

            <div className="addPerson"> <Link className="link_na_stranicu" to="/admin">Dodaj osobu</Link> </div>


        </div>
    );
};
export default DodajRoditelja;