import { Component, input, output } from '@angular/core';
import { TourLog } from '../../model/tour-log';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tour-log-list-item',
    templateUrl: './tour-log-list-item.component.html',
    styleUrls: ['./tour-log-list-item.component.css'],
    imports: [NgOptimizedImage, DatePipe, RouterLink],
})
export class TourLogListItemComponent {
    tourLog = input.required<TourLog>();
    deleteTourLog = output();
}
