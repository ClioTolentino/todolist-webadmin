import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task';
import { Attachment } from '../models/attachment';
import { environment } from '../../environments/environment';

@Injectable()
export class TasksDbService {
    constructor(private http: HttpClient) { }

    public async tasks(): Promise<Task[]> {
        return new Promise<Task[]>((resolve, reject) => {
            this.http.get<any>(`${environment.serverUrl}/tasks`, { withCredentials: true }).subscribe(data => {
                console.log(data);
                if (!data.err) {
                    const tasks: Task[] = [];
                    data.tasks.forEach(item => {
                        item.subtasks = item.subtasks || [];
                        const task = {
                            id: item.id,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt,
                            title: item.title,
                            dueDate: item.dueDate || null,
                            alertDate: item.alertDate || null,
                            notes: item.notes || null,
                            starred: item.starred || false,
                            completed: item.completed || false,
                            subtasks: item.subtasks.map(subtask => {
                                return { id: subtask.id, name: subtask.name, completed: subtask.completed };
                            }),
                            attachments: item.attachments || []
                        };
                        task.subtasks = task.subtasks || [];
                        tasks.push(task);
                        resolve(tasks);
                    });
                } else {
                    reject();
                }
            });
        });
    }

    public async create(task: Task): Promise<Task> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<Task>((resolve, reject) => {
            this.http.post<any>(`${environment.serverUrl}/tasks`, task, options).toPromise().then(data => {
                if (data.err) reject(data.err);
                else {
                    data.task.subtasks = [];
                    data.task.attachments = [];
                    resolve(data.task);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async update(task: Task): Promise<Task> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<Task>((resolve, reject) => {
            this.http.put<any>(`${environment.serverUrl}/tasks/${task.id}`, task, options).toPromise().then(data => {
                if (data.err) reject(data.err);
                else {
                    resolve(data.task);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async destroy(task: Task) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<Task>((resolve, reject) => {
            this.http.delete(`${environment.serverUrl}/tasks/${task.id}`, options).toPromise()
                .then(task => resolve())
                .catch(err => reject(err));
        });
    }

    public taskDetails() {

    }

    public async uploadFile(task: Task, file: File): Promise<Attachment> {
        let formData: FormData = new FormData();
        formData.append('attachment', file, file.name);
        const options = {
            headers: new HttpHeaders({
              'Accept': 'application/json'
            }),
            withCredentials: true
        };
        return new Promise<Attachment>((resolve, reject) => {
            this.http.post<any>(`${environment.serverUrl}/tasks/${task.id}/files`, formData, options).toPromise()
                .then(res => {
                    const attachment: Attachment = {
                        id: res.files[0].id,
                        createdAt: res.files[0].createdAt,
                        updatedAt: res.files[0].updatedAt,
                        filename: res.files[0].filename,
                        path: res.files[0].path,
                        size: res.files[0].size,
                        type: res.files[0].type
                    }
                    resolve(attachment);
                })
                .catch(err => reject(err));
        });
    }
}
