import { Component } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TourListItemComponent } from '../../components/tour-list-item/tour-list-item.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LeafletDirective, LeafletLayersDirective } from '@bluehalo/ngx-leaflet';
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
        LeafletLayersDirective,
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

    leafletLayers = [
        marker([48.29903, 16.564899], {
            icon: icon({
                ...Icon.Default.prototype.options,
                iconUrl: 'assets/marker-icon.png',
                iconRetinaUrl: 'assets/marker-icon-2x.png',
                shadowUrl: 'assets/marker-shadow.png',
            }),
        }),
        marker([48.317181, 16.64259], {
            icon: icon({
                ...Icon.Default.prototype.options,
                iconUrl: 'assets/marker-icon.png',
                iconRetinaUrl: 'assets/marker-icon-2x.png',
                shadowUrl: 'assets/marker-shadow.png',
            }),
        }),
    ];

    onMapReady(map: Map) {
        console.log(L);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
        (L as any).routing.control({
            waypoints: [
                L.latLng(48.29903, 16.564899),
                L.latLng(48.317181, 16.64259)
            ]
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        }).addTo(map);
    }

    constructor(private tourService: TourService) {
        this.tours$ = this.tourService.getTours();
    }
}
