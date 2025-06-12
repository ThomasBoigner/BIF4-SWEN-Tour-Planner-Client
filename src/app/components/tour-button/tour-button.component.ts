import { Component, input } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageData } from '../image-data';

@Component({
    selector: 'tour-button',
    templateUrl: './tour-button.component.html',
    imports: [NgOptimizedImage, RouterLink],
    styleUrls: ['./tour-button.component.css'],
})
export class TourButtonComponent {
    text = input.required<string>();
    color = input.required<'primary' | 'secondary' | 'error'>();
    link = input<string>();
    primaryImage = input<ImageData>();
    secondaryImage = input<ImageData>();
}
