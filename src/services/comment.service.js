import { BadRequestException, NotFoundException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js"

const commentService = {
    // Lấy danh sách bình luận theo ID ảnh
    getCommentByIdImage: async (req) => {
        const { id } = req.params;
        const idNum = Number(id);

        if (isNaN(idNum)) throw new BadRequestException("ID không hợp lệ hoặc bị thiếu!");

        // Kiểm tra xem ảnh có tồn tại không
        const imageExists = await prisma.hinh_anh.findUnique({
            where: { hinh_id: idNum },
        });

        if (!imageExists) throw new NotFoundException("Ảnh không tồn tại!");

        // Lấy danh sách bình luận
        const commentData = await prisma.binh_luan.findMany({
            where: { hinh_id: idNum },
            orderBy: {
                created_at: "desc",
            }
        });

        return {
            totalComments: commentData.length,
            comments: commentData,
            message: commentData.length === 0 ? "Không tìm thấy bình luận" : undefined
        };
    },
    // Bình luận ảnh
    commentImage: async (req) => {
        const { id } = req.params;
        const idNum = Number(id);
        const { noi_dung } = req.body;
        const userId = req.user?.nguoi_dung_id;

        if (isNaN(idNum)) throw new BadRequestException("ID không hợp lệ hoặc bị thiếu!")

        if (!noi_dung || noi_dung.trim() === "") throw new BadRequestException("Nội dung bình luận không được để trống!")

        if (!userId || !Number.isInteger(userId)) throw new BadRequestException("Người dùng không hợp lệ!")

        let imageExist = await prisma.hinh_anh.findFirst({
            where: { hinh_id: idNum },
        });

        if (!imageExist) throw new NotFoundException("ảnh không tìm thấy");

        const commentNew = await prisma.binh_luan.create({
            data: {
                nguoi_dung_id: req.user.nguoi_dung_id,
                hinh_id: idNum,
                ngay_binh_luan: new Date(),
                noi_dung,
                created_at: new Date(),
            },
        });
        
        return commentNew;
    }
}

export default commentService