import { responseSuccess } from "../common/helpers/response.helper.js";
import userService from "../services/user.service.js";

const userController = {
  getUserById: async function (req, res, next) {
    try {
      const result = await userService.getUserById(req);
      const resData = responseSuccess(
        result,
        `Get user #${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  getImagesByUserId: async function (req, res, next) {
    try {
      const result = await userService.getImagesByUserId(req);
      const resData = responseSuccess(
        result,
        `Get images by user #${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
