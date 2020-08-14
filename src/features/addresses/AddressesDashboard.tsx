import React, { Fragment, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Button, Container, Divider, StrictHeaderProps } from 'semantic-ui-react';
import { AddressDetails } from './AddressDetails';
import { AddressesList } from './AddressesList';
import { AddressForm } from './AddressForm';

interface IProps {
    handleAdminHeadline: (active: boolean, header: string | undefined, headerColor: StrictHeaderProps["color"] | undefined) => void;
}

export const AddressesDashboard: React.FC<IProps> = ({ handleAdminHeadline }) => {
    const [id, setId] = useState<string>("")

    const onIdChange = (id: string) => {
        setId(id)
    }

    const onHeadlineUpdate = (headline: string, headlineColor: StrictHeaderProps["color"]) => {
        handleAdminHeadline(headline === "" ? false : true, headline, headlineColor)
    }

    return (
        <Container>
            <Switch>
                <Route exact path={"/admin/addresses"} render={() => (
                    <Fragment>
                        <Divider horizontal>
                            <Button as={NavLink} to="/admin/addresses/create"
                                content="Create a new Address"
                                onClick={() => { handleAdminHeadline(true, 'Create a new Address', 'teal') }}
                                color="teal" icon="home" />
                        </Divider>
                        <AddressesList handleId={onIdChange} handleAdminHeadline={onHeadlineUpdate} />
                    </Fragment>
                )} />

                <Route path="/admin/addresses/details/:id" render={() => (
                    <Fragment>
                        <AddressDetails id={id} handleId={onIdChange} handleAdminHeadline={onHeadlineUpdate} />
                    </Fragment>)} />
                <Route path="/admin/addresses/create" render={() => (
                    <Fragment>
                        <AddressForm id={""} handleAdminHeadline={onHeadlineUpdate} />
                    </Fragment>)} />
                <Route path="/admin/addresses/update/:id" render={() => (
                    <Fragment>
                        <AddressForm id={id} handleAdminHeadline={onHeadlineUpdate} />
                    </Fragment>)} />
            </Switch>
        </Container>
    )
}