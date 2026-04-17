import Proj from "./projets"
import AcceuilPage from "./acceuil"
import ContactPage from "./contact"
// import App from "./enterprisedashboard"
import { Route, Routes } from "react-router-dom"
export default function WebRoute(){
    return (
        <Routes>
            <Route path="/accueil" element={<AcceuilPage />} />
            <Route path="/" element={<AcceuilPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projet" element={<Proj />} />
            
        </Routes>
    )
}