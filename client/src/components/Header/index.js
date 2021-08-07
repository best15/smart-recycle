import React from 'react';
import "../../assets/styles/Header.css"

import { Container, Menu, } from 'semantic-ui-react'

const Header = () => {

    return (
        <div>
            <Menu className="header" fixed='top' inverted >
                <Container>
                    <Menu.Item as='a' header>
                        {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
                        Smart Recycle
                    </Menu.Item>

                </Container>
            </Menu>

        </div>
    )
};
export default Header;

