import '../Admin/DodajRoditelja.css'
import {Link} from "react-router-dom";

const AzuriranjePodataka= () => {
    return (
        <form className="containerdodajroditelja">
            {/*ovisno o tome prikazujem li roditelja ili dijete (to gledam u roleu), radim neke drukcijje stvari u prikazu*/}
            <div>PROMJENA PODATAKA</div>
            <div className="info"><label>IME: </label>{/*<input name="firstname" type="text"   />*/}</div>
            <div className="info"><label>PREZIME: </label>{/*<input name="lastname" type="text"   />*/}</div>
            <div className="info"><label>OIB: </label>{/*<input name="oib" type="text"/>*/}</div>
            <div className="info"><label>DATUM ROĐENJA: </label>{/*<input name="dateofbirth" type="date"/>*/}</div>
            <div className="info"><label>ADRESA: </label><input name="adress" type="text"/></div>
            <div className="info"><label>MAIL USTANOVE: </label><input name="email" type="text"/></div>

            <div className="addPerson"><Link className="link_na_stranicu" to="/admin">Ažuriraj</Link></div>


        </form>
    );
};
export default AzuriranjePodataka;