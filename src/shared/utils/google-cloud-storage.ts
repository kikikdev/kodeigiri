import {CredentialBody} from "google-auth-library/build/src/auth/credentials";

const _ = require("lodash");

const bucketName = 'product-pikopen';
const bucketKeyFilename = 'credentials/epn-platform-dev-3b02ba6f3b65.json';

const GCS = {
    uploadBuffer: async function (fileBuffer: any, mimetype: string, destFileName: string): Promise<IGoogleCloudStorage> {

        const {Storage} = require('@google-cloud/storage');
        const storage = new Storage({
            // keyFilename: bucketKeyFilename,
            projectId: process.env.GCS_PROJECT_ID,
            credentials: {
                client_email: process.env.GCS_CLIENT_EMAIL,
                private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/gm, "\n"),
            } as CredentialBody,
        });

        const myBucket = storage.bucket(bucketName).file(destFileName);
        return myBucket.save(fileBuffer, {
            contentType: mimetype
        }, (err) => {
            console.log('==> myBucket.save:', err)
            return {
                status: err == undefined,
                message: err?.message ?? "",
            } as IGoogleCloudStorage;
        });
    },
    downloadFile: function (destFileName) {
        const {Storage} = require('@google-cloud/storage');
        const storage = new Storage({
            // keyFilename: bucketKeyFilename,
            projectId: process.env.GCS_PROJECT_ID,
            credentials: {
                client_email: process.env.GCS_CLIENT_EMAIL,
                private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/gm, "\n"),
            } as CredentialBody,
        });

        return storage.bucket(bucketName).file(destFileName).download({}).then((data) => {
            const content = data[0];
            return content;
        });
    },
};

module.exports = GCS

interface IGoogleCloudStorage {
    status: boolean
    message: string
}