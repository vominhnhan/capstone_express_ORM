import { responseSuccess } from "../common/helpers/response.helper.js";
import imageService from "../services/image.service.js";

const imageCotroller = {
  getDetailImage: async (req, res, next) => {
    try {
      const result = await imageService.getDetailImage(req);
      const resData = responseSuccess(
        result,
        `Get detail image by id: ${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },

  getSavedImagesByUserId: async (req, res, next) => {
    try {
      const result = await imageService.getSavedImagesByUserId(req);
      const resData = responseSuccess(
        result,
        `Get saved images by user id: ${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
};

export default imageCotroller;
