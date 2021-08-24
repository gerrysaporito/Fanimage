// File: services/api/uploadToS3
// Description: Api to interact with AWS S3.

import AWS from "aws-sdk";
import dotenv from "dotenv";

import logger from "../../../config/logger";
import { HTTP400Error } from "../../../utils/httpErrors";

dotenv.config();

/*
 * Pull a module from the database.
 *
 * @return null
 */
export const getFromS3 = async (s3Key: string, bucketName: string) => {
    try {

        // Set the region 
        AWS.config.update({ region: 'ca-central-1' });

        // Create S3 service object
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

        const expiresTime: number = 10; // 10 minutes

        // Configure the file stream and obtain the upload parameters
        const getParams = {
            Bucket: bucketName,
            Key: s3Key,
            Expires: 60 * expiresTime
        };

        // call S3 to retrieve upload file to specified bucket
        let url = await new Promise((resolve, reject) => {
            s3.getSignedUrl('getObject', getParams, function (err: any, data: any) {
                if (err) {
                    logger.error({
                        message: "Error in S3 retrieval",
                        extra: err
                    })
                    reject(err)
                } if (data) {
                    logger.info({
                        message: "Retrieval successful",
                    })
                    resolve(data)
                }
            });
        });

        return url;

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};
