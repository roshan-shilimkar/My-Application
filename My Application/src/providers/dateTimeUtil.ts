import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable()
export class dateTimeUtil{
    constructor(){
    }

    formatDate(inputDate:string,inputDateFormat:string,outPutFormat:string):string
    {
        if(inputDate=="" && inputDateFormat =="") 
            return "";
        else {
            if(inputDate=="NOW")
                return moment().format(outPutFormat);
            else {
                if(inputDateFormat == ""){
                    return moment(inputDate).format(outPutFormat);
                }
                else {
                    return moment(inputDate,inputDateFormat).format(outPutFormat);
                }
            }
        }
    }
    getdiff(value1, value2, formt):string {
        // return moment().subtract(value1, value2).format(formt);
        let lDate = moment().subtract(value1, value2).format(formt);
        let DT:Date = new Date(lDate);
        lDate = JSON.stringify(DT);
        return lDate;
    }
    //Added by ARV on 28-01-20 for datediff
    getdiff1(value1, value2, formt,dt):string {
        // return moment().subtract(value1, value2).format(formt);
        let lDate = moment(dt).subtract(value1, value2).format(formt);
        return lDate;
        // let DT:Date = new Date(lDate);
        // lDate = JSON.stringify(DT);
        // return lDate;
    }
    isDate(inputDate:string,inputDateFormat:string):boolean
    {
        if(inputDate=="" && inputDateFormat =="") 
            return false;
        else {
            if(inputDate=="NOW")
                return true;
            else {
                if(inputDateFormat == ""){
                    return moment(inputDate).isValid();
                }
                else {
                    return moment(inputDate,inputDateFormat).isValid();
                }
            }
        }
    }

}