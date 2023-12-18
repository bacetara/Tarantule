import React, {useState} from 'react';
import './Message.css'
import ComposeEmail from "./ComposeEmail";
import {useNavigate} from 'react-router-dom';

const ReadEmail = ({email}) => {

    const history = useNavigate();
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        sender: email.sender || '',
        receiver: email.receiver || '',
        title: email.title || '',
        messageBody: email.messageBody || '',
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

    return (
        <>
            <div className="message">
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj</label>
                    <input type="text" name="receiver" id="receiver" value={email.receiver} onChange={handleChange}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <input type="text" name="title" id="title" value={email.title} onChange={handleChange}/>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea className="inputs" id="messageBody" name="messageBody" value={email.messageBody} onChange={handleChange}/>

                <div className="inputs" id="messageButtons">
                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="createReply" type="button" onClick={createReply}>odgovori</button>
                </div>

            </div>

            {createReplyEmail && <ComposeEmail email={{
                sender: emailData.receiver,
                receiver: emailData.sender,
                title: 'Reply: ' + emailData.title,
                messageBody: emailData.messageBody + '\n------------------------------\n',
            }}/> }
        </>
    );
}

export default ReadEmail;