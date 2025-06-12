import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ImageData } from '../image-data';

@Component({
    selector: 'tour-button',
    templateUrl: './tour-button.component.html',
    imports: [NgOptimizedImage],
    styleUrls: ['./tour-button.component.css'],
})
export class TourButtonComponent {
    text = input.required<string>();
    color = input.required<'primary' | 'secondary' | 'error'>();
    primaryImage = input<ImageData>();
    secondaryImage = input<ImageData>();
}
