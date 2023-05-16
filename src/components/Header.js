import React from 'react';
import { Link } from 'react-router-dom';
import tom_logo from '../assets/img/tom.svg'

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img src={tom_logo} alt="Header Image" />
            </Link>
        </div>
    );
}

export default Header;
