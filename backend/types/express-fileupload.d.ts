import * as express from "express";

declare module "express-fileupload" {
    interface FileArray {
        [fieldname: string]: UploadedFile | UploadedFile[];
    }

    interface UploadedFile {
        name: string;
        mv(path: string, callback: (err: any) => void): void;
        mv(path: string): Promise<void>;
        encoding: string;
        mimetype: string;
        data: Buffer;
        tempFilePath: string;
        truncated: boolean;
        size: number;
        md5: string;
    }

    interface Options {
        debug?: boolean;
        uploadTimeout?: number;
        safeFileNames?: boolean | RegExp;
        preserveExtension?: boolean | number;
        abortOnLimit?: boolean;
        responseOnLimit?: string;
        limitHandler?: (req: express.Request, res: express.Response) => void;
        useTempFiles?: boolean;
        tempFileDir?: string;
        createParentPath?: boolean;
        uriDecodeFileNames?: boolean;
        parseNested?: boolean;
        textArrayLimit?: number;
        textFieldSize?: number;
        limit?: number;
        fields?: number;
        fileSize?: number;
        files?: number;
    }

    function fileUpload(options?: Options): express.RequestHandler;

    namespace fileUpload { }
    export = fileUpload;
}

declare global {
    namespace Express {
        interface Request {
            files?: fileUpload.FileArray | undefined;
        }
    }
}
