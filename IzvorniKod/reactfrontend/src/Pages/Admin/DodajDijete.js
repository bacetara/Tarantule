import './DodajRoditelja.css'
import {Link} from "react-router-dom";


/*function onSubmit(e){
    e.preventDefault();
    const data ={
        firstname: ,
        lastname: ,
        oib: ,
        oibParent:,
        birthdate:
    };

    const options = {
        method: POST;
        headers:{

        }
        body:
    }
}*/



const DodajDijete = () => {
    return (
        <div className="containerdodajroditelja">
            <form >
            <div>NOVO DIJETE</div>
            <div className="info"><label>IME: </label><input name="firstname" type="text"   /></div>
            <div className="info"><label>PREZIME: </label><input name="lastname" type="text"   /></div>
            <div className="info"><label>OIB: </label><input name="oib" type="text"   /></div>
            <div className="info"><label>OIB RODITELJA: </label><input name="oibparent" type="text"   /></div>
            <div className="info"><label>DATUM RODJENJA: </label><input name="birthdate" type="date"   /></div>
        </form>
            <div className="addPerson"> <Link className="link_na_stranicu" to="/admin">Dodaj osobu</Link> </div>


        </div>
    );
};
export default DodajDijete;