import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
})
export class ArrayPipe implements PipeTransform {
  transform(value: Array<any>, propName: string): string {
    return value.map((item) => item[propName]).join(', ');
  }
}
