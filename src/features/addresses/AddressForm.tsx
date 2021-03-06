import React, { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Dropdown, DropdownItemProps, DropdownProps, Form, StrictHeaderProps } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import apiAgent from "../../app/api/apiAgent";
import { IAddress } from "../../app/model/address";
import { ICountry } from "../../app/model/country";

interface IProps {
    id: string;
    handleAdminHeadline: (headline: string, headlineColor: StrictHeaderProps["color"]) => void
}

export const AddressForm: React.FC<IProps> = ({ id, handleAdminHeadline }) => {
    const countriesAgent = apiAgent.CountriesAPIAgent
    const addressesAgent = apiAgent.AddressesAPIAgent

    let history = useHistory();

    useEffect(() => {
        id === "" ? handleAdminHeadline('Create a new Address', 'teal') : handleAdminHeadline('Update an existing Address', 'black')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [address, setAddress] = useState<IAddress>({
        id: "",
        title: "",
        number: "",
        street: "",
        suburb: "",
        city: "",
        state: "",
        countryId: undefined,
        postCode: "",
        poBox: ""
    })
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    useEffect(() => {
        if (id !== "") {
            addressesAgent.details(id).then(response => {
                let loadedAddress = {
                    id: response.id,
                    title: response.title,
                    number: response.number,
                    street: response.street,
                    suburb: response.suburb,
                    city: response.city,
                    state: response.state,
                    countryId: response.countryId,
                    postCode: response.postCode,
                    poBox: response.poBox
                }
                setAddress(loadedAddress)
                setSelectedCountry(response.countryId ?? "")
            })
        }
    }, [addressesAgent, id])

    const [countriesOptions, setCountriesOptions] = useState<DropdownItemProps[]>(
        [{ "key": "", "value": "", "flag": "", "text": "" }]
    )
    useEffect(() => {
        countriesAgent.list().then(response => {
            let countries: ICountry[] = response
            let options: DropdownItemProps[] = []

            countries.forEach(country => {
                options.push({ key: country.id, value: country.id.toLowerCase(), flag: country.alpha2.toLowerCase(), text: country.name })
            })

            options.sort((a, b) => ('' + a.text).localeCompare('' + b.text))
            setCountriesOptions(options)
        })
    }, [countriesAgent])

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget
        setAddress({ ...address, [name]: value })
    }

    const handleCountryChange = (event: FormEvent<HTMLElement>, data: DropdownProps) => {
        setSelectedCountry(data.value!.toString())
        setAddress({ ...address, countryId: data.value!.toString() })
    }

    const handleSubmit = () => {
        if (address.id.length === 0) {
            const newId = uuid()
            let newAddress = { ...address, id: newId }
            addressesAgent.create(newAddress)
            handleAdminHeadline(`A new address titled "${newAddress.title}" has been created.`, 'teal')
        } else {
            addressesAgent.update(address)
            handleAdminHeadline(`An address titled "${address.title}" has been updated.`, 'green')
        }
        history.goBack()
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title'
                        value={address.title}
                        name="title"
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>Number</label>
                    <input placeholder='Number'
                        name="number"
                        value={address.number}
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>Street</label>
                    <input placeholder='Street'
                        name="street"
                        value={address.street}
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>Suburb</label>
                    <input placeholder='Suburb'
                        name="suburb"
                        value={address.suburb}
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input placeholder='City'
                        name="city"
                        value={address.city}
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>State/Province</label>
                    <input placeholder='State/Province'
                        name="state"
                        value={address.state}
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>Country</label>
                    <Dropdown
                        placeholder='Select Country'
                        name="country"
                        selectOnBlur={false}
                        floating
                        search
                        value={selectedCountry}
                        options={countriesOptions}
                        onChange={handleCountryChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Post Code</label>
                    <input placeholder='Post Code'
                        name="postCode"
                        value={address.postCode}
                        onChange={handleInputChange} />
                </Form.Field>
                <Form.Field>
                    <label>P.O.Box</label>
                    <input placeholder='P.O.Box'
                        name="poBox"
                        value={address.poBox}
                        onChange={handleInputChange} />
                </Form.Field>
                <Button.Group fluid>
                    <Button content='submit' icon="upload" type='submit' color='green' />
                </Button.Group>
            </Form>
        </Container>
    )
}