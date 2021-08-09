import React from 'react';
import "../../assets/styles/Header.css"

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

                <Container>

                    <Menu.Item as='a' header>
                        {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
                        Smart Recycle
                    </Menu.Item>
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

