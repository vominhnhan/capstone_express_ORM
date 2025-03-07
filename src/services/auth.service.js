import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";
import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        created_at: new Date(),
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

    const tokens = authService.createTokens(userExists.nguoi_dung_id);

    return tokens;
  },

  createTokens: (userId) => {
    if (!userId) {
      throw new BadRequestException(`User is not exits`);
    }
    const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });

    const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
};

export default authService;
