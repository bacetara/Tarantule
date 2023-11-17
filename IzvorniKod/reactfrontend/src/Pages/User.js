import *  as React from "react";
import './User.css'
export default function User() {

    const [user, setUser] = React.useState({oib : '', ime : '', prezime : '', mail : '', datumRod : '', adresa : '', adminPrava : '', lozinkaHash : '', uloga : '', roditelj : '', doktor : ''});

    React.useEffect(() => {
        fetch('/api/user')
        .then(data => data.json())
        .then(user => setUser(user))
    }, []);

    return (
        <div className="dobrodoslica">
            <div className="box">
            <p>Dobro došli</p>

            </div>
        </div>
    )
}