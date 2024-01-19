import './DodajRoditelja.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

const DodajRoditelja = ({onLogout}) => {
    const [roditeljForm, setRoditeljForm] = React.useState({ime : '', prezime: '', oib: '', datumRod: ''});

    function onChange(event) {
        const {name, value} = event.target;
        const updatedValue = value === null ? '' : value;

        setRoditeljForm(oldForm => ({...oldForm, [name]: updatedValue}));
    }

    const navigate = useNavigate();
    function onSubmit(e) {
        e.preventDefault();
        // setError("");
        console.log("tu")
        const data = {
            oib: roditeljForm.oib,
            prezime: roditeljForm.prezime,
            ime: roditeljForm.ime,
            datumRod: roditeljForm.datumRod
        };

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch('/api/admin/addParent', options)
            .then(response => {
                if (response.status === 200) {
                    console.log("uspjeh")
                } else {
                    console.log(roditeljForm)
                    // setError("Neuspjela prijava.");
                    throw new Error("status 400!")
                }
            })
            .then(navigate("/admin"))
            .catch(error => {
                console.error(error);
            });
    }

    const onLogOutFunction = () => {
        onLogout();
        navigate("/");
    }


    return (
        <>
            <div className="header">
                <div className="backOptions" onClick={() => onLogOutFunction()}>
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">admin [989898899]</div>
            </div>
            <form className="containerdodajroditelja" onSubmit={onSubmit}>
                <div>NOVI RODITELJ</div>
                <div className="info"><label>IME: </label><input name="ime" type="text" value={roditeljForm.ime} onChange={onChange}/></div>
                <div className="info"><label>PREZIME: </label><input name="prezime" type="text" value={roditeljForm.prezime} onChange={onChange}/></div>
                <div className="info"><label>OIB: </label><input name="oib" type="text" value={roditeljForm.oib} onChange={onChange}/></div>
                <div className="info"><label>DATUM RODJENJA: </label><input name="datumRod" type="datetime-local" value={roditeljForm.datumRod} onChange={onChange}/></div>
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
export default DodajRoditelja;