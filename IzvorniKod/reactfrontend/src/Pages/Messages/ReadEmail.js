import React, {useState} from 'react';
import './Message.css'
import ComposeEmail from "./ComposeEmail";
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

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
            <div className="header">
                <div className="backOptions">
                    <div className="logOut">
                        <FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
                        <p id="logOutText">log out</p>
                    </div>
                </div>

                <div className="profileName">pediatrician [989898899]</div>
            </div>
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
                    {email.type === 'bolovanje' &&
                        <button id="odobriBolovanje" type="button"> Odobri bolovanje </button>}
                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="createReply" type="button" onClick={createReply}>odgovori</button>
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