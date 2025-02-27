import prisma from "../common/prisma/init.prisma.js";
import { v2 as cloudinary } from "cloudinary";

const userService = {
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
  editUserInfo: async (req) => {
    const { ho_ten, tuoi } = req.body;

    const { user, file } = req;

    // Configuration
    cloudinary.config({
      cloud_name: "dsti6aojz",
      api_key: "374217273238878",
      api_secret: "uIeIWGgOWSBjT7fBRx7frtK56kE", // Click 'View API Keys' above to copy your API secret
    });

    let uploadResult;

    if (file) {
      uploadResult = await new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream({ folder: "images" }, (error, uploadResult) => {
            return resolve(uploadResult);
          })
          .end(file.buffer);
      });
    }


    const updateNew = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: user.nguoi_dung_id,
      },
      data: {
        ho_ten: ho_ten?.trim() ? ho_ten?.trim() : user.ho_ten,
        tuoi: Number.isInteger(tuoi) && tuoi > 0 ? tuoi : user.tuoi,
        anh_dai_dien: uploadResult ? uploadResult.secure_url : user.anh_dai_dien,
      },
    });

    return updateNew;
  },
};

export default userService;
