export interface User {
    uuid: string;
    name: string,
    surname: string;
    username: string;
    email: string;
    password: string;
    pesel: string;
    phoneNumber: string;
    isActive: string;
    city: string;
    postcode: string;
    street: string;
    localNumber: string;
    houseNumber: string;
    busNumber: string;
    roles: Set<String>;
}