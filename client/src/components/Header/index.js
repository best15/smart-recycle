import React from 'react';
import "../../assets/styles/Header.css"
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { Container, Menu, Button } from 'semantic-ui-react'

const Header = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <div>
            <Menu className="header" fixed='top' inverted >

                <Container id="header_container">
                    <Link to="/">
                        <Menu.Item header>
                            <i className="recycle-icon fa fa-recycle" aria-hidden="true" />
                            Smart Recycle
                        </Menu.Item>
                    </Link>
                </Container>

                {Auth.loggedIn() ? (
                    <>
                        <span className="greet"> Welcome, {Auth.getProfile().data.username}!</span>
                        <Button className="logout"
                            onClick={logout}>Logout</Button>

                    </>
                ) : ("")}




            </Menu>

        </div>
    )
};
export default Header;

