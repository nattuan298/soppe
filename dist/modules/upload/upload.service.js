"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const uuidv4_1 = require("uuidv4");
let UploadService = class UploadService {
    constructor() {
        this.EXPIRES = 60 * 10;
        this.BUCKET = process.env.S3_BUCKET_NAME;
    }
    async uploadPublicFile(folder, dataBuffer, filename, mimetype) {
        const s3 = new aws_sdk_1.S3();
        const { Key, Location } = await s3
            .upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${folder}/${(0, uuidv4_1.uuid)()}-${filename}`,
            ContentType: mimetype,
        })
            .promise();
        return { Key, Location };
    }
    getSignedUrl(Key) {
        const s3 = new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        });
        return s3.getSignedUrl('getObject', {
            Bucket: this.BUCKET,
            Key,
            Expires: this.EXPIRES,
        });
    }
    async deletePublicFile(key) {
        const s3 = new aws_sdk_1.S3();
        await s3
            .deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        })
            .promise();
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map