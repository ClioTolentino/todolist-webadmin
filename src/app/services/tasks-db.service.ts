import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable()
export class TasksDbService {
    constructor(private http: HttpClient) { }

    public async tasks(): Promise<Task[]> {
        return new Promise<Task[]>((resolve, reject) => {
            this.http.get<any>('http://localhost:1337/tasks').subscribe(data => {
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
                            notes: item.notes || null,
                            starred: item.starred || false,
                            completed: item.completed || false,
                            subtasks: item.subtasks.map(subtask => {
                                return { id: subtask.id, name: subtask.name, completed: subtask.completed };
                            })
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
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return new Promise<Task>((resolve, reject) => {
            this.http.post<any>('http://localhost:1337/tasks', task, httpOptions).toPromise().then(data => {
                if (data.err) reject(data.err);
                else {
                    data.task.subtasks = [];
                    resolve(data.task);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async update(task: Task): Promise<Task> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return new Promise<Task>((resolve, reject) => {
            this.http.put<any>(`http://localhost:1337/tasks/${task.id}`, task, httpOptions).toPromise().then(data => {
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
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return new Promise<Task>((resolve, reject) => {
            this.http.delete(`http://localhost:1337/tasks/${task.id}`, httpOptions).toPromise()
                .then(task => resolve())
                .catch(err => reject(err));
        });
    }

    public taskDetails() {

    }

    public addSubtask(id: string) {

    }

    public removeSubtask(id: string) {

    }
}
