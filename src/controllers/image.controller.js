import { responseSuccess } from "../common/helpers/response.helper.js";
import imageService from "../services/image.service.js";

const imageController = {
  // lay danh sach anh
  getImages: async (req, res, next) => {
    try {
      const result = await imageService.getImages(req);
      const resData = responseSuccess(result, `Get successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  // lay anh theo ten
  getImageByName: async (req, res, next) => {
    try {
      const result = await imageService.getImageByName(req);
      const resData = responseSuccess(
        result,
        `Get Image by name successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  // lay chi tiet anh
  getDetailImage: async (req, res, next) => {
    try {
      const result = await imageService.getDetailImage(req);
      const resData = responseSuccess(
        result,
        `Get detail image by id successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
  // kiem tra anh da duoc luu chua
  chekSaveImage: async (req, res, next) => {
    try {
      const result = await imageService.chekSaveImage(req);
      const resData = responseSuccess(result, "Image has been saved.", 200);
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
};

export default imageController;
