import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({ name: 'searchByName' })
export class SearchByNamePipe implements PipeTransform {
  transform(items: any[], searchText: string) {
    if(items != undefined && searchText != undefined){
      return items.filter(item => item.name.indexOf(searchText) !== -1);
    }
    return items;
  }
}