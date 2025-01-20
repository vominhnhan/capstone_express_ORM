import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";

const authService = {
  register: async (req) => {
    const { ho_ten, email, mat_khau, tuoi, anh_dai_dien } = req.body;

    // Check email exists
    const userExists = await prisma.nguoi_dung.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new BadRequestException(`Email exists`);
    }

    // Encryption password
    const hashPass = bcrypt.hashSync(mat_khau, 10);

    // Create new user
    const userNew = await prisma.nguoi_dung.create({
      data: {
        ho_ten: ho_ten,
        email: email,
        mat_khau: hashPass,
        tuoi: tuoi,
        anh_dai_dien: anh_dai_dien,
      },
    });

    // Delete password before returning
    delete userNew.mat_khau;

    return userNew;
  },

  login: async (req) => {
    const { email, mat_khau } = req.body;

    // Check email exists
    const userExists = await prisma.nguoi_dung.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      throw new BadRequestException(`Account is not exits. Please register!`);
    }

    // Compare password with hash password
    const password = bcrypt.compareSync(mat_khau, userExists.mat_khau);

    if (!password) {
      throw new BadRequestException(`Password is incorrect`);
    }

    return {
      accessToken: `accessToken`,
      refreshToken: `refreshToken`,
    };
  },
};

export default authService;
