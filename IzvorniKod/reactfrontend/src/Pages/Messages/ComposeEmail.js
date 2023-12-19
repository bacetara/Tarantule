import React, {useState} from 'react';
import './Message.css'
import {useNavigate} from 'react-router-dom';

const ComposeEmail = ({email}) => {

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
        e.preventDefault();

        const data = {
            pošiljatelj: emailData.receiver,
            naslov: emailData.title,
            tijelo: emailData.messageBody
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }

    return (
        <>
            <form className="message" onSubmit={sendMessage}>
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj</label>
                    <input type="text" name="receiver" id="receiver" value={emailData.receiver} onChange={handleChange}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <input type="text" name="title" id="title" value={emailData.title} onChange={handleChange}/>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea className="inputs" id="messageBody" name="messageBody" value={emailData.messageBody} onChange={handleChange}/>

                <div className="inputs" id="messageButtons">
                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="sendMessage" type="submit">pošalji</button>
                </div>
            </form>
        </>
    );
}

export default ComposeEmail;