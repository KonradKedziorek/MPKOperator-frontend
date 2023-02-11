import { Role } from "../role/Role";

export interface UserResponse {
    uuid: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    phoneNumber: string;
    roles: Set<Role>;
    isActive: string;
}