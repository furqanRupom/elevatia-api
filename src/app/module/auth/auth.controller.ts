import BaseController from "../../shared/baseController";
import { authService } from "./auth.service";
import httpStatus from "http-status";

 class Controller extends BaseController {
    register = this.catchAsync(async (req, res) => {
        const result = await authService.register()
        this.sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User registered successfully",
            data: result
        })
    })
}
export const authController = new Controller()