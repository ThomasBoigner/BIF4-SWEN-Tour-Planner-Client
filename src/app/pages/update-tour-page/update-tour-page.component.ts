import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransportType } from '../../model/transport-type';
import { TourService } from '../../service/tour.service';
import { MultiSelectInput } from '../../components/multi-select-input/multi-select-input.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';

@Component({
    selector: 'update-tour-page',
    templateUrl: './update-tour-page.component.html',
    styleUrls: ['./update-tour-page.component.css'],
    imports: [
        NgOptimizedImage,
        RouterLink,
        ErrorMessageComponent,
        TextInputComponent,
        ReactiveFormsModule,
        MultiSelectInput,
        TourButtonComponent,
    ],
})
export class UpdateTourPageComponent {
    errorMessage = '';

    tourForm = new FormGroup({
        name: new FormControl<string>('', { nonNullable: true }),
        description: new FormControl<string>('', { nonNullable: true }),
        fromStreetName: new FormControl<string>('', { nonNullable: true }),
        fromStreetNumber: new FormControl<string>('', { nonNullable: true }),
        fromCity: new FormControl<string>('', { nonNullable: true }),
        fromZipCode: new FormControl<number>(0, { nonNullable: true }),
        fromCountry: new FormControl<string>('', { nonNullable: true }),
        toStreetName: new FormControl<string>('', { nonNullable: true }),
        toStreetNumber: new FormControl<string>('', { nonNullable: true }),
        toCity: new FormControl<string>('', { nonNullable: true }),
        toZipCode: new FormControl<number>(0, { nonNullable: true }),
        toCountry: new FormControl<string>('', { nonNullable: true }),
        transportType: new FormControl<TransportType>('BIKE', { nonNullable: true }),
    });

    constructor(
        private tourService: TourService,
        private router: Router,
    ) {}
}
