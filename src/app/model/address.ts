import { ICountry } from "./country";

export interface IAddress {
    id: string;
    title: string;
    number?: string;
    street?: string;
    suburb?: string;
    city?: string;
    state?: string;
    countryId?: string;
    country?: ICountry;
    postCode?: string;
    poBox?: string
}