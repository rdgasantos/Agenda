import { Constants } from './../_util/constants';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormatedPipe'
})
export class DateTimeFormatedPipePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }

}
