import axios, { AxiosResponse } from "axios"
import { IAddress } from "../model/address"
import { ICountry } from "../model/country"

axios.defaults.baseURL = "http://localhost:5000/api"
const responseBody = (response: AxiosResponse) => response.data

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const CountriesAPIAgent = {
    list: (): Promise<ICountry[]> => request.get("/countries"),
    details: (id: string): Promise<ICountry> => request.get(`/countries/${id}`),
    detailsByCode: (code: string): Promise<ICountry> => request.get(`/countries/code/${code}`)
}

const AddressesAPIAgent = {
    list: (): Promise<IAddress[]> => request.get("/addresses"),
    details: (id: string): Promise<IAddress> => request.get(`/addresses/${id}`),
    create: (address: IAddress) => request.post('/addresses', JSON.stringify(address)),
    update: (address: IAddress) => request.put(`/addresses/${address.id}`, address),
    delete: (id: string) => request.delete(`/addresses/${id}`)
}

export default {
    CountriesAPIAgent,
    AddressesAPIAgent
}
