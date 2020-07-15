import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Grid, Header, Icon, Image, Label, Modal, Segment, StrictHeaderProps } from "semantic-ui-react";
import { IAddress } from '../../app/model/address'
import apiAgent from '../../app/api/apiAgent'
import { EMode } from "../../app/api/EMode";

interface IProps {
    id: string;
    handleModeChange: (mode: EMode, id: string) => void
    handleHeadline: (update: string, color: StrictHeaderProps["color"]) => void
}

export const AddressDetails: React.FC<IProps> = ({ id, handleModeChange, handleHeadline }) => {
    const agent = apiAgent.AddressesAPIAgent

    const [address, setAddress] = useState<IAddress>()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    handleHeadline("Address Details", "black")

    useEffect(() => {
        agent.details(id).then(response => {
            setAddress(response)
        })
    }, [agent, id])

    const onAddressDelete = () => {
        try {
            const title = address?.title
            agent.delete(id).then(() => {
                handleHeadline(`Successfully removed address titled "${title}".`, "violet")
                handleModeChange(EMode.List, "")
            })
        } catch (error) {
            handleHeadline("Could not delete address. Perhaps the address is used by other resources.", "red")
            handleModeChange(EMode.List, id)
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
                            {address?.number ? `No ${address.number},` : ""} {address?.street ? `${address.street},` : ""} {address?.suburb ? `${address.suburb},` : ""} {address?.city ? `${address.city},` : ""} {address?.state ? `${address.state},` : ""} {address?.country?.name ?? ""}
                        </Label>
                    </Grid.Column>
                </Grid>

                <Divider horizontal>
                    <Icon name='tag' />
                </Divider>

                <Button.Group fluid>
                    <Button content="Update" onClick={() => handleModeChange(EMode.Update, id)} color="green" icon="table" />
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
                            <Button color='red' inverted onClick={() => onAddressDelete()}>
                                <Icon name='remove' /> Delete
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Button.Group>
            </Segment>
        </Container >
    )

}