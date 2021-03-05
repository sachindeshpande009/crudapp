import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "./users";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResgisterationService {

  constructor(private http: HttpClient) { }

  onRegister(user: Users): Observable<Users[]> {

    return this.http.post<Users[]>("http://localhost:3000/register", user, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    })
  }

  getallUsers(): Observable<Users[]> {
    return this.http.get<Users[]>("http://localhost:3000/getUsers", {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    });
  }

  getUser(_id: string): Observable<Users[]> {
    let obj = {
      "_id": _id
    }
    return this.http.post<Users[]>("http://localhost:3000/getSingleUser", obj, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    });
  }

  updatUser(user: Users): Observable<Users[]> {
    return this.http.put<Users[]>("http://localhost:3000/updateUser", user, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    });
  }

  deleteId(_id: string): Observable<Users[]> {
    var id = {
      "_id": _id
    }
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: id,
    };
    return this.http.delete<Users[]>('http://localhost:3000/delUser', options);
  }
}
