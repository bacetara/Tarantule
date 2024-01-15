import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home"
import AdminPocetna from "./Pages/Admin/AdminPocetna"
import DodajRoditelja from "./Pages/Admin/DodajRoditelja"
import DodajDijete from "./Pages/Admin/DodajDijete"
import Register from "./Pages/Register";
import User from "./Pages/User";
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inbox/:oib" element={<ParentSite/>} />
                <Route path="/inbox/child/:oib" element={<ChildSite/>} />
                <Route  path="/doctor/:oib" element={<DoctorParentSite />} />
                <Route path="/pediatrician/:oib" element={<PediatricianChildSite/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPocetna />} />
                <Route path="/addparent" element={<DodajRoditelja />} />
                <Route path="/addchild" element={<DodajDijete />} />
                <Route path="/user" element={<User />}/>
                <Route path="/information/:oib" element={<PregledajOsobu />}/>
                <Route path="/doctor" element={<LijecnikPocetna />}/>
                <Route path="/addPatient2" element={<DodavanjePacijenta2 />}/>
                <Route path="/pediatrician" element={<PedijatarPocetna />}/>
                <Route path="/addPatient1" element={<DodavanjePacijenta1 />}/>
                <Route path="/updateInfo" element={<AzuriranjePodataka />}/>
                <Route path="/parentInfo" element={<RoditeljPocetna />} />
                <Route path="/pediatricianEmail" element={<PediatricianEmail/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
