import {
  BadRequestException,
  NotFoundException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import getInfoData from "../common/utils/getInfoData.js";
import { v2 as cloudinary } from "cloudinary";

const imageService = {
  // Lấy danh sách ảnh
  getImages: async (req) => {
    let { page, pageSize } = req.query

    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;

    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.hinh_anh.count()
    const totlaPage = Math.ceil(totalItem / pageSize)

    const images = await prisma.hinh_anh.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        created_at: "desc",
      }
    })

    return {
      page,
      pageSize,
      totlaPage,
      totalItem,
      items: images,
      message: images.length === 0 ? "Không tìm thấy ảnh" : undefined
    }
  },
  // Lấy danh sách ảnh theo tên
  getImageByName: async (req) => {
    let { page, pageSize, search } = req.query

    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search?.trim() || '';


    const skip = (page - 1) * pageSize;
    const whereSearch = search ? { ten_hinh: { contains: search } } : {}

    const totalItem = await prisma.hinh_anh.count({ where: whereSearch })
    const totalPage = Math.ceil(totalItem / pageSize)

    const images = await prisma.hinh_anh.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { created_at: "desc" },
      where: whereSearch,
    })

    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      items: images,
      message: images.length === 0 ? "Không tìm thấy ảnh" : undefined
    }
  },
  // Lấy chi tiết ảnh
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
  // Kiểm tra ảnh đã được lưu chưa
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
