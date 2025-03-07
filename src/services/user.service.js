import {
  BadRequestException,
  NotFoundException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import { v2 as cloudinary } from "cloudinary";
import getInfoData from "../common/utils/getInfoData.js";

const userService = {
  // lay thong tin nguoi dung
  getInfo: async (req) => {
    // Get user id from token
    const userId = req.user.nguoi_dung_id;

    // Check user exists
    const user = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: parseInt(userId),
      },
    });

    // Remove password before returning
    delete user.mat_khau;

    return user;
  },

  // chỉnh sửa thông tin người dùng
  editUserInfo: async (req) => {
    const { ho_ten, tuoi } = req.body;
    const { user, file } = req;
    let uploadResult;

    cloudinary.config({
      cloud_name: "dsti6aojz",
      api_key: "374217273238878",
      api_secret: "uIeIWGgOWSBjT7fBRx7frtK56kE", // Click 'View API Keys' above to copy your API secret
    });

    // nếu có file ảnh thì upload lên cloudinary còn không thì giữ nguyên ảnh cũ
    if (file) {
      try {
        uploadResult = await new Promise((resolve) => {
          cloudinary.uploader
            .upload_stream({ folder: "images" }, (error, uploadResult) => {
              return resolve(uploadResult);
            })
            .end(file.buffer);
        });
      } catch (error) {
        throw new BadRequestException("Lỗi khi tải ảnh lên Cloudinary");
      }
    }

    // update thông tin người dùng nhưng giữ nguyên thông tin cũ nếu không có dữ liệu mới
    const updatedUser = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: user.nguoi_dung_id,
      },
      data: {
        ho_ten: ho_ten?.trim() || user.ho_ten,
        tuoi: +tuoi > 0 ? +tuoi : user.tuoi,
        anh_dai_dien: uploadResult?.secure_url ?? user.anh_dai_dien,
        updated_at: new Date(),
      },
    });

    if (!updatedUser)
      throw new BadRequestException("Cập nhật thông tin người dùng thất bại!");

    const userNewUpdate = getInfoData({
      fileds: ["nguoi_dung_id", "ho_ten", "tuoi", "anh_dai_dien"],
      object: updatedUser,
    });

    return userNewUpdate;
  },

  // lấy danh sách ảnh đã lưu theo user id
  getSavedImages: async (req) => {
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

  // lấy danh sách ảnh đã tạo theo user id
  getCreatedImages: async (req) => {
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

  // xóa ảnh user đã tạo theo id ảnh
  deleteImage: async (req) => {
    const { id } = req.params;
    const imageId = Number(id);

    if (isNaN(imageId)) {
      throw new BadRequestException("Invalid ID or missing!");
    }

    // Check image exists
    const imageExist = await prisma.hinh_anh.findFirst({
      where: { hinh_id: imageId },
    });

    if (!imageExist) throw new NotFoundException("Image not found");

    // Check permission
    if (imageExist.nguoi_dung_id !== req.user.nguoi_dung_id) {
      throw new BadRequestException(
        "You do not have permission to delete this image"
      );
    }

    // Delete image
    await prisma.hinh_anh.delete({
      where: { hinh_id: imageId },
    });
  },

  // thêm ảnh của user
  addImage: async (req) => {
    const file = req.file;
    const { mo_ta } = req.body;

    if (!file) {
      throw new BadRequestException("Please choose an image to upload");
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
        mo_ta: mo_ta || null,
        nguoi_dung_id: req.user.nguoi_dung_id,
        created_at: new Date(),
      },
    });

    return {
      ten_hinh: file.originalname,
      duong_dan: uploadResult.secure_url,
      mo_ta: mo_ta || null,
    };
  },
};

export default userService;