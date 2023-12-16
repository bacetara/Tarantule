import React, {useState} from 'react';
import './Message.css'

const ComposeEmail = () => {

    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        receiver: '',
        title: '',
        messageBody: '',
    });

    const handleChange = (e) => {
        // Update the state when the user types in any of the textarea or input fields
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };
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
                <div className="inputs" id="senderField">
                    <label htmlFor="receiver">Primatelj</label>
                    <input type="text" name="receiver" id="receiver" onChange={handleChange}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <input type="text" name="title" id="title" onChange={handleChange}/>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea id="messageBody" name="messageBody" onChange={handleChange}/>

                <div className="inputs" id="messageButtons">
                    <button id="reject" type="button">zatvori</button>
                    <button id="sendMessage" type="submit">pošalji</button>
                </div>
            </form>
        </>
    );
}

export default ComposeEmail;