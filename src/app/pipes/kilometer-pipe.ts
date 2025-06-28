import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kilometer',
})
export class KilometerPipe implements PipeTransform {
    transform(value: number): number {
        return Math.round((value / 1000) * 100) / 100;
    }
}
