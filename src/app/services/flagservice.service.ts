import { Injectable } from '@angular/core';

@Injectable()
export class FlagService {
  public normalFlag : boolean = true;
  public menuFlag: boolean = false;
  public mensaFlag: boolean = false;
  public flag;

  constructor() { }

  public setFlags( menuFlag, mensaFlag, normalFlag ){
    this.normalFlag = normalFlag;
    this.menuFlag = menuFlag;
    this.mensaFlag = mensaFlag;
    this.flag = {
      normalFlag, menuFlag, mensaFlag
    }
   }

   public getFlags(){
    return  this.flag ;
   }
}
