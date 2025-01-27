import {
  BadRequestException,
  NotFoundException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const userService = {
  getInfo: async function (req) {
    // Get user id from token
    const userId = req.user.nguoi_dung_id;

    // Check user exists
    const userExist = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: parseInt(userId),
      },
    });

    return userExist;
  },
  editUserInfo: async (req) => {
    const { ho_ten, tuoi, anh_dai_dien } = req.body
    
    const { user } = req
    const updateNew = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: user.nguoi_dung_id
      },
      data: {
        ho_ten: ho_ten?.trim() ? ho_ten?.trim() : user.ho_ten,
        tuoi: tuoi ? tuoi : user.tuoi,
        anh_dai_dien: anh_dai_dien ? anh_dai_dien : user.anh_dai_dien,
      }
    })

    return updateNew
  }
};

export default userService;
