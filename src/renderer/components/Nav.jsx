import React from 'react';

export default function Nav() {
    return (
        <nav className="navbar nav-component">
            <div className="container-fluid">
                <a className="navbar-brand">Docker Libre</a>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}