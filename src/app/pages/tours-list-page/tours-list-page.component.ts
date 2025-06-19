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
import L, { latLng, tileLayer, Map, Control } from 'leaflet';
import 'leaflet-routing-machine';
import { Page } from '../../model/page';

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
    tours$: Observable<Page<Tour>>;
    selectedTour: string | undefined;
    map: Map | undefined;
    control: Control | undefined;

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

    onMapReady(map: Map) {
        this.map = map;
    }

    selectTour(tour: Tour) {
        if (!this.map) {
            return;
        }

        if (this.control) {
            this.control.remove();
        }

        if (this.selectedTour == tour.id) {
            this.selectedTour = undefined;
            return;
        }

        const plan = L.routing.plan(
            [
                latLng([tour.from.latitude, tour.from.longitude]),
                latLng([tour.to.latitude, tour.to.longitude]),
            ],
            {
                draggableWaypoints: false,
                addWaypoints: false,
            },
        );

        this.control = L.routing
            .control({
                plan: plan,
                lineOptions: {
                    styles: [
                        { color: 'black', opacity: 0.15, weight: 9 },
                        { color: 'white', opacity: 0.8, weight: 6 },
                        { color: 'blue', opacity: 1, weight: 2 },
                    ],
                    addWaypoints: false,
                    missingRouteTolerance: 1000,
                    extendToWaypoints: true,
                },
            })
            .addTo(this.map);

        this.selectedTour = tour.id;
    }
}
