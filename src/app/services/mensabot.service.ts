import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensabotService {

  constructor(private http: HttpClient) { }

  private baseURL: string = "http://mensabot.qu.tu-berlin.de:3001/mensas";

  private menuURL: string = "http://mensabot.qu.tu-berlin.de:3001/menus/";

  private postmenuURL: string = "http://mensabot.qu.tu-berlin.de:3002/menu/";

  private postTimingsURL: string = "http://mensabot.qu.tu-berlin.de:3002/hours/";

  private postMensaURl: string = "http://mensabot.qu.tu-berlin.de:3002/mensas-list/";

  public getMensaData(){
    let data: any;
    console.log("called mensadata");
    return this.http.get(this.baseURL);
  } 

  public getMenuData(id: any){
    let data: any;
    console.log("called menudata");
    return this.http.get(this.menuURL + id);
  }

  public postMenuData(mensaId: any, date: any, diet?: any){
    let data: any = {
      mensaId,
      date,
      diet
    };
    data.mensaId = mensaId;
    data.date = date;
    data.diet = diet;
    console.log("post menudata called");
    return this.http.post(this.postmenuURL, data);
  }

  public postTimingsData(mensaId: any, date: any){
    let data: any = {
      mensaId,
      date
    };
    data.mensaId = mensaId;
    data.date = date;
    console.log("post timedata called");
    console.log(data);
    return this.http.post(this.postTimingsURL, data);
  }

  public postMensaWithCoordinatesData(coordinates?: any){
    let data: any = {
      coordinates
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    coordinates = coordinates;
    console.log("post menudata called" ,data);
    console.log(coordinates);
    return this.http.post(this.postMensaURl, data, {headers});
  }

}
