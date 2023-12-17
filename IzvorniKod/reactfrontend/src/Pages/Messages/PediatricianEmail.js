import React, {useState} from 'react';
import './Message.css'

const PediatricianEmail = () => {
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        receiver: 'automatski 09320940390',
        sender: 'taj pedijatar',
        title: '',
        messageBody: '',
        ispricnica: false,
        bolovanje: false,
    });

    const handleChange = (e) => {
        // Update the state when the user types in any of the textarea or input fields
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckBoxChange = (checkBoxId) => {
        setEmailData({
            ...emailData,
             [checkBoxId]: !emailData[checkBoxId],
        })
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

    return(
        <>
            <form className="message" onSubmit={sendMessage}>
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj (OIB)</label>
                    <input type="text" name="receiver" id="receiver" onChange={handleChange} value={emailData.receiver} readOnly={true}/>
                </div>

                <div className="inputs" id="senderField">
                    <label htmlFor="sender">Pošiljatelj</label>
                    <input type="text" name="sender" id="sender" onChange={handleChange} value={emailData.sender} readOnly={true}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <input type="text" name="title" id="title" onChange={handleChange}/>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea id="messageBody" name="messageBody" onChange={handleChange}/>

                <div className="inputs" id="messageButtons">
                    <label className="check"> ispričnica
                        <input id="ispricnica" type="checkbox"
                               checked={emailData.ispricnica}
                               onChange={() => handleCheckBoxChange('ispricnica')}/>
                    </label>

                    <label className="check"> bolovanje roditelja
                        <input id="bolovanje" type="checkbox"
                               checked={emailData.bolovanje}
                               onChange={() => handleCheckBoxChange('bolovanje')}/>
                    </label>

                    <button id="reject" type="button">zatvori</button>
                    <button id="sendMessage" type="submit">pošalji</button>
                </div>
            </form>
        </>);
}

export default PediatricianEmail;