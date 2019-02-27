import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    menuFlag: boolean;
    mensaFlag: boolean;
   public normalFlag: boolean;
    locationFlag: boolean;
    constructor(  ){
    }
    setFlags( menuFlag, mensaFlag, normalFlag ){
        this.mensaFlag = mensaFlag;
        this.menuFlag = menuFlag;
        this.normalFlag = normalFlag;
    }
}