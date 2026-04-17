import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";
import { ILoginPayload, IRegisterPayload } from "./auth.interface";
import status from "http-status"

class Service {
    async register(payload: IRegisterPayload) {
        const { name, email, password } = payload;
        console.log(payload)
        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            }
        })
        if (!data.user) {
            throw new AppError(status.BAD_REQUEST, "User registration failed!")
        }

        const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            email: data.user.email,
            role: data.user.role,
            name: data.user.name,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })
        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            email: data.user.email,
            role: data.user.role,
            name: data.user.name,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })

        return {
            ...data,
            accessToken,
            refreshToken,
        }

    }
    async login(payload: ILoginPayload) {
        const { email, password } = payload;
        const data = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        if (!data.user) {
            throw new AppError(status.BAD_REQUEST, "Invalid email or password!")
        }
        if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
            throw new AppError(status.BAD_REQUEST, "User account has been deleted. Please contact support.")
        }
        if (data.user.status == UserStatus.BLOCKED) {
            throw new AppError(status.BAD_REQUEST, "User account is blocked. Please contact support.")
        }

        const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            email: data.user.email,
            role: data.user.role,
            name: data.user.name,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })
        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            email: data.user.email,
            role: data.user.role,
            name: data.user.name,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        })

        return {
            ...data,
            accessToken,
            refreshToken,
        }

    }
}
export const AuthService = new Service()