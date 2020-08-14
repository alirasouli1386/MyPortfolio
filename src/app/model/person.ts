import { ICountry } from "./country";
import { IAddress } from "./address";

export interface IPerson {
    id: string;
    namePrefix?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    nickName: string;
    birthDate?: Date;
    birthCountry?: ICountry;
    descentCitizenship?: ICountry;
    birthCertificateId?: string;
    personalPhoto?: string;
    gender?: string;
    maritalStatus?: string;
    currentResidence?: ICountry;
    address?: IAddress;
    mobilePhoneNo?: string;
    workEmail?: string;
    personalWebsite?: string;
    socialMedia?: string;
    about?: string;
}