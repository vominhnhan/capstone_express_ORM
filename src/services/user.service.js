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
};

export default userService;
