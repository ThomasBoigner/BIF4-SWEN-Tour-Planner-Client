import { Component } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'tours-list-page',
    templateUrl: './tours-list-page.component.html',
    styleUrls: ['./tours-list-page.component.css'],
    imports: [NgOptimizedImage, AsyncPipe],
})
export class ToursListPageComponent {
    tours$: Observable<Tour[]>;

    constructor(private tourService: TourService) {
        this.tours$ = this.tourService.getTours()
    }
}
