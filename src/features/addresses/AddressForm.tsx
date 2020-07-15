import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, DropdownItemProps, Form, StrictHeaderProps } from "semantic-ui-react";
import { EMode } from "../../app/api/EMode";
import apiAgent from "../../app/api/apiAgent";
import { IAddress } from "../../app/model/address";
import { ICountry } from "../../app/model/country";

interface IProps {
    id: string;
    handleModeChange: (mode: EMode, id: string) => void;
    handleHeadline: (update: string, color: StrictHeaderProps["color"]) => void
}


export const AddressForm: React.FC<IProps> = ({ id, handleModeChange, handleHeadline }) => {
    const countriesAgent = apiAgent.CountriesAPIAgent
    const addressesAgent = apiAgent.AddressesAPIAgent

    const [countries, setCountries] = useState<ICountry[]>()
    const [address, setAddress] = useState<IAddress>()

    let countriesOptions: DropdownItemProps[] = [];

    handleHeadline(id === "" ? "Create a new Address" : "Update existing Address", "black")

    useEffect(() => {
        countriesAgent.list().then(response => {
            setCountries(response)
        })

        if (id !== "") {
            addressesAgent.details(id).then(response => {
                setAddress(response)
            })
        }

    }, [countriesAgent, addressesAgent, id])

    countries?.forEach(country => {
        countriesOptions.push({ key: country.id, value: country.alpha2.toLowerCase(), flag: country.alpha2.toLowerCase(), text: country.name })
    })
    countriesOptions.sort((a, b) => ('' + a.text).localeCompare('' + b.text))

    return (
        <Container>
            <Form>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' value={address?.title ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>Number</label>
                    <input placeholder='Number' value={address?.number ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>Street</label>
                    <input placeholder='Street' value={address?.street ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>Suburb</label>
                    <input placeholder='Title' value={address?.suburb ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input placeholder='City' value={address?.city ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>State/Province</label>
                    <input placeholder='State/Province' value={address?.title ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>Country</label>
                    <Dropdown
                        placeholder='Select Country'
                        fluid
                        search
                        selection
                        options={countriesOptions}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Post Code</label>
                    <input placeholder='Post Code' value={address?.postCode ?? ""} />
                </Form.Field>
                <Form.Field>
                    <label>P.O.Box</label>
                    <input placeholder='P.O.Box' value={address?.poBox ?? ""} />
                </Form.Field>
                <Button.Group fluid>
                    <Button content='submit' icon="upload" type='submit' color='green' />
                </Button.Group>

            </Form>
        </Container>
    )

}

/*
export interface IAddress {
    id: string;
    title: string;
    number?: string;
    street?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: ICountry;
    postCode?: string;
    poBox?: string
}
*/