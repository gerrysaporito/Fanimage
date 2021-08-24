// File: services/email/handlers/sendContactUs
// Description: Contains the handler to send lumaki labs an email inquiry.

import { Request, Response } from "express";

import awsSESApi from "../../../api/awsSES/awsSESApi";
import logger from "../../../../config/logger";
import { HTTP400Error } from "../../../../utils/httpErrors";
import { GeneralContactEmail } from "../../common";


/*
 * Sends an email to Lumaki Labs from the user through the platform.
 *
 * @return null
 */
export const sendContactUs = async (req: Request, res: Response) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            throw new HTTP400Error("No email or name or message in sendContactUs()");
        }

        const subject = `FANIMAGE Contact Form Request from ${email}.`;
        await awsSESApi(GeneralContactEmail, [GeneralContactEmail], subject, message);

        const msg = `Successfully sent out email to FANIMAGE. We will get back to you in 2-3 business days`;

        logger.info({
            message: msg
        });

        res
            .status(200)
            .send({
                message: msg
            });

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
}

export default sendContactUs;
