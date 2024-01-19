import './Inbox.css'
import {useEffect, useState} from "react";
import * as React from "react";
import {useParams} from "react-router-dom";
import InboxUser from "./InboxUser";
export default function ParentSite({onLogout}) {
    const { oib } = useParams();
    const pathParent = `/api/parent/${oib}`;
    const [user, setUser] = useState(null);
    const [medical, setMedical] = useState({});
    const [emails, setEmails] = useState({});

    useEffect(() => {
        fetch('/api/parent/me')
            .then(data => data.json())
            .then(data => {
                setMedical(data.roditelj.doktor);
                setUser(data.roditelj);
            })
    }, []);

    useEffect(() => {
        fetch(pathParent)
            .then(data => data.json())
            .then(data => {
                setEmails(data);
            })
    }, [pathParent]);

    return (
        <InboxUser user={user} emails={emails} medical={medical} onLogout={onLogout}/>
    )
}

