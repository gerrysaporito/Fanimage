// File: services/imageRepository/handlers/createModule
// Description: Creates a new module .

import { Request, Response } from "express";
import { getConnection } from "typeorm";
import multiparty from 'multiparty';

import { S3_MODULE_BUCKET, S3_MODULE_FORDER_NAME } from "../common";
import { uploadToS3 } from "../../api/awsS3/uploadToS3";
import logger from "../../../config/logger";
import Module from "../../../db/entity/Module";
import User from "../../../db/entity/User";
import { HTTP400Error } from "../../../utils/httpErrors";


/*
 * Creates a new module for a user.
 *
 * @return null
 */
const createModule = async (req: Request, res: Response) => {
    try {
        const form = new multiparty.Form();

        form.parse(req, async (error, fields, files) => {
            if (error) {
                throw new HTTP400Error(error);
            };
            try {
                const { email, title, tags } = fields;
                const { file } = files;

                const user = await getUserEntity(email[0]);

                await createModuleEntity(file[0].path, title[0], tags[0], user);

                logger.info({
                    message: `Created a new module called: ${title[0]}`,
                });

                res
                    .status(200)
                    .send({
                        message: "Module has been successfully created",
                    });
            } catch (e) {
                if (e.response) {
                    throw new HTTP400Error(e.response.data)
                } else {
                    throw new HTTP400Error(e.message)
                }
            }
        });

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};

export default createModule;


/*
 * Get user from database from email.
 *
 * @param identifier: string
 * @return:           Promise<User>
 */
export const getUserEntity = async (identifier: string): Promise<User> => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);

    // Get user
    let user = await userRepository.findOne({
        where: [
            { email: identifier },
        ]
    });

    if (!user) {
        throw new HTTP400Error("Couldn't find user at Login");
    }

    return user
}

/*
 * Creates a module.
 * Saves the module information in the database.
 * Uploads the image to AWS S3.
 *
 * @param path:  string 
 * @param title: string 
 * @param tags:  string[]
 * @param user:  User
 * @return:      Promise<void>
 */
export const createModuleEntity = async (path: string, title: string, tags: string[], user: User): Promise<void> => {
    const connection = getConnection();
    const moduleRepository = connection.getRepository(Module);

    // Create module
    let module = new Module();

    const { fileType, key } = await uploadToS3(path, S3_MODULE_BUCKET, S3_MODULE_FORDER_NAME, title[0]);
    module.title = title;

    if (!fileType || !key) {
        throw new HTTP400Error("No fileType extension or S3 key recieved in createModuleEntity()");
    }
    module.fileType = fileType || "";
    module.s3key = key || "";
    module.tags = tags;
    module.createdByUser = user;

    await moduleRepository.save(module);

    return;
}
