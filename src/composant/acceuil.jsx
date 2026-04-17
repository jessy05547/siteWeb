import { Link } from "react-router-dom"
export default function AcceuilPage(){
    return (
        <div className="accueil-container">
            <div className="accueil-header">
                <div className="images">
                    <img src="/imgs.png" alt="Description de ma photo" id="photoProfessionnel" />
                </div>
                <div className="expression">
                    <div className="wrapper">
                        <div className="context">
                            <h4 className="identity">Bonjours, je suis Jessy Razafindraibe</h4>
                            <h1 className="employe">Développeur <br /> Full-Stack <br /> Passionné</h1>
                            <p className="text">J'ai conçu de nombreuse application robustre et élégante pour les différentes domaines. En tant qu'un expert dans la conception des platforms numériques, nous garantissons les services de nos clients</p>
                            <Link to={'/projet'} className="lien">Découvrez nos projets</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}