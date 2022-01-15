import React from 'react';


const Header = () => {

    return (
        <div className="header">
            <div>
                <a className="header-item" href="/home">Homepage</a>
            </div>
            <div>
                <a className="header-item" href="/ruledashboard">Business Rule Dashboard</a>
            </div>
            <div>
                <a className="header-item" href="/admindashboard">Admin Dashboard</a>
            </div>
        </div>
    );
}

export default Header;