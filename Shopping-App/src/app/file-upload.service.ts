import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'https://localhost:7147/api/Upload/upload';

  constructor(private http: HttpClient) { }

  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post(this.apiUrl, formData, { headers });
  }

}
