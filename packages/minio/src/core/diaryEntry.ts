import type {Region} from "minio/src/internal/s3-endpoints";
import {MakeBucketOpt} from "minio/src/internal/client";
import type {ObjectMetaData} from "minio/src/internal/type";

export class DiaryEntry {
    constructor(
        public title: string,
        public content: string,
        public bucketOptions: {
            bucketName: string
            region?: Region,
            makeOpts?: MakeBucketOpt
        },
        public file?: File | Blob,
        public filePath?: string,
        public metaData?: ObjectMetaData
    ) {
    }
}
