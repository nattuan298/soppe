import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { uuid } from 'uuidv4';
@Injectable()
export class UploadService {
  private readonly EXPIRES = 60 * 10;
  private readonly BUCKET: string = process.env.S3_BUCKET_NAME;

  async uploadPublicFile(
    folder: string,
    dataBuffer: Buffer,
    filename: string,
    mimetype: string,
  ) {
    const s3 = new S3();
    const { Key, Location } = await s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${folder}/${uuid()}-${filename}`,
        ContentType: mimetype,
      })
      .promise();
    return { Key, Location };
  }

  getSignedUrl(key: string) {
    if (!key) return '';
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    return s3.getSignedUrl('getObject', {
      Bucket: this.BUCKET,
      Key: key,
      Expires: this.EXPIRES,
    });
  }

  async deletePublicFile(key: string) {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
}
