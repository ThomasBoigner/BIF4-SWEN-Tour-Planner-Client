import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hour' })
export class HourPipe implements PipeTransform {
    transform(value: number): number {
        return Math.round((value / 3600) * 100) / 100;
    }
}
