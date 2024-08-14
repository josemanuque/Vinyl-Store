import { FC, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { ReactSVG } from "react-svg";
import KonradLogo from "../../assets/konrad.svg";

const Navbar: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <span className="navbar-title">
                            <ReactSVG className="icon-color" src={KonradLogo}/>
                            <p>Grooves & Hooks</p>
                        </span>
                    </Link>
                </div>
                <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/artists">Artists</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
