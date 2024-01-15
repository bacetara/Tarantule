import {useEffect, useState} from "react";
import * as React from "react";
import {useParams} from "react-router-dom";
import InboxMedic from "../Pediatrician/InboxMedic";
export default function PediatricianChildSite() {
    const { oib } = useParams();
    const path = `/api/pediatrician/inbox/${oib}`;
    const [user, setUser] = useState(null);
    const [medical, setMedical] = useState(null);
     const [emails, setEmails] = useState(null);

    useEffect(() => {
        fetch(path)
            .then(data => data.json())
            .then(data => {
                setEmails(data);
            })

        fetch(`/api/pediatrician/me`)
            .then(data => data.json())
            .then(data => {
                setMedical(data.doktor);
            })
    }, [path]);

    return(
        <InboxMedic user={user} medical={medical} emails={emails}/>
    )
}