import prisma from "../common/prisma/init.prisma.js"

const homeService = {
    getImages: async (req) => {
        let { page, pageSize, type_id, search } = req.query

        page = +page > 0 ? +page : 1;
        pageSize = +pageSize > 0 ? +pageSize : 10;
        // type_id = +type_id > 0 ? +type_id : 0;
        search = search || ``;


        const skip = (page - 1) * pageSize;
        const totalItem = await prisma.hinh_anh.count()
        const totlaPage = Math.ceil(totalItem / pageSize)

        // const whereTypeId = type_id === 0 ? {} : { type_id: type_id };
        const whereSearch = search.trim() === '' ? {} : { ten_hinh: { contains: search } }

        const where = { ...whereSearch }
        const images = await prisma.hinh_anh.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {
                hinh_id: 'desc',
            },
            where: where,
        })

        return {
            page,
            pageSize,
            totlaPage: totlaPage,
            totalItem: await prisma.hinh_anh.count(),
            items: images || []
        }
    },
    getDetailImage: async (req) => {

    }
}

export default homeService