import { responseSuccess } from "../common/helpers/response.helper.js";
import commentService from "../services/comment.service.js";

const commentController = {
  // Lấy danh sách bình luận theo ID ảnh
  getCommentByIdImage: async (req, res, next) => {
    try {
      const result = await commentService.getCommentByIdImage(req);
      const resData = responseSuccess(
        result,
        `Get comment image by id: ${req.params.id} successfully`
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
  // Bình luận ảnh
  commentImage: async (req, res, next) => {
    try {
      const result = await commentService.commentImage(req);
      const resData = responseSuccess(
        result,
        `Add comment image successfully`,
        201
      );
      res.status(resData.code).json(resData);
    } catch (err) {
      next(err);
    }
  },
};

export default commentController;
