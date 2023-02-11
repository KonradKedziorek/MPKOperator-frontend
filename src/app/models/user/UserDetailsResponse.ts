import { Role } from "../role/Role";

export interface UserDetailsResponse {
    uuid: string;
    name: string,
    surname: string;
    username: string;
    email: string;
    phoneNumber: string;
    pesel: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    roles: Set<Role>
    city: string;
    postcode: string;
    street: string;
    localNumber: string;
    houseNumber: string;
    isActive: string;
    busNumber: string;
}