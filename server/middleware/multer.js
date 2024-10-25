import multer from "multer";

const storage = multer.memoryStorage(); // Usamos memoryStorage para evitar guardar en disco

const upload = multer({ storage: storage });

export default upload;