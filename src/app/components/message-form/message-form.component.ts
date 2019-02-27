import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../app/models';
import { DialogflowService } from '../../../app/services';
import { MensabotService } from '../../services/mensabot.service';
import { Menu } from '../../models/menu';
import { Mensa } from '../../models/mensas';
import { Hours } from '../../models/hours';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit {

  public mensaFlag: boolean;
  public menuFlag: boolean;
  public normalFlag: boolean;
  public mensadata;
  public menudata: [Menu];
 // public hoursData;
  public coordinates;
  public mensa_name;
  
  //private message: Message;

  @Input('message')
  public message: Message;

  @Input('messages')
  public messages: Message[];

  constructor(private dialogFlowService: DialogflowService, private mensaBotService: MensabotService) { 
    
  }

  ngOnInit() {
  }

  public getMenuData(id, date) {
    this.mensaBotService.postMenuData(id, date).subscribe((res: [Menu]) => {
      this.menudata = res,
        console.log("data for menu", res)
    });
  }

  public getHoursData(id, date) {
    this.mensaBotService.postTimingsData(id, date).subscribe((res: Hours) => {
      //this.hoursData = res,
        console.log("timings", res)
    });
  }

  public getLocation(){
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
       //this.location = position,
       console.log("geolocation", position);
       console.log("coordinates only", position.coords);
       console.log("latitude", position.coords.latitude);
       console.log("longitude", position.coords.longitude);
       //this.coordinates =  [ position.coords.latitude, position.coords.longitude] 
       this.coordinates = 
          [ position.coords.latitude, position.coords.longitude ]
       
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  public sendMessage(): void {
    let stringData;
    let data;
    let data1;
    let nigga;
    let pushArray: [];
    let mensaName = [];
    let b: string;
    let b1: Menu[] = [];
    let menuString: string;
    //console.log(form.value.content);
    //this.message = form.value;
    this.message.timestamp = new Date();
    console.log("message", this.message);
    this.messages.push(this.message);

    
    console.log("location coordinates", this.coordinates);

    this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      console.log("inside send message");
      console.log("dialogflow response", res);
      let intentName = res.result.metadata.intentName;
      console.log("intentname " + intentName);
      if (res.result.metadata.intentName == "mensas") {
        this.mensaFlag = true;
        this.normalFlag = false;
        this.menuFlag = false;
        let timestamp = res.timestamp;
        let location = res.result.parameters.location;
        let mensa_name = res.result.parameters.mensa_name;
        if ( !location ) {
          this.mensaBotService.getMensaData().subscribe((res: [Mensa]) => {
            this.mensadata = res
            console.log("mensaData", this.mensadata);
            this.messages.push(
              new Message(this.mensadata, 'assets/images/bot.png', timestamp, this.menuFlag, this.mensaFlag, this.normalFlag)
            );
          });
        } else {
          //let location = this.setLocation();
          this.getLocation();
          this.mensaBotService.postMensaWithCoordinatesData(this.coordinates).subscribe((res: [Mensa]) => {
            this.mensadata = res
            console.log("mensaData", res);
            this.messages.push(
              new Message(this.mensadata, 'assets/images/bot.png', timestamp, this.menuFlag, this.mensaFlag, this.normalFlag)
            );
          });
        }
        
        
      }
      else if (res.result.metadata.intentName == "menu") {
        let timestamp = res.timestamp;
        let mensa_name = res.result.parameters.mensa_name[0];
        let menu_date = res.result.parameters.date[0];
        let menu = res.result.parameters.menu[0];
        let options = res.result.parameters.options;
        console.log(mensa_name);
        console.log(menu_date);
        let value = this.mensaNamePick(mensa_name);
          if (value == "not found" || menu_date == null || mensa_name == null || menu == null) {
            this.messages.push(
              new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp, false, false, true)
            );
          }
          else {
            this.menuFlag = true;
            this.mensaFlag = false;
            this.normalFlag = false;
            this.mensa_name = mensa_name;
            // improvisation with new post methods
            if(options != null){
              this.mensaBotService.postMenuData(value, menu_date, options).subscribe((res: [Menu]) => {
                this.menudata = res,  
                  console.log("data for menu", res)
                  console.log("mensa name", this.mensa_name)

                  if(res.length < 1 ){
                    console.log("inside if block options dish not found");
                    this.messages.push(
                      new Message("No "+ options +" dishes!", 'assets/images/bot.png', timestamp, false, false, true, false, mensa_name));
                  }
                  else{ 
                    console.log("before pushing the menu data for ", this.mensa_name);
                    this.messages.push(
                      new Message(this.menudata, 'assets/images/bot.png', timestamp, this.menuFlag, this.mensaFlag, this.normalFlag, false, this.mensa_name));
                  }
                 
                
              });
              console.log(this.menudata);
            }else{
             
              //this.getMenuData( value, menu_date );
              this.mensaBotService.postMenuData(value, menu_date).subscribe((res: [Menu]) => {
                this.menudata = res,
                  console.log("data for menu", res)
                this.messages.push(
                  new Message(this.menudata, 'assets/images/bot.png', timestamp, this.menuFlag, this.mensaFlag, this.normalFlag, false, mensa_name));
              });
              console.log("display menu data",this.menudata);
              console.log("menu name after post", mensa_name);
            }
           

          }
      }
      else if (res.result.metadata.intentName == "hours") {

        let mensa_name = res.result.parameters.mensa_name;
        let menu_date = res.result.parameters.date;
        let timestamp = res.timestamp;
        let value = this.mensaNamePick(mensa_name);
        let hoursData;
        console.log("this is sparta", mensa_name, value, menu_date);

        if ( menu_date == null || mensa_name == null || value == "not found"  ) {

          this.messages.push(
            new Message(res.result.fulfillment.speech, 'assets/images/bot.png', timestamp, false, false, true)
          );

        } else {
          
          this.mensaBotService.postTimingsData(value, menu_date).subscribe((res: Hours) => {
            hoursData = res,
              console.log("timings", hoursData)
  
           
  
              if ( hoursData == false ) {
                
                this.messages.push(
                  new Message("Sorry," + mensa_name + " is closed!", 'assets/images/bot.png', timestamp, false, false, true) )
  
              } else {
                this.messages.push(
                  new Message(hoursData, 'assets/images/bot.png', timestamp, false, false, false, true)
                );
              }
  
           
          });

        }

       
      }
      else {
        this.messages.push(
          new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp, false, false, true)
        );
      }
    });
    
    this.message = new Message('', 'assets/images/user.png', '', false, false, true);

  }


  public mensaNamePick(mensa_name) {
    switch (mensa_name) {

      case "Mensa TU Hardenbergstrasse":
        console.log("returning 36");
        return "36";

      case "Mensa TU Skyline":
        return "818";

      case "Mensa TU Architektur":
        return "816";

      case "Mensa TU Marchstrasse":
        return "817";

      case "Mensa UdK Jazz-Mensa":
        return "819"

      default:
        return "not found";
    }

  }

}
