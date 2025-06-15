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
import * as L from 'leaflet';
import { latLng, marker, tileLayer, Map, icon, Icon } from 'leaflet';
import 'leaflet-routing-machine';

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

    onMapReady(map: Map) {
        const plan = L.routing.plan([latLng([48.29903, 16.564899]), latLng([48.317181, 16.64259])], {
            draggableWaypoints: false
        })

        L.routing
            .control({
                plan: plan,
                lineOptions: {
                    styles: [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'blue', opacity: 1, weight: 2}],
                    addWaypoints: false,
                    missingRouteTolerance: 1000,
                    extendToWaypoints: true,
                }
            })
            .addTo(map);
    }

    constructor(private tourService: TourService) {
        this.tours$ = this.tourService.getTours();
    }
}
