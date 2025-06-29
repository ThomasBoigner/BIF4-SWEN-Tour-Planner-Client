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
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { BackupService } from '../../service/backup.service';
import { HttpResponse } from '@angular/common/http';
import { KilometerPipe } from '../../pipes/kilometer-pipe';
import { HourPipe } from '../../pipes/hour-pipe';

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
        InfiniteScrollDirective,
        KilometerPipe,
        HourPipe,
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
        private backupService: BackupService,
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

    searchTourLog() {
        this.tourLogPages = [];
        this.tourLogService
            .getTourLogsForTour(this.tourId, this.searchInput, 0, 5)
            .subscribe((tourLog) => {
                if (tourLog) {
                    this.tourLogPages.push(tourLog);
                }
            });
    }

    onTourLogListScrollDown() {
        const lastPage = this.tourLogPages.at(-1);

        if (!lastPage || lastPage.last) {
            return;
        }

        this.tourLogService
            .getTourLogsForTour(this.tourId, this.searchInput, lastPage.number + 1, 5)
            .subscribe((tourLog) => {
                if (!tourLog) {
                    return;
                }

                this.tourLogPages.push(tourLog);

                if (this.tourLogPages.length > 3) {
                    this.tourLogPages.shift();
                }
            });
    }

    onTourLogListScrollUp() {
        const firstPage = this.tourLogPages.at(0);

        if (!firstPage || firstPage.first) {
            return;
        }

        this.tourLogService
            .getTourLogsForTour(this.tourId, this.searchInput, firstPage.number - 1, 5)
            .subscribe((tourLog) => {
                if (!tourLog) {
                    return;
                }

                this.tourLogPages.unshift(tourLog);

                if (this.tourLogPages.length > 3) {
                    this.tourLogPages.pop();
                }
            });
    }

    exportTour() {
        this.backupService.exportTour(this.tourId).subscribe((response) => {
            if (!response.body) {
                return;
            }

            const contentDisposition = response.headers.get('content-disposition');
            const match = contentDisposition?.match(/filename="?(.+?)"?$/);

            const url = window.URL.createObjectURL(response.body);
            const a = document.createElement('a');
            a.href = url;
            a.download = match ? match[1] : 'backup.json';
            a.click();
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

    downloadTourReport() {
        this.tourService.getTourReport(this.tourId).subscribe((response) => {
            this.downloadFile(response, 'tour-report.pdf');
        });
    }

    downloadSummaryReport() {
        this.tourService.getSummaryReport().subscribe((response) => {
            this.downloadFile(response, 'summary-report.pdf');
        });
    }

    private downloadFile(response: HttpResponse<Blob>, defaultFileName: string) {
        if (!response.body) {
            return;
        }

        const contentDisposition = response.headers.get('content-disposition');
        const match = contentDisposition?.match(/filename="?(.+?)"?$/);
        const filename = match ? match[1] : defaultFileName;

        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
