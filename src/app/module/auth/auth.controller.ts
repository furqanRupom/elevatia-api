import { Request, Response } from "express";
import { envVars } from "../../config/env";
import BaseController from "../../shared/baseController";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import ms, { StringValue } from "ms"
import { tokenUtils } from "../../utils/token";

class Controller extends BaseController {
    register = this.catchAsync(async (req: Request, res: Response) => {
        const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as StringValue)
        const payload = req.body;
        const result = await AuthService.register(payload)

        const { accessToken, refreshToken, token, ...rest } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthSessionCookie(res, token as string)
        this.sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User registered successfully",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }
        })
    })
    login = this.catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.login(payload)

        const { accessToken, refreshToken, token, ...rest } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthSessionCookie(res, token)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken,
                refreshToken,
                token,
                ...rest
            }
        })
    })
}
export const AuthController = new Controller()