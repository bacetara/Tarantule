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
import InboxRoditelj from "./Pages/Parent/InboxRoditelj";
import InboxDijete from "./Pages/Parent/InboxDijete";
import InboxPedijatar from "./Pages/Pediatrician/InboxPedijatar"
import InboxDoktor from "./Pages/Doctor/InboxDoktor"
import PediatricianEmail from "./Pages/Messages/PediatricianEmail";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPocetna />} />
                <Route path="/addparent" element={<DodajRoditelja />} />
                <Route path="/addchild" element={<DodajDijete />} />
                <Route path="/user" element={<User />}/>
                <Route path="/information" element={<PregledajOsobu />}/>
                <Route path="/doctor" element={<LijecnikPocetna />}/>
                <Route path="/addPatient2" element={<DodavanjePacijenta2 />}/>
                <Route path="/pediatrician" element={<PedijatarPocetna />}/>
                <Route path="/addPatient1" element={<DodavanjePacijenta1 />}/>
                <Route path="/updateInfo" element={<AzuriranjePodataka />}/>
                <Route path="/parentInfo" element={<RoditeljPocetna />} />
                <Route path="/parentInbox" element={<InboxRoditelj />} />
                <Route path="/childInbox" element={<InboxDijete />} />
                <Route path="/pediatricianInbox" element={<InboxPedijatar />} />
                <Route path="/doctorInbox" element={<InboxDoktor />} />
                <Route path="/pediatricianEmail" element={<PediatricianEmail/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
