import prisma from "../common/prisma/init.prisma.js";

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
    const { ho_ten, tuoi, anh_dai_dien } = req.body;

    const { user } = req;
    const updateNew = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: user.nguoi_dung_id,
      },
      data: {
        ho_ten: ho_ten?.trim() ? ho_ten?.trim() : user.ho_ten,
        tuoi: Number.isInteger(tuoi) && tuoi > 0 ? tuoi : user.tuoi,
        anh_dai_dien: anh_dai_dien ?? user.anh_dai_dien,
      },
    });

    return updateNew;
  },
};

export default userService;
