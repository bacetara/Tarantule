import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home"
import AdminPocetna from "./Pages/Admin/AdminPocetna"
import DodajRoditelja from "./Pages/Admin/DodajRoditelja"
import DodajDijete from "./Pages/Admin/DodajDijete"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />
                <Route path="/admin" element={<AdminPocetna />} />
                <Route path="/addparent" element={<DodajRoditelja />} />
                <Route path="/addchild" element={<DodajDijete />} />


            </Routes>
        </BrowserRouter>

    );
}

export default App;
