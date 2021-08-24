// File: middleware/authenticate
// Description: Authenticates the JWT in header.

import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import Module from "../db/entity/Module";

import { HTTP400Error, HTTP401Error } from "../utils/httpErrors";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;


/*
* Function: Checks to see if a user is logged in by validating the JWT header.
* (Authentication)
*
* If successful, will allow the request to proceed.
* If failed, will return an error to the client prompting them to login.
*/
export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] as string;
    if (!authHeader) {
        throw new HTTP401Error();
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, function (e, decoded) {
        if (decoded) {
            return next();
        } else {
            throw new HTTP401Error();
        }
    });
};

/*
* Function: Checks to see if the user is the same as the request.
* In other words, ensures the request is from the real user and not an imposter.
* (Authorization)
*
* If successful, will allow the request to proceed.
* If failed, will return a vague error to the client.
*/
export const ensureCorrectUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] as string;
    const { userId, moduleId } = req.query;

    if (!authHeader || !userId || !moduleId) {
        throw new HTTP401Error();
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, async function (e, decoded: any) {
        switch (true) {
            case !decoded: {
                throw new HTTP401Error();
            }
            case decoded.userInfo.id.toString() !== userId.toString(): {
                throw new HTTP401Error();
            }
            case !(await validateModuleCreator(moduleId.toString(), userId.toString())): {

                throw new HTTP401Error();
            }
        }

        return next();
    })
};

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
 * Validates the modules creator is the current user.
 *
 * @param moduleId: string
 * @return:         Promise<Module>
 */
const validateModuleCreator = async (moduleId: string, userId: string): Promise<boolean> => {
    const module = await getModuleEntity(moduleId);

    return module.createdByUserId.toString() === userId.toString();
}