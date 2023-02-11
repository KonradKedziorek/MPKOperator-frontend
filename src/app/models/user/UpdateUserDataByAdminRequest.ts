export interface UpdateUserDataByAdminRequest {
    uuid: string;
    name: string,
    surname: string;
    username: string;
    email: string;
    password: string;
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