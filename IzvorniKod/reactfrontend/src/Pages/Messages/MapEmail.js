import React, {useEffect, useState} from 'react';
import './Message.css'
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Helmet } from 'react-helmet';
import { Loader } from "@googlemaps/js-api-loader"
import axios from 'axios';


const MapEmail = ({sender, receiver}) => {
    const [hospitals, setHospitals] = useState([]);
    const [center, setCenter] = useState([0, 0]);



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




    useEffect(() => {

        const loader = new Loader({
            apiKey: "AIzaSyBLdrbKjSj03iK9wCvrDe1l8dIOAa5-t54",
            version: "weekly"
        });
        const getGeocode = async (address) => {
            try {
                await loader.load();
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK' && results.length > 0) {
                        const location = results[0].geometry.location;
                        setCenter([location.lat(), location.lng()]);
                        console.log(location.lat());

                        // Dohvati bolnice na temelju geokodiranih koordinata
                        const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
                        const request = {
                            location: new window.google.maps.LatLng(location.lat(), location.lng(), true),
                            radius: 20000,
                            type: 'hospital'
                        };

                        placesService.nearbySearch(request, (results, status) => {
                            if (status === 'OK') {
                                // Postavljanje bolnica u stanje
                                setHospitals(results);
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Greška prilikom geokodiranja adrese', error);
            }
        };

        // Postavite stvarnu adresu koju želite geokodirati
        const address = 'Kamenarka 10, Zagreb, Croatia';

        // Pozovite funkciju za geokodiranje
        getGeocode(address);
    }, []);



    return(
        <>
            <Helmet>
                <script
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLdrbKjSj03iK9wCvrDe1l8dIOAa5-t54&libraries=places"
                    defer></script>
            </Helmet>

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
                    <select name="title" id="title" value={emailData.title} onChange={handleChange}>
                        <option value="dijagnoza">Dijagnoza</option>
                        <option value="specijalist">Specijalistički pregled</option>
                        <option value="nalaz">Nalaz iz laboratorija</option>
                    </select>
                </div>

                <div className="inputs" id="messageBody">
                    <MapContainer center={center} zoom={13} style={{height: '500px', width: '100%'}}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {hospitals.map((hospital) => (
                            <Marker
                                key={hospital.id}
                                position={[hospital.latitude, hospital.longitude]}
                            >
                                <Popup>
                                    <strong>{hospital.name}</strong>
                                    <br/>
                                    {hospital.address}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>


                <div className="inputs" id="messageButtons">


                    <button id="reject" type="button" onClick={handleBack}>zatvori</button>
                    <button id="sendMessage" type="submit">pošalji</button>
                </div>
            </form>
        </>);


}


//export default MapEmail;