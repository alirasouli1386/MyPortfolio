import React from 'react'
import { Menu, Input, Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item
                    name='home'
                    header
                    as={NavLink} exact to="/">
                    Home
                </Menu.Item>
                <Menu.Item
                    name='messages'
                    as={NavLink} to="/admin">
                    Admin Panel
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item name='logout'>
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}

