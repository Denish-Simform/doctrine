import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
    private s3Client: S3Client;
    private bucketName: string;

    constructor(private configService: ConfigService) {
        const endpoint = this.configService.get<string>('AWS_ENDPOINT');
        this.s3Client = new S3Client({
            region: this.configService.get<string>('AWS_REGION') || 'us-east-1',
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'test',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'test',
            },
            ...(endpoint && { 
                endpoint,
                forcePathStyle: true, // Required for LocalStack and some S3-compatible services
            }),
        });

        this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') || 'test';
    }

    async uploadFile(file: Express.Multer.File, key: string, isPublic = true): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: isPublic ? 'public-read' : 'private',
        });

        await this.s3Client.send(command);
        return `https://${this.configService.get<string>('AWS_ENDPOINT')}/test/${key}`;
    }
}
