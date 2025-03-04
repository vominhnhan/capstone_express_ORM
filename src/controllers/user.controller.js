import { responseSuccess } from "../common/helpers/response.helper.js";
import userService from "../services/user.service.js";

const userController = {
  // Lấy thông tin người dùng
  getInfo: async (req, res, next) => {
    try {
      const result = await userService.getInfo(req);
      const resData = responseSuccess(
        result,
        `Get user #${req.user.nguoi_dung_id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  // Chỉnh sửa thông tin người dùng theo ID
  editUserInfo: async (req, res, next) => {
    try {
      const result = await userService.editUserInfo(req);
      const resData = responseSuccess(result, `Edit info user successfully`);
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  getSavedImages: async (req, res, next) => {
    try {
      const result = await userService.getSavedImages(req);
      const resData = responseSuccess(
        result,
        `Get save images by user id: ${req.user.nguoi_dung_id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  getCreatedImages: async (req, res, next) => {
    try {
      const result = await userService.getCreatedImages(req);
      const resData = responseSuccess(
        result,
        `Get created images by user id: ${req.user.nguoi_dung_id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  deleteImage: async (req, res, next) => {
    try {
      const result = await userService.deleteImage(req);
      const resData = responseSuccess(
        result,
        `Delete image by id: ${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  addImage: async (req, res, next) => {
    try {
      const result = await userService.addImage(req);
      const resData = responseSuccess(result, "Add image successfully", 201);
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
