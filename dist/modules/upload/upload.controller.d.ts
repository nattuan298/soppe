/// <reference types="multer" />
import { UploadService } from './upload.service';
import { FolderUploadDto } from './dto/upload.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(folderUploadDto: FolderUploadDto, file: Express.Multer.File): Promise<{
        Key: string;
        Location: string;
    }>;
    getSignedUrl(key: string): string;
    deleteFile(key: string): Promise<void>;
}
