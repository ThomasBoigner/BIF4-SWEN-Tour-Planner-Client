import { Tour } from '../../model/tour';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { KilometerPipe } from '../../pipes/kilometer-pipe';
import { HourPipe } from '../../pipes/hour-pipe';

@Component({
    selector: 'tour-list-item',
    templateUrl: './tour-list-item.component.html',
    styleUrls: ['./tour-list-item.component.css'],
    imports: [RouterLink, NgOptimizedImage, KilometerPipe, HourPipe],
})
export class TourListItemComponent {
    tour = input.required<Tour>();
}
