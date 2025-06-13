import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageData } from '../image-data';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'multi-select-input',
    templateUrl: './multi-select-input.component.html',
    styleUrls: ['./multi-select-input.component.css'],
    imports: [NgOptimizedImage, ReactiveFormsModule],
})
export class MultiSelectInput {
    label = input.required<string>();
    formGroup = input.required<FormGroup>();
    controlName = input.required<string>();
    options = input.required<{id: number, label: string; value: string}[]>();
    image = input<ImageData>();
}
