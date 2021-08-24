// File: services/authentication/handlers/registerUser
// Description: Contains the registration handler.

import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";

import { jwtExpires } from "../common";
import logger from "../../../config/logger";
import User from "../../../db/entity/User";
import { HTTP400Error } from "../../../utils/httpErrors";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

/*
 * Registers a new user.
 *
 * @return null
 */
const registerUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
            throw new HTTP400Error("Some of the fields are missing");
        } else if (req.body.password !== req.body.confirmPassword) {
            throw new HTTP400Error("The passwords don't match.");
        }

        const connection = getConnection();
        let userRepository = connection.getRepository(User);

        // Create new user
        const user = new User();
        user.email = req.body.email || "";
        user.password = bcrypt.hashSync(req.body.password, 8);
        await userRepository.save(user);

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
            message: `Registered new user: ${user.email} }`,
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

export default registerUser;
