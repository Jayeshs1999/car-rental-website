import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInr'
})
export class UserInrPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
   const [price]=args;
    return value*price;
  }
}
