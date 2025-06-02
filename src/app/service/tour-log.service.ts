import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { CreateTourLogCommand } from '../model/commands/create-tour-log-command';
import { TourLog } from '../model/tour-log';

@Injectable({ providedIn: 'root' })
export class TourLogService {

    private readonly toursLogUrl: string;

    constructor(
        private http: HttpClient,
        private logger: NGXLogger,
    ) {
        this.toursLogUrl = 'http://localhost:8080/api/tourLog';
    }

    public getTourLogsForTour(tourId: string): Observable<TourLog[]> {
        const url = `${this.toursLogUrl}/tour/${tourId}`;
        this.logger.debug(`Fetching logs for tour ${tourId} from ${url}`);
        return this.http.get<TourLog[]>(url);
    }

    public createTourLog(createTourLogCommand: CreateTourLogCommand): Observable<TourLog> {
        this.logger.debug(
            `Trying to create new tour with command ${JSON.stringify(createTourLogCommand)} with endpoint ${this.toursLogUrl}`,
        );
        return this.http.post<TourLog>(this.toursLogUrl, createTourLogCommand);
    }

    public deleteTourLog(id: string) {
        this.logger.debug(`Trying to delete tour Log with id ${id} from endpoint ${this.toursLogUrl}`);
        return this.http.delete(`${this.toursLogUrl}/${id}`);
    }

}