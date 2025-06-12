import { Component } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TourListItemComponent } from '../../components/tour-list-item/tour-list-item.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';

@Component({
    selector: 'tours-list-page',
    templateUrl: './tours-list-page.component.html',
    styleUrls: ['./tours-list-page.component.css'],
    imports: [NgOptimizedImage, AsyncPipe, RouterLink, TourListItemComponent, TourButtonComponent],
})
export class ToursListPageComponent {
    tours$: Observable<Tour[]>;

    constructor(private tourService: TourService) {
        this.tours$ = this.tourService.getTours();
    }
}
