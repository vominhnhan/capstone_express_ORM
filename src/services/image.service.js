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
    },
    chekSaveImage: async (req) => {
        const { id } = req.params;

        let imageExist = await prisma.hinh_anh.findFirst({ where: { hinh_id: +id } })
        if (!imageExist) throw new BadRequestException("ảnh không tồn tại");

        imageExist = await prisma.luu_anh.findFirst({
            where: {
                hinh_id: +id,
                nguoi_dung_id: req.user.nguoi_dung_id
            }
        })

        return {
            hinh_anh: id,
            isCheckSave: imageExist ? true : false,
            data: imageExist || null
        }
    },
    commentImage: async (req) => {
        const { id } = req.params;
        const {hinh_id, noi_dung } = req.body
        let imageExist = await prisma.hinh_anh.findFirst({ where: { hinh_id: +id } })
        if (!imageExist) throw new BadRequestException("ảnh không tồn tại");

        const commentNew = await prisma.binh_luan.create({
            data: {
                nguoi_dung_id:req.user.nguoi_dung_id,
                hinh_id,
                ngay_binh_luan:new Date(),
                noi_dung
            }
        })

        return commentNew
    }
}

export default imageService