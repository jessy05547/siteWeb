// import { useState } from "react"
export default function Proj(){
    // const [img, setImg] = useState();
    return (
        <div className="projets-container">
            <div className="wrapper">
                <div className="guide-projet">
                    <div className="card">
                        <div className="item-card">
                            <h4 className="title">Développement Backend</h4>
                            <p className="tx">
                                Nous développons des applications personnalisées et adéquates au fur et à mesure de votre besoin.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="item-card">
                            <h4 className="title">Développement Frontend</h4>
                            <p className="tx">
                                L'élargissement de votre réseau base sur notre conception afin que vous pouvez presenter votre organisation au niveau du monde entier.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="item-card">
                            <h4 className="title">Gestion de base de données</h4>
                            <p className="tx">
                                La transformation en monde numérique, doubler votre productivité. En utilisant votre base de données, pour agrndir la vitesse du travail au milieu de votre société.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}