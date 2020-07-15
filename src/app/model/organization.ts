import { IAddress } from "./address";

export interface IOrganization {
    id: string;
    name: string;
    tooltip?: string;
    fullName?: string;
    logo?: string;
    registrationNo?: string;
    location?: IAddress;
    url?: string;
}