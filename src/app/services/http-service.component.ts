import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  error = null;
  constructor(private http: HttpClient) {}
  getData(page: number) {
    return this.http.get(`https://reqres.in/api/users?page=${page}`);
  }
  getUserById(id: any) {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
