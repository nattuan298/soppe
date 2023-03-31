/// <reference types="node" />
export declare class UploadService {
    private readonly EXPIRES;
    private readonly BUCKET;
    uploadPublicFile(folder: string, dataBuffer: Buffer, filename: string, mimetype: string): Promise<{
        Key: string;
        Location: string;
    }>;
    getSignedUrl(Key: string): string;
    deletePublicFile(key: string): Promise<void>;
}
