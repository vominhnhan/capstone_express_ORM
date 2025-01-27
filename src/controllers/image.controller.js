import { responseSuccess } from "../common/helpers/response.helper.js";
import imageService from "../services/image.service.js";

const imageCotroller = {
    getDetailImage: async (req, res, next) => {
        try {
            const result = await imageService.getDetailImage(req);
            const resData = responseSuccess(result, `Get detail image by id: ${req.params.id} successfully`);
            res.status(resData.code).json(resData);
        } catch (err) {
            next(err);
        }
    },
    getCommentByIdImage: async (req, res, next) => {
        try {
            const result = await imageService.getCommentByIdImage(req);
            const resData = responseSuccess(result, `Get comment image by id: ${req.params.id} successfully`);
            res.status(resData.code).json(resData);
        } catch (err) {
            next(err);
        }
    },
}

export default imageCotroller