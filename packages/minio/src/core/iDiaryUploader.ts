// src/core/IDiaryUploader.ts
import {DiaryEntry} from "./diaryEntry";
import {Client, type ClientOptions} from "minio";
import {ErrorsNewResult} from "@memo28/utils";
import type {Region} from "minio/src/internal/s3-endpoints";
import {MakeBucketOpt} from "minio/src/internal/client";
import {UploadedObjectInfo} from "minio/src/internal/type";

export interface IDiaryUploader {


    /**
     * 初始化客户端
     */
    init?(options: ClientOptions): Client | null;

    /**
     * 自动建桶
     */
    automaticBucketBuilding?(bucket?: string, region?: Region, makeOpts?: MakeBucketOpt): Promise<[ErrorsNewResult | null, boolean] | undefined>

    /**
     * 上传
     * @param entry
     */
    upload(entry: DiaryEntry): Promise<[ErrorsNewResult | null, Partial<UploadedObjectInfo>]>;

    /**
     * 获取列表
     */
    list(): Promise<any[]>;

    /**
     * 获取详情
     * @param id
     */
    get(id: string): Promise<any>;
}
