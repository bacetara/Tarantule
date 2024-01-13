import React, {useState} from 'react';
import './Message.css'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const PediatricianEmail = ({sender, receiver}) => {
    const history = useNavigate();
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        receiver: 'automatski 09320940390',
        sender: 'taj pedijatar',
        title: '',
        disease: '',
        messageBody: '',
        ispricnica: false,
        bolovanje: false,
    });

    const handleBack = () => {
        history(0);
    }
    const handleChange = (e) => {
        // Update the state when the user types in any of the textarea or input fields
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });

        //console.log(emailData);
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
                    <input type="text" name="receiver" id="receiver" onChange={handleChange} value={receiver.oib}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="senderField">
                    <label htmlFor="sender">Pošiljatelj</label>
                    <input type="text" name="sender" id="sender" onChange={handleChange} value={sender.oib}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <select name="title" id="title" value={emailData.title} onChange={handleChange}>
                        <option value="dijagnoza">Dijagnoza</option>
                        <option value="specijalist">Specijalistički pregled</option>
                        <option value="nalaz">Nalaz iz laboratorija</option>
                    </select>
                </div>

                <div className={emailData.title === 'specijalist' ? "inputs" : "hiddenField"} id="diseaseField">
                    <label htmlFor="disease">Bolest</label>
                    <select name="disease" id="disease" value={emailData.disease} onChange={handleChange}>
                        <option value="bolest1">Bolest 1</option>
                        <option value="bolest2">Bolest 2</option>
                        <option value="bolest3">Bolest 3</option>
                    </select>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea className="inputs" id="messageBody" name="messageBody" onChange={handleChange}/>

                <div className="inputs" id="messageButtons">

                    {sender.role === 'pediatrician' && <label className="check"> ispričnica
                        <input id="ispricnica" type="checkbox"
                               checked={emailData.ispricnica}
                               onChange={() => handleCheckBoxChange('ispricnica')}/>
                    </label>}

                    <label className="check"> bolovanje roditelja
                        <input id="bolovanje" type="checkbox"
                               checked={emailData.bolovanje}
                               onChange={() => handleCheckBoxChange('bolovanje')}/>
                    </label>

                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="sendMessage" type="submit">pošalji</button>
                </div>
            </form>
        </>);
}

export default PediatricianEmail;