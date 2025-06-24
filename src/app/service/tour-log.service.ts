import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { CreateTourLogCommand } from '../model/commands/create-tour-log-command';
import { TourLog } from '../model/tour-log';
import { Page } from '../model/page';

@Injectable({ providedIn: 'root' })
export class TourLogService {
    private readonly toursLogUrl: string;

    constructor(
        private http: HttpClient,
        private logger: NGXLogger,
    ) {
        this.toursLogUrl = 'http://localhost:8080/api/tourLog';
    }

    public getTourLogsForTour(
        tourId: string,
        comment?: string,
        page?: number,
        size?: number,
    ): Observable<Page<TourLog> | null> {
        const url = `${this.toursLogUrl}/tour/${tourId}`;
        this.logger.debug(`Trying to get logs for tour ${tourId} from ${url}`);
        const httpParams = new HttpParams();

        return this.http.get<Page<TourLog>>(url, {
            params: httpParams
                .set('name', comment ?? '')
                .set('page', page ?? 0)
                .set('size', size ?? 5),
        });
    }

    public createTourLog(createTourLogCommand: CreateTourLogCommand): Observable<TourLog> {
        this.logger.debug(
            `Trying to create new tour with command ${JSON.stringify(createTourLogCommand)} with endpoint ${this.toursLogUrl}`,
        );
        return this.http.post<TourLog>(this.toursLogUrl, createTourLogCommand);
    }

    public deleteTourLog(id: string) {
        this.logger.debug(
            `Trying to delete tour Log with id ${id} from endpoint ${this.toursLogUrl}`,
        );
        return this.http.delete(`${this.toursLogUrl}/${id}`);
    }
}
