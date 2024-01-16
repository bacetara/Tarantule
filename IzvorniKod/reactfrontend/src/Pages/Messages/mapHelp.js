import React, {useEffect, useState} from 'react';
import './Map.css'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from "react-geocode";

setKey("AIzaSyBLdrbKjSj03iK9wCvrDe1l8dIOAa5-t54");  //OVDJE KLJUČ AK NETKO UZME SVOJ!!!!!!!!!!!!!!!!!!!!!!!!!!!

const MapHelp = ({sender, receiver}) => {
    const [hospitals, setHospitals] = useState([]);
    const [center, setCenter] = useState([0, 0]);
    const [hospitalCoordinates, sethospitalCoordinates] = useState([]);

    useEffect(() => {
        fetch('/api/hospital')
            .then(data => data.json())
            .then(data => setHospitals(data))
    }, []);


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



    const markerIcon = L.icon({
        iconUrl: 'src/Pages/Messages/marker.png',


        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

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

                return forReturn;
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        callFromAdress()
    }, [adress, hospitals, locations])

    const markers = hospitalCoordinates.map((coord, index) => (
        <Marker position={[coord.latitude, coord.longitude]} icon={markerIcon}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    ));

    return(

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
            <form className="message" onSubmit={sendMessage}>
                <div className="inputs" id="receiverField">
                    <label htmlFor="receiver">Primatelj (OIB)</label>
                    <input type="text" name="receiver" id="receiver" onChange={handleChange}
                           value={"oib"/*receiver.oib*/}
                           readOnly={true}/>
                </div>

                <div className="inputs" id="senderField">
                    <label htmlFor="sender">Pošiljatelj</label>
                    <input type="text" name="sender" id="sender" onChange={handleChange} value={"oib"/*sender.oib*/}
                           readOnly={true}/>
                </div>


                <div className="inputs" id="titleField">
                    <label htmlFor="title">Bolest:</label>
                    <input type="text" name="sender" id="sender" onChange={handleChange} value={"Dijagnoza"/*sender.oib*/}
                           readOnly={true}/>
                </div>


                    <div className="inputs" id="messageBody">
                        {center[0] !== 0 && center[1] !== 0 && (
                            <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {markers}

                            </MapContainer>
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
