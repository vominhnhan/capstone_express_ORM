import prisma from "../common/prisma/init.prisma.js"

const homeService = {
    getImages: async (req) => {
        let { page, pageSize } = req.query

        page = +page > 0 ? +page : 1;
        pageSize = +pageSize > 0 ? +pageSize : 10;

        const skip = (page - 1) * pageSize;
        const totalItem = await prisma.hinh_anh.count()
        const totlaPage = Math.ceil(totalItem / pageSize)

        const images = await prisma.hinh_anh.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {
                created_at: "desc",
            }
        })

        return {
            page,
            pageSize,
            totlaPage,
            totalItem,
            items: images,
            message: images.length === 0 ? "Không tìm thấy ảnh" : undefined
        }
    },
    getImageByName: async (req) => {
        let { page, pageSize, search } = req.query

        page = +page > 0 ? +page : 1;
        pageSize = +pageSize > 0 ? +pageSize : 10;
        search = search?.trim() || '';


        const skip = (page - 1) * pageSize;
        const whereSearch = search ? { ten_hinh: { contains: search } } : {}

        const totalItem = await prisma.hinh_anh.count({ where: whereSearch })
        const totalPage = Math.ceil(totalItem / pageSize)

        const images = await prisma.hinh_anh.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {created_at: "desc"},
            where: whereSearch,
        })

        return {
            page,
            pageSize,
            totalPage,
            totalItem,
            items: images,
            message: images.length === 0 ? "Không tìm thấy ảnh" : undefined
        }
    }
}

export default homeService