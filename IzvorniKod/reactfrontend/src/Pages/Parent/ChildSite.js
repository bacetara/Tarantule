import './Inbox.css'
import {useEffect, useState} from "react";
import * as React from "react";
import {useParams} from "react-router-dom";
import InboxUser from "./InboxUser";
export default function ChildSite({osoba}) {
    const {oib } = useParams();
    const pathChild = `/api/parent/child/${oib}`;
    const [user, setUser] = useState(null);
    const [medical, setMedical] = useState({});
    const [emails, setEmails] = useState({});

    useEffect(() => {
        fetch('/api/parent/me')
            .then(data => data.json())
            .then(data => {
                for (var i = 0; i < data.djeca.length; i++) {
                    if (data.djeca[i].oib === oib) {
                        setUser(data.djeca[i]);
                        setMedical(data.djeca[i].doktor);
                    }
                }
            })
    }, [oib]);

    useEffect(() => {
        fetch(pathChild)
            .then(data => data.json())
            .then(data => {
                setEmails(data.poruke);
            })
    }, [pathChild]);

    return (
        <InboxUser user={user} emails={emails} medical={medical}/>
    )
}

