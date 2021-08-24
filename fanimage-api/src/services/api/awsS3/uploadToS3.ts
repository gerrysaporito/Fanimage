// File: services/api/uploadToS3
// Description: Api to interact with AWS S3.

import AWS from "aws-sdk";
import dotenv from "dotenv";
import FileType from 'file-type';
import core from "file-type/core";
import fs from 'fs';

import logger from "../../../config/logger";
import { HTTP400Error } from "../../../utils/httpErrors";

dotenv.config();

interface IUploadToS3 {
    fileType: core.FileExtension;
    key: string;
}
/*
 * Inserts an module into the database.
 *
 * @return null
 */
export const uploadToS3 = async (path: string, bucketName: string, folderName: string, fileName: string): Promise<IUploadToS3> => {
    try {
        // Parse path
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);

        if (!type) {
            throw new HTTP400Error(`Invalid type: ${type} from buffer: ${buffer}`);
        }

        const fileExt = `${folderName}/${fileName}-${Date.now().toString()}`;
        const key = `${fileExt}.${type.ext}`;

        // Set the region 
        AWS.config.update({ region: 'ca-central-1' });

        // Create S3 service object
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

        // Configure the file stream and obtain the upload parameters
        const uploadParams = {
            Body: buffer,
            Bucket: bucketName,
            ContentType: type.mime,
            Key: key,
        };

        // call S3 to retrieve upload file to specified bucket
        await s3.upload(uploadParams, function (err: any, data: any) {
            if (err) {
                logger.error({
                    message: "Error in S3 upload",
                    extra: err
                })
            } if (data) {
                logger.info({
                    message: "Uploaded successful",
                })
            }
        });

        return {
            fileType: type.ext,
            key
        }

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};
