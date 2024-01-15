import React, {useState} from 'react';
import './Message.css'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const PediatricianEmail = ({sender, receiver}) => {
    const history = useNavigate();
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        naslov : 'dijagnoza',
        tijelo : '',
        prilog : null,
        tip: 1,
        prioib : receiver.oib,
        posoib : sender.oib,
        dijagnozaID : "",
        ispricnica: false,
        bolovanje: false
    });
    console.log(emailData);

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

    const changeEmailData = (name, value) => {
        setEmailData({
            ...emailData,
            [name]: value,
        });
    }

    const handleCheckBoxChange = (checkBoxId) => {
        setEmailData({
            ...emailData,
             [checkBoxId]: !emailData[checkBoxId],
        })
    };



    function sendMessage(e) {
        e.preventDefault();
        let tipPoruke = 1;
        let numberOfMessages = 1;
        let messageData = [];

        if (sender.uloga === "doktor") {
            if (emailData.naslov === "specijalist") {
                numberOfMessages = 1;

                messageData[0] = {
                    naslov: emailData.title,
                    tijelo: "",
                    prilog: null,
                    tip: 4,
                    prioib: emailData.prioib,
                    posoib: emailData.posoib,
                    dijagnozaID: emailData.dijagnozaID
                }

                if (emailData.bolovanje === true) {
                    numberOfMessages = 2;
                    messageData[1] = {
                        naslov: "Bolovanje",
                        tijelo: "Odobreno bolovanje",
                        prilog: null,
                        tip: 1,
                        prioib: emailData.prioib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }
                }

            } else if (emailData.naslov === "dijagnoza" || emailData.naslov === "nalaz") {
                messageData[0] = {
                    naslov: emailData.naslov,
                    tijelo: emailData.bolovanje ? emailData.tijelo +  "\n\nOdobreno bolovanje\n" : emailData.tijelo,
                    prilog: null,
                    tip: 1,
                    prioib: emailData.prioib,
                    posoib: emailData.posoib,
                    dijagnozaID: null
                }
            }
        }
        else if (sender.uloga === "pedijatar") {
            if (emailData.naslov === "dijagnoza" || emailData.naslov === "nalaz") {
                messageData[0] = {
                    naslov: emailData.naslov,
                    tijelo: emailData.ispricnica ? emailData.tijelo +  "\n\nPoslana ispričnica\n" : emailData.tijelo,
                    prilog: null,
                    tip: 1,
                    prioib: emailData.prioib,
                    posoib: emailData.posoib,
                    dijagnozaID: null
                }

                if (emailData.ispricnica) {
                    numberOfMessages++;
                    messageData[1] = {
                        naslov: emailData.naslov,
                        tijelo: "\n\nPoslana ispričnica\n",
                        prilog: null,
                        tip: 1,
                        prioib: receiver.roditelj.oib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }

                    messageData[numberOfMessages] = {
                        naslov: emailData.naslov,
                        tijelo: "\n\nPoslana ispričnica\n",
                        prilog: null,
                        tip: 1,
                        prioib: emailData.prioib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }
                    numberOfMessages++;
                }

                if (emailData.bolovanje) {
                    messageData[numberOfMessages] = {
                        naslov: emailData.naslov,
                        tijelo: "\n\nTraži se bolovanje za roditelja\n",
                        prilog: null,
                        tip: 3,
                        prioib: receiver.roditelj.doktor.oib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }
                    numberOfMessages++;
                }
            } else if (emailData.naslov === 'specijalist') {
                messageData[0] = {
                    naslov: emailData.naslov,
                    tijelo: "",
                    prilog: null,
                    tip: 4,
                    prioib: emailData.prioib,
                    posoib: emailData.posoib,
                    dijagnozaID: emailData.dijagnozaID
                }

                if (emailData.ispricnica) {
                    numberOfMessages++;
                    messageData[1] = {
                        naslov: emailData.naslov,
                        tijelo: "\n\nPoslana ispričnica\n",
                        prilog: null,
                        tip: 1,
                        prioib: receiver.roditelj.oib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }

                    messageData[numberOfMessages] = {
                        naslov: emailData.naslov,
                        tijelo: "\n\nPoslana ispričnica\n",
                        prilog: null,
                        tip: 1,
                        prioib: emailData.prioib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }
                    numberOfMessages++;
                }

                if (emailData.bolovanje) {
                    messageData[numberOfMessages] = {
                        naslov: emailData.naslov,
                        tijelo: "\n\nTraži se bolovanje za roditelja\n",
                        prilog: null,
                        tip: 3,
                        prioib: receiver.roditelj.doktor.oib,
                        posoib: emailData.posoib,
                        dijagnozaID: null
                    }
                    numberOfMessages++;
                }
            }
        }

        
        for (let i = 0; i < messageData.length; i++) {

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData[i])
            };

            fetch('/api/doctor/newMessage', options)
                .then(response => {
                    if (response.ok) {
                        console.log("uspjeh");
                        handleBack();
                    }
                    else {
                        throw new Error(response.statusText)
                    }

                })
                .catch(error => {
                    console.error('Error sending message:', error);
                })
        }


    }

    return(
        <>

            <form className="message" onSubmit={sendMessage}>
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj (OIB)</label>
                    <input type="text" name="receiver" id="receiver" onChange={handleChange} value={emailData.prioib}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="senderField">
                    <label htmlFor="sender">Pošiljatelj</label>
                    <input type="text" name="sender" id="sender" onChange={handleChange} value={emailData.posoib}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="titleField">
                    <label htmlFor="title">Naslov</label>
                    <select name="naslov" id="title" value={emailData.naslov} onChange={handleChange}>
                        <option value="dijagnoza">Dijagnoza</option>
                        <option value="specijalist">Specijalistički pregled</option>
                        <option value="nalaz">Nalaz iz laboratorija</option>
                    </select>
                </div>

                <div className={emailData.naslov === 'specijalist' ? "inputs" : "hiddenField"} id="diseaseField">
                    <label htmlFor="disease">Bolest</label>
                    <select name="dijagnozaID" id="disease" value={emailData.dijagnozaID} onChange={handleChange}>
                        <option value="bolest1">Bolest 1</option>
                        <option value="bolest2">Bolest 2</option>
                        <option value="bolest3">Bolest 3</option>
                    </select>
                </div>

                <button id="attachment" type="button">prilog</button>
                <textarea className="inputs" id="messageBody" name="tijelo" onChange={handleChange}/>

                <div className="inputs" id="messageButtons">

                    {sender.uloga === 'pedijatar' && <label className="check"> ispričnica
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
                    <button id="sendMessage" type="submit" onSubmit={sendMessage}>pošalji</button>
                </div>
            </form>
        </>);
}

export default PediatricianEmail;