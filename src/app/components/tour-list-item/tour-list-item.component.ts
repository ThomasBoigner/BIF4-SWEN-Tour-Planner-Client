import { Tour } from '../../model/tour';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'tour-list-item',
    templateUrl: './tour-list-item.component.html',
    styleUrls: ['./tour-list-item.component.css'],
    imports: [RouterLink, NgOptimizedImage],
})
export class TourListItemComponent {
    tour = input.required<Tour>();
}
