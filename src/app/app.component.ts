import { Component } from '@angular/core';
import { Message } from '../app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public message : Message;
  public messages : Message[];

  public welcomeMessage = "Welcome to Mensa Chat Bot!<br />"
  public welcomeMessage1 = " Ask me something like 'list mensas'";
  constructor(){
    this.message = new Message('', 'assets/images/user.png', '', false, false, true);
    this.messages = [
      new Message(this.welcomeMessage+this.welcomeMessage1, 'assets/images/bot.png', new Date(), false, false, true)
    ];
    
  }
}
