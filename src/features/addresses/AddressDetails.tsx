import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Grid, Header, Icon, Image, Label, Modal, Segment, StrictHeaderProps } from "semantic-ui-react";
import { IAddress } from '../../app/model/address'
import apiAgent from '../../app/api/apiAgent'
import { NavLink, useHistory, useParams } from "react-router-dom";

interface IProps {
    id: string;
    handleId: (id: string) => void
    handleAdminHeadline: (headline: string, headlineColor: StrictHeaderProps["color"]) => void
}

export const AddressDetails: React.FC<IProps> = ({ id, handleId, handleAdminHeadline }) => {
    const agent = apiAgent.AddressesAPIAgent
    let history = useHistory();
    let urlParams: any = useParams();

    const [address, setAddress] = useState<IAddress>()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    useEffect(() => {
        handleAdminHeadline('Address Details', 'black')

        if (id === "") {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            id = urlParams.id?.toString();
            handleId(id)
        }

        agent.details(id).then(response => {
            setAddress(response)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onAddressDelete = () => {
        try {
            const title = address?.title
            agent.delete(id).then(() => {
                agent.details(id).then(response => {
                    if (response.id === undefined)
                        handleAdminHeadline(`Successfully removed address titled "${title}".`, 'red')
                    else
                        handleAdminHeadline(`Failed to remove address titled "${title}". Perhaps the address is used by other resources.`, 'red')
                })
            })
        } catch (error) {
            handleAdminHeadline("Could not delete address. Perhaps the address is used by other resources. If this is not the case, contact Administrator for the issue.", 'violet')
        }
    }

    return (
        <Container>
            <Segment padded>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src='/images/image.png' size="medium" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Label attached='top right'>Address Details</Label>
                        <Header size='large'>{address?.title}</Header>
                        <Label>
                            {address?.number ? `No ${address.number},` : ""} {address?.street ? `${address.street},` : ""} {address?.suburb ? `${address.suburb},` : ""} {address?.city ? `${address.city},` : ""} {address?.state ? `${address.state},` : ""} {address?.country?.name ?? ""} {address?.poBox ? `; P.O.Box ${address.poBox}` : ""}
                        </Label>
                    </Grid.Column>
                </Grid>

                <Divider horizontal>
                    <Icon name='tag' />
                </Divider>

                <Button.Group fluid>
                    <Button as={NavLink} to={`/admin/addresses/update/${id}`}
                        content="Update" color="green" icon="table"
                        onClick={() => {
                            handleId(id)
                        }} />
                    <Button.Or />
                    <Modal
                        trigger={<Button content={<del>Delete</del>} color="red" onClick={() => setDeleteModal(true)} icon="delete" />}
                        open={deleteModal}
                        basic
                        size='small'>
                        <Header icon='delete' color='red' content='Caution!' />
                        <Modal.Content>
                            <p>
                                {`This process is irreversible. Would you like to remove the address titled "${address?.title}"?`}
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic onClick={() => setDeleteModal(false)} color='grey' inverted>Cancel</Button>
                            <Button color='red' inverted
                                onClick={() => {
                                    onAddressDelete()
                                    history.push("/admin/addresses/")
                                }}>
                                <Icon name='remove' /> Delete
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Button.Group>
            </Segment>
        </Container >
    )

}