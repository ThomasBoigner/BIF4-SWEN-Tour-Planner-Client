import { Component } from '@angular/core';
import { TourService } from '../../service/tour.service';
import { Observable } from 'rxjs';
import { Tour } from '../../model/tour';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tour-details-page',
    templateUrl: './tour-details-page.component.html',
    styleUrls: ['./tour-details-page.component.css'],
    imports: [NgOptimizedImage, AsyncPipe],
})
export class TourDetailsPageComponent {
    tour$: Observable<Tour>;

    constructor(
        private tourService: TourService,
        private route: ActivatedRoute,
    ) {
        const id = this.route.snapshot.paramMap.get('id');
        this.tour$ = this.tourService.getTour(id ?? '');
    }
}
