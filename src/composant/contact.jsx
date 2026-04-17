export default function ContactPage() {
    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="contact-container">
                    <h1>Razafindraibe Jessy Roméo</h1>
                    <p className="job-title">Développeur Full-Stack</p>
                </div>
            </section>

            <section className="contact-content">
                <div className="contact-container">
                    <div className="contact-grid">
                        {/* Section À propos */}
                        <div className="contact-section">
                            <h2>À propos</h2>
                            <p>
                                Je suis un développeur full-stack passionné par la création d'applications web modernes 
                                et performantes. Avec une expertise en React, TypeScript, Laravel et autres technologies, 
                                je transforme vos idées en solutions digitales de qualité.
                            </p>
                        </div>

                        {/* Section Compétences */}
                        <div className="contact-section">
                            <h2>Compétences Techniques</h2>
                            <div className="skills-list">
                                <div className="skills-category">
                                    <h3>Frontend</h3>
                                    <ul>
                                        <li>React JS</li>
                                        <li>TypeScript</li>
                                        <li>HTML5</li>
                                        <li>CSS3</li>
                                        <li>Tailwind CSS</li>
                                    </ul>
                                </div>
                                <div className="skills-category">
                                    <h3>Backend</h3>
                                    <ul>
                                        <li>Laravel</li>
                                        <li>Java</li>
                                        <li>Python</li>
                                    </ul>
                                </div>
                                <div className="skills-category">
                                    <h3>Base de données</h3>
                                    <ul>
                                        <li>MySQL</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Coordonnées */}
                    <div className="contact-info">
                        <h2>Me Contacter</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <h3>📧 Email</h3>
                                <a href="mailto:romeorazafindraibe76@gmail.com">
                                    romeorazafindraibe76@gmail.com
                                </a>
                            </div>
                            <div className="info-item">
                                <h3>📞 Téléphone</h3>
                                <a href="tel:+261384696755">
                                    +261 384 696 755
                                </a>
                            </div>
                            <div className="info-item">
                                <h3>👨‍💻 Facebook</h3>
                                <a href="https://www.facebook.com/search/top?q=jessy%20razafindraibe" target="_blank" rel="noopener noreferrer">
                                    Jessy Razafindraibe
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}