import React, { useEffect, useState } from 'react';
import { Button, Container, Divider, Header, Icon, StrictHeaderProps } from 'semantic-ui-react';
import { EMode } from '../../app/api/EMode';
import { AddressDetails } from './AddressDetails';
import { AddressesList } from './AddressesList';
import { AddressForm } from './AddressForm';

export const AddressesDashboard: React.FC = () => {

    const [mode, setMode] = useState<EMode>(EMode.List)
    const [id, setId] = useState<string>("")
    const [headline, setHeadline] = useState<string>("")
    const [headlineColor, setHeadlineColor] = useState<StrictHeaderProps["color"]>("black")

    useEffect(() => {

    }, [])


    const onModeChange = (mode: EMode, id: string = "") => {
        setMode(mode)
        if (id !== "") { setId(id) }
    }

    const onHeadlineUpdate = (update: string, color: StrictHeaderProps["color"]) => {
        setHeadline(update)
        setHeadlineColor(color)
    }

    const renderMode = () => {
        switch (mode) {
            case EMode.List:
                return (
                    <Container>
                        <Divider horizontal>
                            <Button content="Create a new Address" onClick={() => onModeChange(EMode.Create, "")} color="teal" icon="home" />
                        </Divider>
                        <AddressesList
                            handleModeChange={onModeChange}
                            handleHeadline={onHeadlineUpdate}
                        />
                    </Container>
                )
            case EMode.Details:
            case EMode.Delete:
                return (
                    <AddressDetails
                        id={id}
                        handleModeChange={onModeChange}
                        handleHeadline={onHeadlineUpdate}
                    />)
            case EMode.Create:
                return (
                    <AddressForm
                        id={""}
                        handleModeChange={onModeChange}
                        handleHeadline={onHeadlineUpdate}
                    />)
            case EMode.Update:
                return (
                    <AddressForm
                        id={id}
                        handleModeChange={onModeChange}
                        handleHeadline={onHeadlineUpdate}
                    />)
        }
    }

    return (
        <Container>
            <Header as='h3' color={headlineColor} block>
                <Container textAlign='left' as='a' onClick={() => setMode(EMode.List)}>
                    {mode !== EMode.List &&
                        <Icon.Group size='large'>
                            <Icon loading size='large' name='circle notch' color="black" />
                            <Icon name='arrow left' color="black" />
                        </Icon.Group>
                    }
                    {headline}
                </Container>
            </Header>
            {renderMode()}
        </Container>
    )
}