import React, {useEffect, useState} from 'react';
import './Map.css'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    setKey,
    fromAddress,
} from "react-geocode";

setKey("AIzaSyBLdrbKjSj03iK9wCvrDe1l8dIOAa5-t54");  //OVDJE KLJUČ AK NETKO UZME SVOJ!!!!!!!!!!!!!!!!!!!!!!!!!!!

const MapHelp = ({sender, receiver, email}) => {
    const [hospitals, setHospitals] = useState([]);
    const [center, setCenter] = useState([0, 0]);
    const [hospitalCoordinates, sethospitalCoordinates] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);
    const [illnes, setIllnes] = useState();

    useEffect(() => {
        fetch('/api/hospital')
            .then(data => data.json())
            .then(data => setHospitals(data))
    }, []);

    useEffect(() => {
        fetch('/api/diagnosis')
            .then(data => data.json())
            .then(data => {
                setDiagnosis(data);
                for(let i = 0; i < data.length; i++) {
                    if(data[i].idBolest === email.dijagnozaID){
                        setIllnes(data[i].naziv);
                        break;
                    }
                }
            });
    }, [email.dijagnozaID]);


    const history = useNavigate();
    const [emailData, setEmailData] = useState({
        // Initialize state for form fields
        receiver: 'automatski 09320940390',
        sender: 'trenutni doktor',
        title: '',
        disease: '',
        messageBody: ''
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

    const adress = receiver.adresa;
    const locations = [];
    
    useEffect(() => {
        async function callFromAdress() {
            let forReturn;
            try {
                const { results } = await fromAddress(adress);
                const { lat, lng } = results[0].geometry.location;
                const newCenter = [lat, lng];
                setCenter(newCenter);
                for (let i = 0; i < hospitals.length; i++) {
                    //console.log(hospitals.at(i).adresaBolnice);
                    const { results } = await fromAddress(hospitals.at(i).adresaBolnice);
                    const { lat, lng } = results[0].geometry.location;
                    locations.push({latitude: lat,longitude: lng });
                    //console.log(locations[i])
                }

                sethospitalCoordinates(locations);
                //console.log(center);
                console.log(email);
                return forReturn;
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        callFromAdress()
    }, [adress, hospitals])

    const markerIcon = L.icon({
        iconUrl: 'https://img.icons8.com/doodle/48/heart-with-pulse.png',

        iconSize : [35,35], // size of the icon
        popupAnchor : [-0, -0]

    });

    const markers = hospitalCoordinates.map((coord, index) => (
        <Marker position={[coord.latitude, coord.longitude]} icon={markerIcon}>
            <Popup>
                {hospitals.at(index).naziv}
            </Popup>
        </Marker>
    ));

    return(

        <>


            <form className="message" onSubmit={sendMessage}>
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj (OIB)</label>
                    <input type="text" name="receiver" id="receiver"
                           value={receiver.oib}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="senderField">
                    <label htmlFor="sender">Pošiljatelj</label>
                    <input type="text" name="sender" id="sender"  value={sender.oib}
                           readOnly={true}/>
                </div>


                <div className="inputs" id="titleField">
                    <label htmlFor="title">Bolest:</label>
                    <input type="text" name="sender" id="sender"  value={illnes}
                           readOnly={true}/>
                </div>


                    <div className="inputs" id="messageBody">
                        {adress && center[0] !== 0 && center[1] !== 0 && (
                            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {markers}

                            </MapContainer>
                        )}
                        {!adress && (
                            <div className="upozorenje">Potrebno je ažurirati osobne podatke</div>
                        )}
                </div>


                <div className="inputs" id="messageButtons">


                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="sendMessage" type="submit">pošalji</button>
                </div>
            </form>
        </>

    );


}


export default MapHelp;
