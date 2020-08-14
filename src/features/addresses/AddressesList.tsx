import React, { useEffect, useState } from 'react';
import { Container, Grid, Icon, List, StrictHeaderProps } from 'semantic-ui-react';
import { IAddress } from '../../app/model/address'
import apiAgent from '../../app/api/apiAgent'
import { NavLink } from 'react-router-dom';

interface IProp {
    handleId: (id: string) => void
    handleAdminHeadline: (headline: string, headlineColor: StrictHeaderProps["color"]) => void
}

export const AddressesList: React.FC<IProp> = ({ handleId, handleAdminHeadline }: IProp) => {
    const agent = apiAgent.AddressesAPIAgent

    const [addressesList, setAddressesList] = useState<IAddress[]>([]);

    useEffect(() => {
        handleAdminHeadline('', 'black')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        agent.list().then((response) => {
            setAddressesList(response)
        })
    }, [agent, handleAdminHeadline]);

    return (
        <Container>
            <List divided relaxed>
                {addressesList.map((address: IAddress, index: number) => (
                    <List.Item key={index} >
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column width={12}>
                                <List.Icon name='home' size='big' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header as={NavLink} to={`/admin/addresses/details/${address.id}`}
                                        onClick={() => {
                                            handleId(address.id)
                                            handleAdminHeadline("", 'black')
                                        }}>
                                        {address.title}
                                    </List.Header>
                                    <List.Description>{address.number ? `No ${address.number},` : ""} {address.street ? `${address.street},` : ""} {address.suburb ? `${address.suburb},` : ""} {address.city ? `${address.city},` : ""} {address.state ? `${address.state},` : ""} {address.country?.name ?? ""}</List.Description>
                                </List.Content>
                            </Grid.Column>

                            <Grid.Column verticalAlign='middle' width={4}>
                                <Container
                                    as={NavLink} to={`/admin/addresses/details/${address.id}`}
                                    textAlign='right'
                                    onClick={() => {
                                        handleId(address.id)
                                        handleAdminHeadline("", 'black')
                                    }}>
                                    <Icon name='arrow alternate circle right' size='big' color="blue" />
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </List.Item>
                ))}
            </List>
        </Container >
    );
}