// File: services/api/awsSESApi
// Description: Api to send out emails using aws-sdk.

import * as aws from "aws-sdk";
import logger from "../../../config/logger";

import { HTTP400Error } from "../../../utils/httpErrors";


/*
 * Sends out an email.
 *
 * @return null
 */
const awsSESApi = async (senderEmail: string, sendeeEmail: Array<string>, subject: string, ses_message: string): Promise<boolean> => {
    try {
        // Set the region 
        aws.config.update({ region: 'ca-central-1' });

        // Create SES service object
        let ses = new aws.SES();

        // Configure the email parameters and obtain the upload parameters
        let params = {
            Destination: {
                ToAddresses: [...sendeeEmail]
            },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: ses_message
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: `FANIMAGE <${senderEmail}>`,
        };

        // TODO: Uncomment sendEmail
        ses.sendEmail(params, function (err, data) {
            if (err) {
                logger.error({ message: err.message });
                throw new HTTP400Error(err.message)
            }
            else {
                return true
            }
        });
        return true

    } catch (e) {
        if (e.response) {
            throw new HTTP400Error(e.response.data)
        } else {
            throw new HTTP400Error(e.message)
        }
    }
}

export default awsSESApi;
