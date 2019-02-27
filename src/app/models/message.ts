export class Message {
  content: any;
  //content: string;
  timestamp: any;
  avatar: string;
  menuFlag: boolean;
  mensaFlag: boolean;
  normalFlag: boolean = true;
  hoursFlag?: boolean;
  mensaName?: string;

  constructor(content: any, avatar: string, timestamp?: any, menuFlag?: boolean, mensaFlag?: boolean, normalFlag?: boolean, hoursFlag?: boolean, mensaName?: string){
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.menuFlag = menuFlag;
    this.mensaFlag = mensaFlag;
    this.normalFlag = normalFlag;
    this.hoursFlag = hoursFlag;
    this.mensaName = mensaName;
  }
}
