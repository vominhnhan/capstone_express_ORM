import { BadRequestException } from "../common/helpers/error.helper.js"
import prisma from "../common/prisma/init.prisma.js"

const imageService = {
    getDetailImage: async (req) => {
        const { id } = req.params
        const imageData = await prisma.hinh_anh.findFirst({ where: { hinh_id: +id } })
        if (!imageData) throw new BadRequestException("ảnh không tồn tại");

        return imageData
    }
}

export default imageService