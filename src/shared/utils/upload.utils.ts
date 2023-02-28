export class UploadUtils {
    static customFileName(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }

    static destinationPath(req, file, cb) {
        cb(null, './files/')
    }
}