import { Component } from '@angular/core';
import { TourService } from '../../service/tour.service';
import { Observable } from 'rxjs';
import { Tour } from '../../model/tour';
import { AsyncPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'tour-details-page',
    templateUrl: './tour-details-page.component.html',
    styleUrls: ['./tour-details-page.component.css'],
    imports: [NgOptimizedImage, RouterLink, AsyncPipe, TitleCasePipe],
})
export class TourDetailsPageComponent {
    tour$: Observable<Tour>;
    tourId: string;

    constructor(
        private tourService: TourService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.tourId = this.route.snapshot.paramMap.get('id') ?? '';
        this.tour$ = this.tourService.getTour(this.tourId);
    }

    deleteTour() {
        this.tourService.deleteTour(this.tourId).subscribe(() => void this.router.navigate(['/']));
    }
}
