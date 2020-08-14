import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, MenuItemProps } from 'semantic-ui-react'

export const AdminMenu = () => {
    const [activeItem, setActiveItem] = useState<String>();

    const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => {
        setActiveItem(name);
    }

    return (
        <Menu vertical>
            <Menu.Item>
                <Menu.Header>My Portfolio</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name='portfolio'
                        active={activeItem === 'portfolio'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='experience'
                        active={activeItem === 'experience'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='skills'
                        active={activeItem === 'skills'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='technologies'
                        active={activeItem === 'technologies'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='tags'
                        active={activeItem === 'tags'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>My Knowledge</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name='education'
                        active={activeItem === 'education'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='certificates'
                        active={activeItem === 'certificates'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>General</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name='organizations'
                        active={activeItem === 'organizations'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='addresses'
                        as={NavLink} to="/admin/addresses"
                        active={activeItem === 'addresses'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='people'
                        active={activeItem === 'people'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu.Item>
        </Menu>
    )

}