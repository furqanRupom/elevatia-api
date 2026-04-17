import { Role } from "../../../generated/prisma/enums";

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRegisterPayload {
    name: string;
    email: string;
    password: string;
    role: Role
}

export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}