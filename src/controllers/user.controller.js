import { responseSuccess } from "../common/helpers/response.helper.js";
import userService from "../services/user.service.js";

const userController = {
  getInfo: async (req, res, next) => {
    try {
      const result = await userService.getInfo(req);
      const resData = responseSuccess(
        result,
        `Get user #${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
  editUserInfo: async (req, res, next) => {
    try {
      const result = await userService.editUserInfo(req);
      const resData = responseSuccess(result, `Edit info user successfully`);
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
