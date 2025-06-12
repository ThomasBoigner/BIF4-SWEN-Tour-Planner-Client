import { Component, model } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'text-input',
    templateUrl: './text-input.component.html',
    imports: [NgOptimizedImage, FormsModule],
    styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
    value = model('');
}
