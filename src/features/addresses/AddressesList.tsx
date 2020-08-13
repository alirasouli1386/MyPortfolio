import React, { useEffect, useState } from 'react';
import { Container, Grid, Icon, List, StrictHeaderProps } from 'semantic-ui-react';
import { IAddress } from '../../app/model/address'
import apiAgent from '../../app/api/apiAgent'
import { EMode } from '../../app/api/EMode';

interface IProp {
    handleModeChange: (mode: EMode, id: string) => void
    handleHeadline: (update: string, color: StrictHeaderProps["color"]) => void
}

export const AddressesList: React.FC<IProp> = ({ handleModeChange, handleHeadline }: IProp) => {
    const agent = apiAgent.AddressesAPIAgent

    const [addressesList, setAddressesList] = useState<IAddress[]>([]);

    useEffect(() => {
        agent.list().then((response) => {
            setAddressesList(response)
        })
    }, [agent]);

    return (
        <Container>
            <List divided relaxed>
                {addressesList.map((address: IAddress, index: number) => (
                    <List.Item key={index} >
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column width={12}>
                                <List.Icon name='home' size='big' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header as='a' onClick={() => handleModeChange(EMode.Details, address.id)}>{address.title}</List.Header>
                                    <List.Description>{address.number ? `No ${address.number},` : ""} {address.street ? `${address.street},` : ""} {address.suburb ? `${address.suburb},` : ""} {address.city ? `${address.city},` : ""} {address.state ? `${address.state},` : ""} {address.country?.name ?? ""}</List.Description>
                                </List.Content>
                            </Grid.Column>

                            <Grid.Column verticalAlign='middle' width={4}>
                                <Container textAlign='right' as='a' onClick={() => handleModeChange(EMode.Details, address.id)}>
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