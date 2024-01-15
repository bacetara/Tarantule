import './DodajRoditelja.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

const DodajDijete = () => {
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
    function onSubmit(e) {
        e.preventDefault();
        // setError("");
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
            });
    }

    return (
        <>
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
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
                <div className="info"><label>DOKTOR: </label><select id="dropdown" onChange={handleSelectChange}
                                                                     value="nes">
                    <option value="m"
                            disabled>select someone</option>
                    {/* Map through the 'osoba' array to create dropdown options */}
                    {parents.map((person) => (
                        <option key={person.oib} value={person.oib}>
                            {person.ime} {person.prezime}
                        </option>
                    ))}
                </select>
                </div>
                <div className="info"><label>OIB RODITELJA: </label><input name="rodOib" type="text" value={dijeteForm.rodOib} onChange={onChange}/></div>
                <div className="info"><label>DATUM RODJENJA: </label><input name="datumRod" type="datetime-local" value={dijeteForm.datumRod} onChange={onChange}/></div>


                <div className="buttons_horizontal">
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/admin">Odustani</Link>
                    </div>
                    <div className="addChild">
                        <Link className="link_na_stranicu" to="/admin">Dodaj osobu</Link>
                    </div>
                </div>
            </form>
        </>
    );
};
export default DodajDijete;