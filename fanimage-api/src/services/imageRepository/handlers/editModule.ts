// File: services/imageRepository/handlers/editModule
// Description: Edits a module for a user.

import { Request, Response } from "express";
import { getConnection } from "typeorm";

import logger from "../../../config/logger";
import Module from "../../../db/entity/Module";
import { HTTP400Error } from "../../../utils/httpErrors";


/*
 * Edits a module for a user given a moduleId.
 *
 * @return null
 */
const editModule = async (req: Request, res: Response) => {
    try {
        let { moduleId, moduleInfo } = req.body;

        if (!moduleId || !moduleInfo) {
            throw new HTTP400Error("No moduleId or moduleInfo recieved in getModules()");
        }

        const module = await getModuleEntity(moduleId);
        updateModuleEntity(module, moduleInfo.title, moduleInfo.tags);

        logger.info({
            message: `Updated a module for user: ${module.createdByUserId}`,
        });

        res
            .status(200)
            .send({
                message: "Module has been successfully updated",
            });

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};

export default editModule;


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
 * Updates a module's information.
 *
 * @param module: Module
 * @return:       Promise<Module>
 */
export const updateModuleEntity = async (module: Module, title: string, tags: string[]): Promise<void> => {
    const connection = getConnection();
    const moduleRepository = connection.getRepository(Module);

    module.title = title;
    module.tags = tags;

    await moduleRepository.save(module);
}
