import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Globals } from '../models/globals';



@Injectable()
export class DialogflowService {
  public intentName: string;
  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  // private token: string = environment.token;
  public token: any = '563650d067c84e46b1c20c306f46bab2';
  
  constructor(private http: HttpClient) {


  }

  public getResponse(query: string): any {
    let body: any;
    let data = {
      query: query,
      lang: 'en',
      sessionId: '12345'
    }
    return this.http
      .post(this.baseURL, data, { headers: this.getHeaders(), observe: 'response' })
      .map(res => {
        let response = res;


        body = res.body;
        //console.log(body.result.metadata.intentName);
        this.intentName = body.result.metadata.intentName;
        return body;
      })
  }

  public getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ` + this.token);
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

 
}
