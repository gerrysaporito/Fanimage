// File: services/imageRepository/handlers/getModule
// Description: Gets a single module.

import { Request, Response } from "express";
import { getConnection } from "typeorm";

import { S3_MODULE_BUCKET } from "../common";
import { getFromS3 } from "../../api/awsS3/getFromS3";
import logger from "../../../config/logger";
import Module from "../../../db/entity/Module";
import { HTTP400Error } from "../../../utils/httpErrors";


/*
 * Gets a module by moduleId.
 *
 * @return null
 */
const getModule = async (req: Request, res: Response) => {
    try {
        let { moduleId } = req.body;

        if (!moduleId) {
            throw new HTTP400Error("No moduleId recieved in getModule()");
        }

        const module = await getModuleEntity(moduleId);

        let url = await getFromS3(module.s3key, S3_MODULE_BUCKET);

        logger.info({
            message: `Found module with moduleId: ${module.id}`,
        })

        res
            .attachment(module.s3key)
            .status(200)
            .send({
                data: {
                    moduleInfo: module,
                    file: url
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

export default getModule;


/*
 * Gets a module's information from the database.
 *
 * @param moduleId: string
 * @return:         Promise<Module>
 */
export const getModuleEntity = async (moduleId: string): Promise<Module> => {
    const connection = getConnection();
    const moduleRepository = connection.getRepository(Module);

    let module = await moduleRepository.findOne({
        where: {
            id: moduleId
        }
    });

    if (!module) {
        throw new HTTP400Error(`No module found with id: ${moduleId}`);
    }

    return module
}
