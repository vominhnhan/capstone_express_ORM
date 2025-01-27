import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const imageService = {
  getDetailImage: async (req) => {
    const { id } = req.params;
    const imageData = await prisma.hinh_anh.findFirst({
      where: { hinh_id: +id },
    });
    if (!imageData) throw new BadRequestException("ảnh không tồn tại");

    return imageData;
  },

  getSavedImagesByUserId: async (req) => {
    const { id } = req.params;

    // Check id is a number and similar to string id
    const userId = parseInt(id);
    if (isNaN(userId) || String(userId) !== id) {
      throw new BadRequestException("Invalid user ID");
    }

    // Check user exists
    const userExist = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: parseInt(id),
      },
    });
    if (!userExist) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Get images by user id
    const images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: parseInt(id),
      },
    });

    // Check images exists
    if (!images || images.length === 0) {
      throw new NotFoundException(`No images founded for this user`);
    }
    return images;
  },
};

export default imageService;
