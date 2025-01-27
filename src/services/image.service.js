import { BadRequestException } from "../common/helpers/error.helper.js"
import prisma from "../common/prisma/init.prisma.js"

const imageService = {
    getDetailImage: async (req) => {
        const { id } = req.params
        const imageData = await prisma.hinh_anh.findFirst({ where: { hinh_id: +id } })
        if (!imageData) throw new BadRequestException("ảnh không tồn tại");
        return imageData
    },
    getCommentByIdImage: async (req) => {
        const { id } = req.params
        const commentData = await prisma.binh_luan.findMany({ where: { hinh_id: +id } })
        if (!commentData || commentData.length === 0) throw new BadRequestException("ảnh không không có bình luận nào cả");
        return commentData
    }


}

export default imageService