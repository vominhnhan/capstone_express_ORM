import {
  BadRequestException,
  NotFoundException,
} from "../common/helpers/error.helper.js";
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
  commentImage: async (req) => {
    const { id } = req.params;
    const { hinh_id, noi_dung } = req.body;
    let imageExist = await prisma.hinh_anh.findFirst({
      where: { hinh_id: +id },
    });
    if (!imageExist) throw new BadRequestException("ảnh không tồn tại");

    const commentNew = await prisma.binh_luan.create({
      data: {
        nguoi_dung_id: req.user.nguoi_dung_id,
        hinh_id,
        ngay_binh_luan: new Date(),
        noi_dung,
      },
    });

    return commentNew;
  },
  getSavedImage: async (req) => {
    // Get user id from token
    const userId = req.user.nguoi_dung_id;

    // Get images by user id
    const images = await prisma.hinh_anh.findMany({
      where: {
        luu_anh: {
          some: {
            nguoi_dung_id: parseInt(userId),
          },
        },
      },
    });

    return images;
  },
  getCreatedImage: async (req) => {
    // Get user id from token
    const userId = req.user.nguoi_dung_id;

    // Get images by user id
    const images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: parseInt(userId),
      },
    });

    return images;
  },
  deleteImage: async (req) => {
    const { id } = req.params;

    // Check id is a number and similar to string id
    const imageId = parseInt(id);
    if (isNaN(imageId) || String(imageId) !== id) {
      throw new BadRequestException("Invalid image ID");
    }

    // Check image exists
    const imageExist = await prisma.hinh_anh.findFirst({
      where: { hinh_id: imageId },
    });
    if (!imageExist) throw new NotFoundException("Image not found");

    // Delete image
    await prisma.hinh_anh.delete({
      where: { hinh_id: imageId },
    });

    return imageExist;
  },
  addImage: async (req) => {
    const { ten_hinh, duong_dan, mo_ta } = req.body;

    // Create new image
    const image = await prisma.hinh_anh.create({
      data: {
        ten_hinh: ten_hinh,
        duong_dan: duong_dan,
        mo_ta: mo_ta,
        nguoi_dung_id: req.user.nguoi_dung_id,
      },
    });

    return image;
  },
};

export default imageService;
