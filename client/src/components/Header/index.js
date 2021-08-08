import React from 'react';
import "../../assets/styles/Header.css"

import Auth from '../../utils/auth';

import { Container, Menu, } from 'semantic-ui-react'

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
                    <div>
                        {Auth.loggedIn() ? (
                            <button onClick={logout}>
                                Logout
                            </button>

                        ) : (""
                        )}
                    </div>
                </Container>
            </Menu>

        </div>
    )
};
export default Header;

