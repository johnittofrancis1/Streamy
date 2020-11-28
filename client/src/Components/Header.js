import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { openLogin, logOut } from '../actions/auth';

class Header extends React.Component
{    
    renderNavMenu = () => {
        if (this.props.currentUser)
        {
            return (
                <React.Fragment>
                    <NavLink 
                        to="/streams" 
                        exact
                        activeClassName="item navbar__link--active"
                        className="item navbar__link"
                    >
                        All Streams
                    </NavLink>
                    <NavLink 
                        to="/streams/new" 
                        exact
                        activeClassName="item navbar__link--active"
                        className="item navbar__link"
                    >
                        Create
                    </NavLink>
                
                    <div className="right menu">
                        <div className="item primary-color">{this.props.currentUser.name}</div>
                        <Link
                            to = "/logout"
                            className="item login navbar__link"
                        >
                            Logout
                        </Link>
                    </div>
                </React.Fragment>
            );
        }
        else
        {
            return (
                <div className="right menu" >
                    <button
                        className="item login navbar__link"
                        onClick={e => { 
                            this.props.openLogin();
                        }}
                    >
                        Login
                    </button>
                </div>
            );
        }
    }

    render()
    {
        return (
            <div className="ui menu">
                <NavLink 
                    to="/"
                    exact
                    activeClassName="item navbar__link--active"
                    className="item navbar__link"
                >
                    Streamy
                </NavLink>
                {this.renderNavMenu()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.auth};
}

export default connect(mapStateToProps, { openLogin, logOut })(Header);