import {
  BadRequestException,
  NotFoundException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import getInfoData from "../common/utils/getInfoData.js";
import { v2 as cloudinary } from "cloudinary";

const imageService = {
  getDetailImage: async (req) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum))
      throw new BadRequestException("ID không hợp lệ hoặc bị thiếu!");

    const imageExists = await prisma.hinh_anh.findFirst({
      where: { hinh_id: idNum },
    });

    if (!imageExists) throw new NotFoundException("Không tìm thấy ảnh");

    const userExists = await prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: imageExists.nguoi_dung_id },
    });

    if (!userExists) throw new NotFoundException("Không tìm thấy nguoi dung");

    const user = getInfoData({
      fileds: ["nguoi_dung_id", "ho_ten", "tuoi", "anh_dai_dien"],
      object: userExists,
    });
    const image = getInfoData({
      fileds: ["hinh_id", "ten_hinh", "duong_dan", "mo_ta"],
      object: imageExists,
    });

    return { image, user };
  },
  getCommentByIdImage: async (req) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum))
      throw new BadRequestException("ID không hợp lệ hoặc bị thiếu!");

    // Kiểm tra xem ảnh có tồn tại không
    const imageExists = await prisma.hinh_anh.findUnique({
      where: { hinh_id: idNum },
    });

    if (!imageExists) throw new NotFoundException("Ảnh không tồn tại!");

    // Lấy danh sách bình luận
    const commentData = await prisma.binh_luan.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: { hinh_id: idNum },
    });

    if (commentData.length === 0)
      throw new NotFoundException("Ảnh không có bình luận nào cả");

    return commentData;
  },
  chekSaveImage: async (req) => {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum))
      throw new BadRequestException("ID không hợp lệ hoặc bị thiếu!");

    // Kiểm tra ảnh tồn tại
    let imageExist = await prisma.hinh_anh.findFirst({
      where: { hinh_id: idNum },
    });
    if (!imageExist) throw new NotFoundException("ảnh không tìm thấy");

    // Kiểm tra người dùng đã lưu ảnh chưa
    const userSavedImage = await prisma.luu_anh.findFirst({
      where: {
        hinh_id: idNum,
        nguoi_dung_id: req.user.nguoi_dung_id,
      },
    });

    return {
      hinh_anh: idNum,
      isCheckSave: !!userSavedImage, // Chuyển đổi sang boolean
    };
  },
  commentImage: async (req) => {
    const { id } = req.params;
    const idNum = Number(id);
    const { noi_dung } = req.body;

    if (isNaN(idNum))
      throw new BadRequestException("ID không hợp lệ hoặc bị thiếu!");

    let imageExist = await prisma.hinh_anh.findFirst({
      where: { hinh_id: idNum },
    });

    if (!imageExist) throw new NotFoundException("ảnh không tìm thấy");

    const commentNew = await prisma.binh_luan.create({
      data: {
        nguoi_dung_id: req.user.nguoi_dung_id,
        hinh_id: idNum,
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
    const images = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: parseInt(userId),
      },
      orderBy: {
        created_at: "desc",
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
      orderBy: {
        created_at: "desc",
      },
    });

    return images;
  },
  deleteImage: async (req) => {
    const { id } = req.params;
    const imageId = parseInt(id);

    // Check id similar to string id
    if (String(imageId) !== id) {
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
  },
  addImage: async (req) => {
    const file = req.file;

    if (!file) {
      throw new BadRequestException("Please upload an image");
    }

    // Configuration
    cloudinary.config({
      cloud_name: "dsti6aojz",
      api_key: "374217273238878",
      api_secret: "uIeIWGgOWSBjT7fBRx7frtK56kE", // Click 'View API Keys' above to copy your API secret
    });

    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream({ folder: "images" }, (error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });

    await prisma.hinh_anh.create({
      data: {
        ten_hinh: file.originalname,
        duong_dan: uploadResult.secure_url,
        nguoi_dung_id: req.user.nguoi_dung_id,
      },
    });

    return {
      ten_hinh: file.originalname,
      duong_dan: uploadResult.secure_url,
    };
  },
};

export default imageService;
