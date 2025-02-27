import { BadRequestException } from "../common/helpers/error.helper.js";
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

    // Remove password field
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
        tuoi: Number.isInteger(tuoi) && tuoi > 0 ? tuoi : user.tuoi,
        anh_dai_dien: uploadResult?.secure_url ?? user.anh_dai_dien,
        updated_at: new Date()
      },
    });

    if (!updatedUser) throw new BadRequestException("Cập nhật thông tin người dùng thất bại!");

    const userNewUpdate = getInfoData({
      fileds: ["nguoi_dung_id", "ho_ten", "tuoi", "anh_dai_dien"],
      object: updatedUser,
    });

    return userNewUpdate;
  },
};

export default userService;
