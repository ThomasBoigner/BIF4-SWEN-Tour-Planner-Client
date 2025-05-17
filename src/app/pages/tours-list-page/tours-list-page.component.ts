import { Component } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'tours-list-page',
    templateUrl: './tours-list-page.component.html',
    styleUrls: ['./tours-list-page.component.css'],
    imports: [NgOptimizedImage],
})
export class ToursListPageComponent {
    tours?: Tour[];

    constructor(private tourService: TourService) {}

    ngOnInit() {
        this.tourService.getTours().subscribe((tours) => {
            this.tours = tours;
        });
    }

    protected readonly length = length;
}
