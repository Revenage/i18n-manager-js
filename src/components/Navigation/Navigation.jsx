import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
                I18n-manager
            </a>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">
                            Home <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Link
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">
                            Disabled
                        </a>
                    </li>
                </ul>
            </div>

            <ul className="navbar-nav px-3">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="https://example.com"
                        id="dropdown07"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Username
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdown07">
                        <a className="dropdown-item" href="#">
                            Settings
                        </a>
                        <NavLink
                            to="/logout"
                            className="dropdown-item"
                            href="#"
                        >
                            Sign out
                        </NavLink>
                    </div>
                </li>
            </ul>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
        </nav>
    );
}

export default Navigation;
