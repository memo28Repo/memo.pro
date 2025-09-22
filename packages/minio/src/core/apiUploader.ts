// import { IDiaryUploader } from "./iDiaryUploader";
// import { DiaryEntry } from "./diaryEntry";
//
// export class ApiUploader implements IDiaryUploader {
//     constructor(private apiBase: string) {}
//
//     async upload(entry: DiaryEntry): Promise<any> {
//         const formData = new FormData();
//         formData.append("title", entry.title);
//         formData.append("content", entry.content);
//         if (entry.file) formData.append("file", entry.file);
//
//         const res = await fetch(`${this.apiBase}/upload`, {
//             method: "POST",
//             body: formData,
//         });
//         return res.json();
//     }
//
//     async list(): Promise<any[]> {
//         return fetch(`${this.apiBase}/list`).then((res) => res.json());
//     }
//
//     async get(id: string): Promise<any> {
//         return fetch(`${this.apiBase}/download/${id}`).then((res) => res.json());
//     }
// }
