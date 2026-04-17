import Navbar from "./composant/navBar";
import WebRoute from './composant/route.jsx'

// import { useState } from "react";
export default function App(){
  return (
    <div className="parent">
      <header>
        <nav className="navbar">
          <div className="wrapper">
            <Navbar />
          </div>
        </nav>
        <div className="content-wrapper">
          <WebRoute />
        </div>
      </header>
    </div>
  )
}