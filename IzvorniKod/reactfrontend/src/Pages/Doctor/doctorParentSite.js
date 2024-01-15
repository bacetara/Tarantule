import {useEffect, useState} from "react";
import * as React from "react";
import {useParams} from "react-router-dom";
import InboxMedic from "../Pediatrician/InboxMedic";
export default function DoctorParentSite() {
    const { oib } = useParams();
    const path = `/api/doctor/inbox/${oib}`;
    const [user, setUser] = useState(null); //parent's/child's profile
    const [medical, setMedical] = useState(null); //loged in user == doctor/pediatrician
    const [emails, setEmails] = useState(null);

    useEffect(() => {
        fetch(path)
            .then(data => data.json())
            .then(data => {
                setEmails(data);
            })

        fetch(`/api/doctor/me`)
            .then(data => data.json())
            .then(data => {
                for (var i = 0; i < data.pacijenti.length; i++) {
                    if (data.pacijenti[i].oib === oib) {
                        setUser(data.pacijenti[i])
                        break
                    }
                }
                setMedical(data.doktor);
            })
    }, [path, oib]);

    return(
        <InboxMedic user={user} medical={medical} emails={emails}/>
    )

}