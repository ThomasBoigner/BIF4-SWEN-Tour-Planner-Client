import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { ImageData } from '../image-data';

@Component({
    selector: 'date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.css'],
    imports: [NgOptimizedImage, ReactiveFormsModule],
})
export class DateInputComponent {
    label = input.required<string>();
    formGroup = input.required<FormGroup>();
    controlName = input.required<string>();
    image = input<ImageData>();
}
