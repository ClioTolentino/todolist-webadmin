import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class AccountService {
    constructor(private http: HttpClient) { }

    public async currentUser(): Promise<User> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<User>((resolve, reject) => {
            this.http.get<User>('http://localhost:1337/account', options).toPromise().then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async signIn(email: string, password: string): Promise<User> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<User>((resolve, reject) => {
            const body = { email: email, password: password };
            this.http.put<User>('http://localhost:1337/account', body, options).toPromise().then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async signUp(email: string, password: string): Promise<User> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<User>((resolve, reject) => {
            const body = { email: email, password: password };
            this.http.post<User>('http://localhost:1337/account', body, options).toPromise().then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public async signOut() {
        const options = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        return new Promise<User>((resolve, reject) => {
            this.http.delete('http://localhost:1337/account', options).toPromise().then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
}
