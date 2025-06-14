import { Component } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TourListItemComponent } from '../../components/tour-list-item/tour-list-item.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';

@Component({
    selector: 'tours-list-page',
    templateUrl: './tours-list-page.component.html',
    styleUrls: ['./tours-list-page.component.css'],
    imports: [
        NgOptimizedImage,
        AsyncPipe,
        RouterLink,
        TourListItemComponent,
        TourButtonComponent,
        SearchBarComponent,
        LeafletDirective,
    ],
})
export class ToursListPageComponent {
    tours$: Observable<Tour[]>;
    leafletOptions = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '...',
            }),
        ],
        zoom: 3,
        center: latLng(0, 0),
    };

    constructor(private tourService: TourService) {
        this.tours$ = this.tourService.getTours();
    }
}
