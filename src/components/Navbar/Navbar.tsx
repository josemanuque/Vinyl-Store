import { FC } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar: FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/artists">Artists</Link></li>
                <li><Link to="/favourites">Favourites</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;