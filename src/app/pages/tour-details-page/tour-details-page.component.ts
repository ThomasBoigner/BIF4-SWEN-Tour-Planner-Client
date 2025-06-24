import { Component } from '@angular/core';
import { TourService } from '../../service/tour.service';
import { Observable } from 'rxjs';
import { Tour } from '../../model/tour';
import { AsyncPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TourLogService } from '../../service/tour-log.service';
import { TourLog } from '../../model/tour-log';
import { TourLogListItemComponent } from '../../components/tour-log-list-item/tour-log-list-item.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Page } from '../../model/page';

@Component({
    selector: 'tour-details-page',
    templateUrl: './tour-details-page.component.html',
    styleUrls: ['./tour-details-page.component.css'],
    imports: [
        NgOptimizedImage,
        RouterLink,
        AsyncPipe,
        TitleCasePipe,
        TourLogListItemComponent,
        TourButtonComponent,
        SearchBarComponent,
    ],
})
export class TourDetailsPageComponent {
    tour$: Observable<Tour>;
    tourId: string;

    tourLogPages: Page<TourLog>[];
    searchInput = '';

    constructor(
        private tourService: TourService,
        private tourLogService: TourLogService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.tourId = this.route.snapshot.paramMap.get('id') ?? '';
        this.tour$ = this.tourService.getTour(this.tourId);
        this.tourLogPages = [];
        this.tourLogService
            .getTourLogsForTour(this.tourId, this.searchInput, 0, 5)
            .subscribe((tourLog) => {
                if (tourLog) {
                    this.tourLogPages.push(tourLog);
                }
            });
    }

    deleteTourLog(id: string) {
        this.tourLogService.deleteTourLog(id).subscribe(() => {
            this.tourLogPages = [];
            this.tourLogService
                .getTourLogsForTour(this.tourId, this.searchInput, 0, 5)
                .subscribe((tourLog) => {
                    if (tourLog) {
                        this.tourLogPages.push(tourLog);
                    }
                });
        });
    }

    deleteTour() {
        this.tourService.deleteTour(this.tourId).subscribe(() => void this.router.navigate(['/']));
    }
}
