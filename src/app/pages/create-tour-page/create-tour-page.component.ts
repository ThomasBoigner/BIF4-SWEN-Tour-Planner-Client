import { Component } from '@angular/core';
import { TourService } from '../../service/tour.service';
import { CreateTourCommand } from '../../model/commands/createTourCommand';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'create-tour-page',
    templateUrl: './create-tour-page.component.html',
    styleUrls: ['./create-tour-page.component.css'],
    imports: [NgOptimizedImage, RouterLink],
})
export class CreateTourPageComponent {
    command: CreateTourCommand;

    constructor(private service: TourService) {
        this.command = {
            name: '',
            description: '',
            from: {
                country: '',
                city: '',
                streetName: '',
                zipCode: 0,
                streetNumber: '',
            },
            to: {
                country: '',
                city: '',
                streetName: '',
                zipCode: 0,
                streetNumber: '',
            },
            transportType: 'HIKE',
        };
    }
}
