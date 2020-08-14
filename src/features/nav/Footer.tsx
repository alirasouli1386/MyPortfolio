import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, MenuItemProps, Segment } from 'semantic-ui-react';

export const Footer = () => {

    const [activeItem, setActiveItem] = useState<String | undefined>('Contact me');
    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => {
        setActiveItem(name)
    }

    return (
        <Segment inverted>
            <Menu stackable inverted>
                <Menu.Item
                    name='Contact me'
                    active={activeItem === 'Contact me'}
                    onClick={handleItemClick}
                />

                <Menu.Item
                    name='About me'
                    active={activeItem === 'About me'}
                    onClick={handleItemClick}
                />

                <Menu.Item
                    name='Thanks for joining me'
                    active={activeItem === 'Thanks for joining me'}
                    onClick={handleItemClick}
                />

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='Admin'
                        active={activeItem === 'Admin'}
                        as={NavLink} to='/login'>
                        <Icon name='sign in'></Icon>

                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    );
}