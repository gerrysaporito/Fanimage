
// File: services/authentication/handlers/loginUser
// Description: Contains the authentication handler to login a user.

import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";

import { jwtExpires } from "../common";
import logger from "../../../config/logger";
import User from "../../../db/entity/User";
import { HTTP400Error, HTTP401Error } from "../../../utils/httpErrors";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;


/*
 * Authenticates a user by checking their email and password.
 *
 * @return null
 */
const loginUser = async (req: Request, res: Response) => {
    try {
        const { identifier } = req.body;

        if (!identifier || !req.body.password) {
            throw new HTTP400Error("Some of the fields are missing");
        }

        // Get user
        let user = await getUser(identifier);

        if (!bcrypt.compareSync(req.body.password, user.password || "")) {
            throw new HTTP401Error("Wrong password");
        }

        // Client storage and return values
        const userJwtTokenStorage = { ...user };
        delete userJwtTokenStorage.password;

        const jwtTokenStorage = {
            userInfo: userJwtTokenStorage,
        };

        // Signing JWT token
        const accessToken = jwt.sign(jwtTokenStorage, JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: jwtExpires,
        });

        const response = {
            token: accessToken,
            authenticated: true,
            ...jwtTokenStorage
        };

        logger.info({
            message: `Logged in ${user.email}`
        });

        res
            .status(200)
            .send(response);
    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
};

export default loginUser;


/*
 * Get user from database from email.
 *
 * @param identifier: string
 * @return: Promise<User>
 */
export const getUser = async (identifier: string): Promise<User> => {
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
