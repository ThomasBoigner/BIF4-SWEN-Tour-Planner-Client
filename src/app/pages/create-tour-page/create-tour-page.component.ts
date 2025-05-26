import { Component } from '@angular/core';
import { TourService } from '../../service/tour.service';
import { CreateTourCommand } from '../../model/commands/createTourCommand';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransportType } from '../../model/transportType';

@Component({
    selector: 'create-tour-page',
    templateUrl: './create-tour-page.component.html',
    styleUrls: ['./create-tour-page.component.css'],
    imports: [NgOptimizedImage, RouterLink, ReactiveFormsModule],
})
export class CreateTourPageComponent {
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

    constructor(private tourService: TourService) {}

    handleSubmit() {
        const command: CreateTourCommand = {
            name: this.tourForm.controls.name.value,
            description: this.tourForm.controls.description.value,
            from: {
                streetName: this.tourForm.controls.fromStreetName.value,
                streetNumber: this.tourForm.controls.fromStreetNumber.value,
                city: this.tourForm.controls.fromCity.value,
                zipCode: this.tourForm.controls.fromZipCode.value,
                country: this.tourForm.controls.fromCountry.value,
            },
            to: {
                streetName: this.tourForm.controls.toStreetName.value,
                streetNumber: this.tourForm.controls.toStreetNumber.value,
                city: this.tourForm.controls.toCity.value,
                zipCode: this.tourForm.controls.toZipCode.value,
                country: this.tourForm.controls.toCountry.value,
            },
            transportType: 'BIKE',
        };
        this.tourService.createTour(command);
    }
}
