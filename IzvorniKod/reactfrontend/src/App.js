import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home"
import AdminPocetna from "./Pages/Admin/AdminPocetna"
import DodajRoditelja from "./Pages/Admin/DodajRoditelja"
import DodajDijete from "./Pages/Admin/DodajDijete"
import Register from "./Pages/Register";
import PregledajOsobu from "./Pages/Admin/PregledajOsobu";
import LijecnikPocetna from "./Pages/Doctor/LijecnikPocetna";
import DodavanjePacijenta2 from "./Pages/Doctor/DodavanjePacijenta2";
import PedijatarPocetna from "./Pages/Pediatrician/PedijatarPocetna";
import DodavanjePacijenta1 from "./Pages/Pediatrician/DodavanjePacijenta1";
import AzuriranjePodataka from "./Pages/Parent/AzuriranjePodataka";
import RoditeljPocetna from './Pages/Parent/RoditeljPocetna';
import PediatricianEmail from "./Pages/Messages/PediatricianEmail";
import DoctorParentSite from "./Pages/Doctor/doctorParentSite";
import ParentSite from "./Pages/Parent/PersonalSite";
import ChildSite from "./Pages/Parent/ChildSite";
import PediatricianChildSite from "./Pages/Pediatrician/pediatricianChildSite";
import MapHelp from "./Pages/Messages/mapHelp";
import DoctorInternalInbox from "./Pages/Doctor/DoctorInternalInbox";

import * as React from "react";
import {useEffect, useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userRole, setUserRole] = useState("");



    function onLogin(role) {
        setIsLoggedIn(true);
        setUserRole(role);
    }

    function onLogout() {

        fetch('/api/logout')
            .then(response => {
                if (response.status === 200)
                    setIsLoggedIn(false)
                else {
                    throw new Error("Unable to logout")
                }
            })
            .catch(error => {
                console.error (error);
            });

    }



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={onLogin}/>} />
                <Route path="/register" element={<Register />} />

                <Route path="/parentInfo" element= {<RoditeljPocetna onLogout={onLogout}/>} />
                <Route path="/inbox/:oib" element={ <ParentSite onLogout={onLogout}/>} />
                <Route path="/inbox/child/:oib" element={<ChildSite onLogout={onLogout}/>} />
                <Route path="/updateInfo/:oib" element={ <AzuriranjePodataka onLogout={onLogout}/>  }/>

                <Route  path="/doctor/:oib" element={<DoctorParentSite onLogout={onLogout}/>} />
                <Route path="/doctor" element={<LijecnikPocetna onLogout={onLogout}/>}/>
                <Route path="/addPatient2" element={<DodavanjePacijenta2 onLogout={onLogout}/>}/>
                <Route path="/doktor/inbox" element={<DoctorInternalInbox onLogout={onLogout}/>}/>

                <Route path="/pediatrician/:oib" element={<PediatricianChildSite onLogout={onLogout}/> }/>
                <Route path="/pediatrician" element={<PedijatarPocetna onLogout={onLogout}/>}/>
                <Route path="/addPatient1" element={<DodavanjePacijenta1 onLogout={onLogout}/> }/>

                <Route path="/admin" element={<AdminPocetna onLogout={onLogout}/> } />
                <Route path="/addparent" element={<DodajRoditelja onLogout={onLogout}/>} />
                <Route path="/addchild" element={ <DodajDijete onLogout={onLogout}/> } />
                <Route path="/information/:oib" element={ <PregledajOsobu onLogout={onLogout}/> }/>

            </Routes>
        </BrowserRouter>

    );
}
//                <Route path="/mapEmail" element={<MapHelp receiver={{adresa:"Trg Franje Tuđmana, Zagreb", oib:"1233"}} sender={{oib:"etotioib"}} email={null}/>}/>

export default App;
