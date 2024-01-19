import React, {useState} from 'react';
import './Message.css'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const ComposeEmail = ({email}) => {
    const [messageError, setMessageError] = useState(null);

    console.log(email);
    const history = useNavigate();
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        sender: email.sender || '',
        receiver: email.receiver || '',
        title: email.title || '',
        messageBody: email.messageBody || '',
    });

    const handleChange = (e) => {
        // Update the state when the user types in any of the textarea or input fields
        console.log(e.target.name);
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        history(0);
    }
    function sendMessage(e) {


        if (messageError == null) {
            e.preventDefault();
            const data = {
                naslov: emailData.title,
                tijelo: emailData.messageBody,
                prilog: null,
                tip: 1,
                prioib: emailData.receiver,
                posoib: emailData.sender,
                dijagnozaID: null
            };

            console.log("data");
            console.log(JSON.stringify(data));
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch('/api/parent/newMessage', options)
                .then(response => {
                    if (response.ok)
                        console.log("uspjeh");
                    else
                        console.log("neuspjeh");

                    handleBack();
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                })

        }

    }

    function isValid () {

        return emailData.receiver && emailData.title !== '';
    }

    return (
        <>

            <form className="message" onSubmit={sendMessage}>
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj</label>
                    <input type="text" name="receiver" id="receiver" value={emailData.receiver}
                           onChange={handleChange}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <input type="text" name="title" id="title" value={emailData.title} onChange={handleChange}/>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea className="inputs" id="messageBody" name="messageBody" value={emailData.messageBody}
                          onChange={handleChange}/>


                <div className="inputs" id="messageButtons">
                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="sendMessage" type="submit" disabled={!isValid()}>pošalji</button>
                </div>
            </form>
        </>
    );
}

export default ComposeEmail;