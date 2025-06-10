import { Component, input, output } from '@angular/core';
import { TourLog } from '../../model/tour-log';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'tour-log-list-item',
    templateUrl: './tour-log-list-item.component.html',
    styleUrls: ['./tour-log-list-item.component.css'],
    imports: [NgOptimizedImage, DatePipe],
})
export class TourLogListItemComponent {
    tourLog = input.required<TourLog>();
    deleteTourLog = output();
}
