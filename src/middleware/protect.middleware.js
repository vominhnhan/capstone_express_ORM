import jwt from "jsonwebtoken";
import { UnauthorizationException } from "../common/helpers/error.helper.js";
import { ACCESS_TOKEN_SECRET } from "../common/constant/app.constant.js";
import prisma from "../common/prisma/init.prisma.js";

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      throw new UnauthorizationException("Access token is required to use");
    }

    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    const user = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: decode.userId,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
