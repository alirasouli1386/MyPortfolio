import React from 'react'
import { Container, Header, StrictHeaderProps } from 'semantic-ui-react'

interface IProps {
    active: boolean;
    headline?: String;
    headlineColor?: StrictHeaderProps["color"];
}

export const AdminHeader: React.FC<IProps> = ({ active, headline, headlineColor }) => {
    return (
        <Container textAlign='left'>
            {active &&
                <Header Header as='h3' color={headlineColor !== undefined ? headlineColor : 'black'} block>
                    {headline !== undefined ? headline : 'Headline'}
                </Header>
            }
        </Container>
    )
}