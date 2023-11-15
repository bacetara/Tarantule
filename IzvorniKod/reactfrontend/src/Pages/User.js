import *  as React from "react";

export default function User() {

    const [user, setUser] = React.useState({oib : '', ime : '', prezime : '', mail : '', datumRod : '', adresa : '', adminPrava : '', lozinkaHash : '', uloga : '', roditelj : '', doktor : ''});

    React.useEffect(() => {
        fetch('/api/user')
        .then(data => data.json())
        .then(user => setUser(user))
    }, []);

    return (
        <>
            <p>Dobro došli {user.ime} {user.prezime}</p>
            <p>Tvoja uloga je {user.uloga}</p>
        </>
    )
}