import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const imageService = {
  getDetailImage: async (req) => {
    const { id } = req.params;
    const imageData = await prisma.hinh_anh.findFirst({
      where: { hinh_id: +id },
    });
    if (!imageData) throw new BadRequestException("ảnh không tồn tại");
    return imageData;
  },
  getCommentByIdImage: async (req) => {
    const { id } = req.params;
    const commentData = await prisma.binh_luan.findMany({
      where: { hinh_id: +id },
    });
    if (!commentData || commentData.length === 0)
      throw new BadRequestException("ảnh không không có bình luận nào cả");
    return commentData;
  },
  chekSaveImage: async (req) => {
    const { id } = req.params;

    let imageExist = await prisma.hinh_anh.findFirst({
      where: { hinh_id: +id },
    });
    if (!imageExist) throw new BadRequestException("ảnh không tồn tại");

    imageExist = await prisma.luu_anh.findFirst({
      where: {
        hinh_id: +id,
        nguoi_dung_id: req.user.nguoi_dung_id,
      },
    });

    return {
      hinh_anh: id,
      isCheckSave: imageExist ? true : false,
      data: imageExist || null,
    };
  },
};

// Check user exists
//   const userExist = await prisma.nguoi_dung.findUnique({
//     where: {
//       nguoi_dung_id: parseInt(id),
//     },
//   });
//   if (!userExist) {
//     throw new NotFoundException(`User with id ${id} not found`);
//   }

//   // Get images by user id
//   const images = await prisma.hinh_anh.findMany({
//     where: {
//       nguoi_dung_id: parseInt(id),
//     },
//   });

//   // Check images exists
//   if (!images || images.length === 0) {
//     throw new NotFoundException(`No images founded for this user`);
//   }
//   return images;
// },
// };

export default imageService;
