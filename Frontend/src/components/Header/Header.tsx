import React from 'react';


const Header = () => {

    return (
        <div className="header">
                <a className="header-item" href="/home">Homepage</a>
                <a className="header-item" href="/ruledashboard">Business Rule Dashboard</a>
                <a className="header-item" href="/admindashboard">Admin Dashboard</a>
                <a className="header-item" href="/login">Login</a>
                <a className="header-item" href="/register">Register</a>
        </div>
    );
}

export default Header;