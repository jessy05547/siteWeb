import { Link } from "react-router-dom"
export default function Navbar(){
    return (
        <div className="wrapper-nav">
            <nav>
                <ul id="menu">
                    <Link className="lien" active  to={'/accueil'}>Accueil</Link>
                    <Link className="lien" active  to={'/projet'}>Projets</Link>
                    <Link className="lien" active  to={'/contact'}>Contact</Link>
                </ul>
            </nav>
            <div className="btn-cnx">
                <button className="affiche"><a href="tel:+261384696755" className="telephone">Engagez-moi</a></button>
            </div>
        </div>
    )
}