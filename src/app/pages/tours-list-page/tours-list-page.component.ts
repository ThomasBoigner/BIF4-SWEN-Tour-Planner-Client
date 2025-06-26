import { Component } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourListItemComponent } from '../../components/tour-list-item/tour-list-item.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import L, { latLng, tileLayer, Map, Control } from 'leaflet';
import 'leaflet-routing-machine';
import { Page } from '../../model/page';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { BackupService } from '../../service/backup.service';

@Component({
    selector: 'tours-list-page',
    templateUrl: './tours-list-page.component.html',
    styleUrls: ['./tours-list-page.component.css'],
    imports: [
        NgOptimizedImage,
        RouterLink,
        TourListItemComponent,
        TourButtonComponent,
        SearchBarComponent,
        LeafletDirective,
        InfiniteScrollDirective,
    ],
})
export class ToursListPageComponent {
    tourPages: Page<Tour>[];
    searchInput = '';

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

    constructor(
        private tourService: TourService,
        private backupService: BackupService,
    ) {
        this.tourPages = [];
        this.tourService.getTours(this.searchInput, 0, 5).subscribe((tour) => {
            if (tour) {
                this.tourPages.push(tour);
            }
        });
    }

    restoreTour() {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.onchange = () => {
            const file = input.files?.item(0);

            if (!file) {
                return;
            }

            this.backupService.importTour(file).subscribe(() => {
                this.tourPages = [];
                this.tourService.getTours(this.searchInput, 0, 5).subscribe((tour) => {
                    if (tour) {
                        this.tourPages.push(tour);
                    }
                });
            });
        };
    }

    searchTour() {
        this.tourPages = [];
        this.tourService.getTours(this.searchInput, 0, 5).subscribe((tour) => {
            if (tour) {
                this.tourPages.push(tour);
            }
        });
    }

    onTourListScrollDown() {
        const lastPage = this.tourPages.at(-1);

        if (!lastPage || lastPage.last) {
            return;
        }

        this.tourService.getTours(this.searchInput, lastPage.number + 1, 5).subscribe((tour) => {
            if (!tour) {
                return;
            }

            this.tourPages.push(tour);

            if (this.tourPages.length > 3) {
                this.tourPages.shift();
            }
        });
    }

    onTourListScrollUp() {
        const firstPage = this.tourPages.at(0);

        if (!firstPage || firstPage.first) {
            return;
        }

        this.tourService.getTours(this.searchInput, firstPage.number - 1, 5).subscribe((tour) => {
            if (!tour) {
                return;
            }

            this.tourPages.unshift(tour);

            if (this.tourPages.length > 3) {
                this.tourPages.pop();
            }
        });
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
