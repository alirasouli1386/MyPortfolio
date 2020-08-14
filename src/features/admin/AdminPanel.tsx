import React, { useState } from 'react'
import { Container, Grid, StrictHeaderProps } from 'semantic-ui-react'
import { AdminDashboard } from './AdminDashboard'
import { AdminHeader } from './AdminHeader'
import { AdminMenu } from './AdminMenu'

export const AdminPanel: React.FC = () => {
    const [headerProperties, setHeaderProperties] = useState<[boolean, String | undefined, StrictHeaderProps["color"] | undefined]>([false, 'Headline', 'black']);

    const onHeadlineUpdate = (active: boolean, header: string | undefined, headerColor: StrictHeaderProps["color"] | undefined) => {
        setHeaderProperties([active, header, headerColor]);
    }

    return (
        <Container style={{ marginTop: "7em" }}>
            <h1>My Panel</h1>
            <AdminHeader active={headerProperties[0]} headline={headerProperties[1]} headlineColor={headerProperties[2]} />
            <br />
            <Grid >
                <Grid.Row stretched>
                    <Grid.Column width={4}>
                        <AdminMenu />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <AdminDashboard handleAdminHeadline={onHeadlineUpdate} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br />
        </Container>
    )
}