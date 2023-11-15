import React from 'react';
import './Login.css'
import {useNavigate} from "react-router-dom";

const Register = ()  => {
    const [loginForm, setLoginForm] = React.useState({oib : '', password: ''});
    const [error, setError] = React.useState('');

    function onChange(event) {
        const {name, value} = event.target;
        setLoginForm(oldForm => ({...oldForm, [name]: value}));
    }

    function isValid(){
        const {oib, password} = loginForm;
        let valid = oib.match("[0-9]{11}") && password.length >= 5;
        return valid;
    }

    function  errorcheck() {
        if (!isValid())
            setError("Lozinka mora sadržavati minimalno 5 znakova. OIB se sastoji od 11 znamenaka.")
        else
            (setError(""))
    }

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/")
    }

    function onSubmit(e){
        e.preventDefault();
        setError("");

        const data = {
            oib: loginForm.oib,
            password: loginForm.password
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data)
        };

        return fetch('/api/register', options)
            .then(response => {
                if (response.status === 400) {
                    setError("Neuspjela registracija.");
                    throw new Error("status 400!")
                } else
                    return response.json();
            })
            .then(data => {
                if (data) {
                    return (
                        <>
                            <p>Dobro došli {data.ime} {data.prezime}</p>
                            <p>Vaša uloga je {data.uloga}</p>
                        </>);
                }
            })
            .catch(error => {
                console.error (error);
            });
    }


    return (
        <form className="container" onSubmit={onSubmit}>
            <div className="text">OIB
            </div>
            <div>
                <input name='oib' value={loginForm.oib} onChange={onChange} className="oib" type="text" />
            </div>
            <div className="text">lozinka</div>
            <div>
                <input name='password' value={loginForm.password} onChange={onChange} className="lozinka" type="password" />
            </div>
            <div className="error" >
                {error}
            </div>
            <div className="loginbuttons">
                <button  className="loginbutton" onClick={handleClick}>
                    odustani
                </button>
                <button type="submit" disabled={!isValid()} className="loginbutton" onMouseOver={errorcheck}>
                    registracija
                </button>
            </div>

        </form>
    );
};
export default Register;