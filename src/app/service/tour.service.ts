import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Tour } from '../model/tour';
import { Observable } from 'rxjs';
import { CreateTourCommand } from '../model/commands/createTourCommand';

@Injectable({ providedIn: 'root' })
export class TourService {
    private readonly toursUrl: string;

    constructor(
        private http: HttpClient,
        private logger: NGXLogger,
    ) {
        this.toursUrl = 'http://localhost:8080/api/tour';
    }

    public getTours(): Observable<Tour[]> {
        this.logger.debug(`Trying to get all tours from endpoint ${this.toursUrl}`);
        return this.http.get<Tour[]>(this.toursUrl);
    }

    public getTour(id: string): Observable<Tour> {
        this.logger.debug(`Trying to get tour with id ${id} from endpoint ${this.toursUrl}`);
        return this.http.get<Tour>(`${this.toursUrl}/${id}`);
    }

    public createTour(createTourCommand: CreateTourCommand): Observable<Tour> {
        this.logger.debug(
            `Trying to create new tour with command ${JSON.stringify(createTourCommand)} with endpoint ${this.toursUrl}`,
        );
        return this.http.post<Tour>(this.toursUrl, createTourCommand);
    }

    public deleteTour(id: string) {
        this.logger.debug(`Trying to delete tour with id ${id} from endpoint ${this.toursUrl}`);
        return this.http.delete(`${this.toursUrl}/${id}`);
    }
}
