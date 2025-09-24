/*
 * @Author: @memo28.repo
 * @Date: 2025-09-14 16:04:22
 * @LastEditTime: 2025-09-24 20:59:39
 * @Description: 
 * @FilePath: /memo28.pro.Repo/packages/minio/__test__/diaryManager.test.ts
 */
// // tests/diaryManager.test.ts
import { faker, fakerZH_CN } from '@faker-js/faker';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiUploader, DiaryEntry, DiaryManager, DirectUploader } from "../src/";

describe.skip("管理器", () => {
    describe("直传管理器", () => {
        it("自动建桶", async () => {
            const diaryManager = new DiaryManager(new DirectUploader());
            diaryManager.init({
                endPoint: '127.0.0.1',
                port: 9000,
                useSSL: false,
                accessKey: 'admin',
                secretKey: 'admin123',
            });
            const result = await diaryManager.automaticBucketBuilding("imageList")
            expect(result).not.toBeUndefined()
            expect(result?.[0]?.unWrap?.()).toBe("Invalid bucket name: imageList")

            const sucResult = await diaryManager.automaticBucketBuilding(faker.string.numeric({length: 5}))
            expect(sucResult).not.toBeUndefined()
            expect(sucResult?.[0]).toBeNull()
        })

        it("上传文件", async () => {
            const diaryManager = new DiaryManager(new DirectUploader());
            diaryManager.init({
                endPoint: '127.0.0.1',
                port: 9000,
                useSSL: false,
                accessKey: 'admin',
                secretKey: 'admin123',
            });
            const bucket = faker.string.numeric({length: 5});
            const sucResult = await diaryManager.automaticBucketBuilding(bucket)
            expect(sucResult).not.toBeUndefined()
            expect(sucResult?.[0]).toBeNull()

            const file = new File([], "");
            const diaryEntry = new DiaryEntry(fakerZH_CN.string.numeric({length: 5}), fakerZH_CN.string.numeric({length: 5}), {bucketName: bucket}, file, file.name, {
                test: 'fileTest'
            });

            const res = await diaryManager.upload(diaryEntry)

            console.log(res)
        })
    })
})

