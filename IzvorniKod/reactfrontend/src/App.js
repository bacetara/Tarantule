import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

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

import * as React from "react";
import {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userRole, setUserRole] = useState("");

    function onLogin(role) {
        setIsLoggedIn(true);
        setUserRole(role);
    }

    function onLogout() {
        setIsLoggedIn(false);
    }



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={onLogin}/>} />
                <Route path="/register" element={<Register />} />

                <Route path="/parentInfo" element={isLoggedIn && userRole === "roditelj" ? <RoditeljPocetna /> : <Navigate to = "/"/>} />
                <Route path="/inbox/:oib" element={isLoggedIn && userRole === "roditelj" ? <ParentSite/> : <Navigate to="/"/>} />
                <Route path="/inbox/child/:oib" element={isLoggedIn && userRole === "roditelj" ? <ChildSite/> : <Navigate to="/"/>} />
                <Route path="/updateInfo/:oib" element={isLoggedIn && userRole === "roditelj" ? <AzuriranjePodataka /> : <Navigate to="/"/> }/>

                <Route  path="/doctor/:oib" element={isLoggedIn && userRole === "doktor" ? <DoctorParentSite /> : <Navigate to = "/"/>} />
                <Route path="/doctor" element={isLoggedIn && userRole === "doktor" ? <LijecnikPocetna /> : <Navigate to = "/"/>}/>
                <Route path="/addPatient2" element={isLoggedIn && userRole === "doktor" ? <DodavanjePacijenta2 /> : <Navigate to = "/"/>}/>

                <Route path="/pediatrician/:oib" element={isLoggedIn && userRole === "pedijatar" ? <PediatricianChildSite/> : <Navigate to = "/"/>}/>
                <Route path="/pediatrician" element={isLoggedIn && userRole === "pedijatar" ? <PedijatarPocetna /> : <Navigate to = "/"/>}/>
                <Route path="/addPatient1" element={isLoggedIn && userRole === "pedijatar" ? <DodavanjePacijenta1 /> : <Navigate to = "/"/>}/>

                <Route path="/admin" element={isLoggedIn && userRole === "admin" ? <AdminPocetna /> : <Navigate to = "/"/>} />
                <Route path="/addparent" element={isLoggedIn && userRole === "admin" ? <DodajRoditelja />: <Navigate to = "/"/>} />
                <Route path="/addchild" element={isLoggedIn && userRole === "admin" ? <DodajDijete /> : <Navigate to = "/"/>} />
                <Route path="/information/:oib" element={isLoggedIn && userRole === "admin" ? <PregledajOsobu /> : <Navigate to = "/"/>}/>


                <Route path="/pediatricianEmail" element={isLoggedIn && (userRole === "pedijatar" || userRole === "doktor") ? <PediatricianEmail/> : <Navigate to = "/"/>}/>

            </Routes>
        </BrowserRouter>

    );
}
//                <Route path="/mapEmail" element={<MapHelp receiver={{adresa:"Trg Franje Tuđmana, Zagreb", oib:"1233"}} sender={{oib:"etotioib"}} email={null}/>}/>

export default App;
