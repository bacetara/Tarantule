import './DodajRoditelja.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

const DodajDijete = ({onLogout}) => {
    const [dijeteForm, setDijeteForm] = React.useState({ime : '', prezime: '', oib: '', datumRod: '', rodOib:''});
    const [parents, setParents] = React.useState([]);


    React.useEffect(() => {
        fetch(`/api/admin/listAll?type=roditelj&unregistered=true`)
            .then(data => data.json())
            .then(parents => setParents(parents))
        //.then(console.log(doctors))
    }, []);

    function onChange(event) {
        const {name, value} = event.target;
        const updatedValue = value === null ? '' : value;

        setDijeteForm(oldForm => ({...oldForm, [name]: updatedValue}));
    }

    const handleSelectChange = (event) => {
        const oib = event.target.value;
        console.log(oib)
        const updatedValue = oib === null ? '' : oib;

        // NEKI VRAG JE TU PODCRTAN
        setDijeteForm(oldForm => ({...oldForm, rodOib: updatedValue }));

        //console.log(noviDoktor)
    };

    const navigate = useNavigate();

    const isValidOIB = (oib) => {
        // Regular expression for 11-digit numeric input
        const oibPattern = /^\d{11}$/;
        return (oibPattern.test(oib) || oib === "" || oib === null);
    };

    function onSubmit(e) {
        e.preventDefault();
        // setError("");

        if(isValidOIB(dijeteForm.oib)){
        console.log("tu")
        const data = {
            oib: dijeteForm.oib,
            prezime: dijeteForm.prezime,
            ime: dijeteForm.ime,
            datumRod: dijeteForm.datumRod,
            rodOib: dijeteForm.rodOib
        };

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch('/api/admin/addChild', options)
            .then(response => {
                if (response.status === 200) {
                    console.log("uspjeh")
                } else {
                    console.log(dijeteForm)
                    // setError("Neuspjela prijava.");
                    throw new Error("status 400!")
                }
            })
            .then(navigate("/admin"))
            .catch(error => {
                console.error(error);
            });}
    }

    const onLogOutFunction = () => {
        onLogout();
        navigate("/");
    }


    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut" onClick={() => onLogOutFunction()}>
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">admin [989898899]</div>
            </div>
            <form className="containerdodajroditelja" onSubmit={onSubmit}>

                <div>NOVO DIJETE</div>
                <div className="info"><label>IME: </label><input name="ime" type="text" value={dijeteForm.ime} onChange={onChange}/></div>
                <div className="info"><label>PREZIME: </label><input name="prezime" type="text" value={dijeteForm.prezime} onChange={onChange}/></div>
                <div className="info"><label>OIB: </label><input name="oib" type="text" value={dijeteForm.oib} onChange={onChange}/></div>
                {isValidOIB(dijeteForm.oib) ? null : <p style={{ color: 'red' }}>OIB mora imati 11 znamenki</p>}
                <div className="info"><label>OIB RODITELJA: </label><select id="dropdown" onChange={handleSelectChange}
                                                                     value={dijeteForm.rodOib}>
                    <option value={dijeteForm.rodOib}
                            disabled>{dijeteForm.rodOib}</option>
                    {/* Map through the 'osoba' array to create dropdown options */}
                    {parents.map((person) => (
                        <option key={person.oib} value={person.oib}>
                            {person.oib}
                        </option>
                    ))}
                </select>
                </div>
                {/*<div className="info"><label>OIB RODITELJA: </label><input name="rodOib" type="text" value={dijeteForm.rodOib} onChange={onChange}/></div>*/}
                <div className="info"><label>DATUM RODJENJA: </label><input name="datumRod" type="datetime-local" value={dijeteForm.datumRod} onChange={onChange}/></div>


                <div className="buttons_horizontal">
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/admin">Odustani</Link>
                    </div>

                    <button onSubmit={onSubmit} disabled={false} className="addChild">
                        spremi
                    </button>
                </div>
            </form>
        </>
    );
};
export default DodajDijete;