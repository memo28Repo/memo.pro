import {IDiaryUploader} from "./iDiaryUploader";
import {DiaryEntry} from "./diaryEntry";
import {Client, ClientOptions} from "minio";
import {Errors, ErrorsNewResult} from '@memo28/utils'
import type {Region} from "minio/src/internal/s3-endpoints";
import {MakeBucketOpt} from "minio/src/internal/client";
import {UploadedObjectInfo} from "minio/src/internal/type";

export class DirectUploader implements IDiaryUploader {
    constructor() {
    }

    private client: Client | null = null;

    init(options: ClientOptions): Client {
        const client = new Client(options);
        this.client = client;
        return client;
    }

    automaticBucketBuilding(bucket?: string, region?: Region, makeOpts?: MakeBucketOpt): Promise<[ErrorsNewResult | null, boolean]> {
        return new Promise(async (resolve, reject) => {
            if (!this.client) {
                return reject([Errors.New("请先初始化客户端"), false])
            }
            if (!bucket?.trim()?.length) return reject([Errors.New("请传入bucket名称"), false])
            try {
                const booleanPromise = await this.client.bucketExists(bucket);
                if (booleanPromise) return [null, true]
                this.client.makeBucket(bucket, region || "", makeOpts).then(() => {
                    resolve([null, true])
                }).catch((err) => {
                    resolve([Errors.New(err?.message || ""), false])
                });
            } catch (err) {
                resolve([Errors.New(err?.message || ""), false])
            }

        })
    }


    async upload(entry: DiaryEntry): Promise<[ErrorsNewResult | null, Partial<UploadedObjectInfo>]> {
        if (!entry.bucketOptions?.bucketName?.trim()?.length) return [Errors.New("请传入bucket名称"), {}]
        if (!this.client) return [Errors.New("请先初始化客户端"), {}]
        // 自动画建桶
        const [automaticBucketBuildingError, _] = await this.automaticBucketBuilding(entry.bucketOptions?.bucketName, entry.bucketOptions?.region, entry.bucketOptions?.makeOpts)
        if (automaticBucketBuildingError) {
            return [automaticBucketBuildingError, {}]
        }
        if (entry.file && entry.filePath) {
            const fPutObject = await this.client.fPutObject(entry.bucketOptions?.bucketName, entry.title, entry.filePath, entry.metaData)
            return [null, fPutObject]
        }
        const putObject = await this.client.putObject(entry.bucketOptions.bucketName, entry.title, entry.content, entry.content?.length, entry?.metaData)
        return [null, putObject]
    }

    async list(): Promise<any[]> {
        return []
    }

    async get(id: string): Promise<any> {
        return true
    }
}
