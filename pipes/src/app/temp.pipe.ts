import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TempPipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType?: string,
    outputType?: string
  ) {
    let val;
    if (!value) return value;
    if (inputType === 'cel' && outputType === 'feh') {
      val = (Number(value) * 9) / 5 + 32;
      return `${val.toFixed(2)} °F`;
    } else if (inputType === 'feh' && outputType === 'cel') {
      val = ((Number(value) - 32) * 5) / 9;
      return `${val.toFixed(2)} °C`;
    } else {
      val = Number(value);
    }

    return `${val.toFixed(2)}`;
  }
}
