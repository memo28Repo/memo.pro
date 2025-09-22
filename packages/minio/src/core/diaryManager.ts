// src/core/DiaryManager.ts
import {DiaryEntry} from "./diaryEntry";
import {IDiaryUploader} from "./iDiaryUploader";
import {Client, ClientOptions} from "minio";

export class DiaryManager implements IDiaryUploader {
    constructor(private uploader: IDiaryUploader) {
    }

    init(options: ClientOptions): Client | null {
        return this.uploader?.init?.(options) || null;
    };

    async automaticBucketBuilding(bucket?: string, region?: string, makeOpts?: any) {
        return this.uploader.automaticBucketBuilding?.(bucket, region, makeOpts);
    }

    upload(entry: DiaryEntry) {
        return this.uploader.upload(entry);
    }

    list() {
        return this.uploader.list();
    }

    get(id: string) {
        return this.uploader.get(id);
    }
}
