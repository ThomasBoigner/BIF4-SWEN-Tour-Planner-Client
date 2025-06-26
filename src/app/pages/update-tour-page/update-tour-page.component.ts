import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransportType } from '../../model/transport-type';
import { TourService } from '../../service/tour.service';
import { MultiSelectInput } from '../../components/multi-select-input/multi-select-input.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { UpdateTourCommand } from '../../model/commands/update-tour-command';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../model/exception/error-response';

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

    tourId: string;
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
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.tourId = this.route.snapshot.paramMap.get('id') ?? '';
        this.tourService.getTour(this.tourId).subscribe((tour) => {
            this.tourForm = new FormGroup({
                name: new FormControl<string>(tour.name, { nonNullable: true }),
                description: new FormControl<string>(tour.description, { nonNullable: true }),
                fromStreetName: new FormControl<string>(tour.from.streetName, {
                    nonNullable: true,
                }),
                fromStreetNumber: new FormControl<string>(tour.from.streetNumber, {
                    nonNullable: true,
                }),
                fromCity: new FormControl<string>(tour.from.city, { nonNullable: true }),
                fromZipCode: new FormControl<number>(tour.from.zipCode, { nonNullable: true }),
                fromCountry: new FormControl<string>(tour.from.country, { nonNullable: true }),
                toStreetName: new FormControl<string>(tour.to.streetName, { nonNullable: true }),
                toStreetNumber: new FormControl<string>(tour.to.streetNumber, {
                    nonNullable: true,
                }),
                toCity: new FormControl<string>(tour.to.city, { nonNullable: true }),
                toZipCode: new FormControl<number>(tour.to.zipCode, { nonNullable: true }),
                toCountry: new FormControl<string>(tour.to.country, { nonNullable: true }),
                transportType: new FormControl<TransportType>(tour.transportType, {
                    nonNullable: true,
                }),
            });
        });
    }

    handleSubmit() {
        const command: UpdateTourCommand = {
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
            transportType: this.tourForm.controls.transportType.value,
        };
        this.tourService.updateTour(this.tourId, command).subscribe({
            complete: () => void this.router.navigate(['/']),
            error: (error: HttpErrorResponse) => {
                this.errorMessage = (error.error as ErrorResponse).message;
            },
        });
    }
}
