import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseURL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }
  

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/register`, user);
  }

  login(email: string, password:string): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/login`, { email, password });
  }

  logOutUser(user_id:any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/logout`, { user_id });
  }

  profile_url(nameImage:any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/profile_images`, { nameImage });
  }

  getAllUserAdmin(headers:any): Observable<any> {
    return this.http.get(`${this.baseURL}/users`, { headers })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getLatestAskForm(): Observable<any> {
    const url = `${this.baseURL}/ask-form`;
    return this.http.get(url);
  }

  updateAskForm(headers:any, id: any, askForm: any): Observable<any> {
    const url = `${this.baseURL}/ask-form/${id}`;
    return this.http.put(url, askForm, {headers});
  }

  /*
  createAskForm(headers:any, askForm: any): Observable<any> {
    const url = `${this.baseURL}/ask-form`;
    return this.http.post(url, askForm);
  }
  deleteAskForm(headers:any, id: any): Observable<any> {
    const url = `${this.baseURL}/ask-form/${id}`;
    return this.http.delete(url);
  } */

}
