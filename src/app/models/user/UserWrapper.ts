import { Role } from "../role/Role";
import { User } from "./User";

export interface UserWrapper {
    data: Array<User>;
    roles: Set<Role>;
    page: number;
    size: number;
  }