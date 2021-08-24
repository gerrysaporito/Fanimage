// File: services/imageRepository/handlers/getModules
// Description: Finds all modules with a specific search query.

import { Request, Response } from "express";
import { getConnection } from "typeorm";

import logger from "../../../config/logger";
import Module from "../../../db/entity/Module";
import { HTTP400Error } from "../../../utils/httpErrors";
import { getFromS3 } from "../../api/awsS3/getFromS3";
import { S3_MODULE_BUCKET } from "../common";


/*
 * Fetches all modules provided a search key.
 *
 * @return null
 */
const getModules = async (req: Request, res: Response) => {
    try {
        let { searchTerm } = req.body;
        let modulesList = [];

        const modules = await getModuleEntities(searchTerm);

        for (let module of modules) {
            const tempModule = {
                ...module,
                url: await getFromS3(module.s3key, S3_MODULE_BUCKET),
            }
            modulesList.push(tempModule);
        }

        logger.info({
            message: `Found all modules.`,
        });

        res
            .status(200)
            .send({ data: modulesList });

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};

export default getModules;


/*
 * Gets multiple module's information from the database.
 *
 * @param searchTerm: string
 * @return:           Promise<Module[]>
 */
export const getModuleEntities = async (searchTerm: string): Promise<Module[]> => {
    const connection = getConnection();
    const moduleRepository = connection.getRepository(Module);

    let modules = await moduleRepository
        .createQueryBuilder("module")
        // .where("module.tags like :tags", { tags: `%${searchTerm}%` })
        // .orWhere("module.tags = :title", { title: searchTerm })
        .getMany();

    return modules;
}
