export interface UserRequest {
    uuid: string;
    name: string,
    surname: string;
    email: string;
    pesel: string;
    phoneNumber: string;
    city: string;
    postcode: string;
    street: string;
    localNumber: string;
    houseNumber: string;
    isActive: string;
    busNumber: string;
    roles: Set<String>
}