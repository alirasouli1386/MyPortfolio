import { ICountry } from "./country";

export interface IVisa {
    Id: string;
    Country: ICountry;
    Title: string;
    Subclass?: string;
    GrantDate: Date;
    DueDate?: Date;
    Description?: string;
}