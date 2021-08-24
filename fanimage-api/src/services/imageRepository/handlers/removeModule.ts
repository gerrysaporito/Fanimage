// File: services/imageRepository/handlers/removeModule
// Description: Removes a module for a user.

import { Request, Response } from "express";
import { getConnection } from "typeorm";

import { S3_MODULE_BUCKET } from "../common";
import { deleteFromS3 } from "../../api/awsS3/deleteFromS3";
import logger from "../../../config/logger";
import Module from "../../../db/entity/Module";
import { HTTP400Error } from "../../../utils/httpErrors";


/*
 * Deletes a module.
 *
 * @return null
 */
const removeModule = async (req: Request, res: Response) => {
    try {
        let { moduleId } = req.body;

        if (!moduleId) {
            throw new HTTP400Error("No moduleId recieved in removeModule()");
        }

        const module = await getModuleEntity(moduleId);
        await deleteFromS3(module.s3key, S3_MODULE_BUCKET);
        await deleteModuleEntity(module);

        logger.info({
            message: `Deleted module with module id: ${moduleId}`,
        })

        res
            .status(200)
            .send({
                message: "Module has been successfully deleted",
            });

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};

export default removeModule;


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

/*
 * Deletes a module's information from the database.
 *
 * @param module: Module
 * @return:       Promise<Module>
 */
export const deleteModuleEntity = async (module: Module): Promise<void> => {
    const connection = getConnection();
    const moduleRepository = connection.getRepository(Module);

    await moduleRepository.delete({ id: module.id });
}
