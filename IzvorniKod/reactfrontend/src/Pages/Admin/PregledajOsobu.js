import './DodajRoditelja.css'
import {Link} from "react-router-dom";

const PregledajOsobu = () => {
    return (
        <form className="containerdodajroditelja">

            <div className="info"><label>ULOGA: </label><input name="role" type="text"/></div>
            <div className="info"><label>IME: </label><input name="firstname" type="text"/></div>
            <div className="info"><label>PREZIME: </label><input name="lastname" type="text"/></div>
            <div className="info"><label>OIB: </label><input name="oib" type="text"/></div>
            <div className="info"><label>ADRESA: </label><input name="adress" type="text"/></div>
            <div className="info"><label>DATUM ROĐENJA: </label><input name="dateofbirth" type="date"/></div>
            <div className="info"><label>MAIL USTANOVE: </label><input name="email" type="text"/></div>
            <div className="info"><label>DOKTOR: </label><input name="doctor" type="text"/></div>


            <div className="addPerson"><Link className="link_na_stranicu" to="/admin">Obriši</Link><Link
                className="link_na_stranicu" to="/admin">Pohrani</Link></div>


        </form>
    );
};
export default PregledajOsobu;