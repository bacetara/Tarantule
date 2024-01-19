import React, {useState} from 'react';
import './Message.css'
import ComposeEmail from "./ComposeEmail";
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const ReadEmail = ({email, user}) => {

    const history = useNavigate();
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        sender: email.posoib || '',
        receiver: email.prioib || '',
        title: email.naslov || '',
        messageBody: email.tijelo || '',
    });
    const [createReplyEmail, setCreateReplyEmail] = useState(false);

    const handleChange = (e) => {
        // Update the state when the user types in any of the textarea or input fields
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        history(0)
    }

    const createReply = () => {
        setCreateReplyEmail(true);
    };

    const odobriBolovanje = () => {
        const oibRegex = /\b\d{11}\b/;
        const match = oibRegex.exec(emailData.messageBody);

        fetch(`/api/doctor/viewPerson/${match[0]}`)
            .then(data => data.json())
            .then(data => {

                console.log(data);

                const messageData = {
                    naslov: "Bolovanje",
                    tijelo: data && data.mail ? "Odobreno bolovanje\n\nPoslan mail poslodavcu na " + data.mail : "",
                    prilog: null,
                    tip: 1,
                    prioib: match ? match[0] : "", //primatelj -> roditelj
                    posoib: emailData.receiver, //posilatelj -> doktor
                    dijagnozaID: null
                }

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                };

                const options2 = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: email.id, type: 6}),
                }


                if (data && data.mail) {
                    fetch('/api/doctor/newMessage', options)
                        .then(response => {
                            if (response.ok) {
                                console.log("uspjeh");
                            }
                            else {
                                throw new Error(response.statusText)
                            }

                        })
                        .catch(error => {
                            console.error('Error sending message:', error);
                        })

                    fetch('/api/doctor/markMessage', options2)
                        .then(response => {
                            if (response.ok) {
                                console.log("uspjeh2");
                                handleBack();
                            } else {
                                throw new Error(response.statusText)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }

            })



        console.log(match[0]);


    }


    return (
        <>

            <div className="message">
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj</label>
                    <input type="text" name="receiver" id="receiver" value={emailData.receiver} onChange={handleChange}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <input type="text" name="title" id="title" value={emailData.title} onChange={handleChange}
                           readOnly={true}/>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea className="inputs" id="messageBody" name="messageBody" value={emailData.messageBody}
                          onChange={handleChange} readOnly={true}/>

                <div className="inputs" id="messageButtons">
                    {email.tip === '3' &&
                        <button id="odobriBolovanje" type="button" onClick={odobriBolovanje}> Odobri bolovanje </button>}
                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="createReply" type="button" onClick={createReply} disabled={user.oib === emailData.sender}>odgovori</button>
                </div>

            </div>

            {createReplyEmail && <ComposeEmail email={{
                sender: emailData.receiver,
                receiver: emailData.sender,
                title: 'Reply: ' + emailData.title,
                messageBody: emailData.messageBody + '\n------------------------------\n',
            }}/>}
        </>
    );
}

export default ReadEmail;