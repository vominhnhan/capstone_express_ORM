import { responseSuccess } from "../common/helpers/response.helper.js";
import homeService from "../services/home.service.js";

const homeController = {
    getImages: async (req, res, next) => {
        try {
            const dataNew = await homeService.getImages(req);
            const resData = responseSuccess(dataNew, `Get successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    getImageByName: async (req, res, next) => {
        try {
            const dataNew = await homeService.getImageByName(req);
            const resData = responseSuccess(dataNew, `Get Image by name successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },

}

export default homeController