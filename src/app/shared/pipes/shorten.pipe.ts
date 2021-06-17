import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, char: number): string {
    if (value.length > char) {
      return value.substr(0, char) + '...';
    }
    return value;
  }
}
