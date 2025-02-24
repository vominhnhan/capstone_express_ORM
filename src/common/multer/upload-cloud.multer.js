import multer from "multer";

const uploadCloud = multer({ storage: multer.memoryStorage() });

export default uploadCloud;
