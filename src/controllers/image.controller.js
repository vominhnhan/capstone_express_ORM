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
    chekSaveImage: async (req, res, next) => {
        try {
            const result = await imageService.chekSaveImage(req);
            const resData = responseSuccess(result, result.data ? "Image has been saved." : "Image has not been saved.");
            res.status(resData.code).json(resData);
        } catch (err) {
            next(err);
        }
    },
    commentImage: async (req, res, next) => {
        try {
            const result = await imageService.commentImage(req);
            const resData = responseSuccess(result, `Add comment image by id: ${req.params.id} successfully`,201);
            res.status(resData.code).json(resData);
        } catch (err) {
            next(err);
        }
    }
}

export default imageCotroller