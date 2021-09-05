import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

const BUCKET_NAME = 'my-dominos';
const FILE_PERMISSION = 'public-read'

@Injectable()
export class AwsS3Service {
    uploader = new AWS.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: process.env.S3_REGION
    })
    constructor() {
        this.createBucket();
    }

    public createBucket(): void {
        this.uploader.getBucketLocation({ Bucket: process.env.S3_BUCKET },
            (err, data) => err ? this.create() : false)
    }

    private create(): void {
        this.uploader.createBucket({ Bucket: process.env.S3_BUCKET })
    }

    removeFile(link?: string): Promise<any> {
        const key = decodeURI(link).split('/');
        return this.uploader.deleteObject({ Bucket: process.env.S3_BUCKET, Key: key[key.length - 1] }).promise();
    }
    upload(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
        const params: S3.Types.PutObjectRequest = {
            Bucket: BUCKET_NAME,
            Key: file.originalname, // File name you want to save as in S3
            Body: file.buffer,
            ACL: FILE_PERMISSION,
        };
        return this.uploader.upload(params).promise()
    }

}
