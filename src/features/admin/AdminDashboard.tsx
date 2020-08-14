import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Container, StrictHeaderProps } from 'semantic-ui-react';
import { AddressesDashboard } from '../../features/addresses/AddressesDashboard';

interface IProps {
    handleAdminHeadline: (active: boolean, header: string | undefined, headerColor: StrictHeaderProps["color"] | undefined) => void;
}

export const AdminDashboard: React.FC<IProps> = ({ handleAdminHeadline }) => {
    return (
        <Fragment>
            <Route exact path={"/admin"} render={() => (
                <Container>
                    Hello!
                </Container>
            )} />
            <Route path={"/admin/(.+)"} render={() => (
                <Fragment>
                    <Route path="/admin/addresses" render={() => <AddressesDashboard handleAdminHeadline={handleAdminHeadline} />} />
                </Fragment>
            )} />
        </Fragment>
    )
}