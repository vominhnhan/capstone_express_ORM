import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authController = {
  register: async (req, res, next) => {
    try {
      const userNew = await authService.register(req);
      const resData = responseSuccess(userNew, `Register successfully`, 201);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const data = await authService.login(req);
      const resData = responseSuccess(data, `Login successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
