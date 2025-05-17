import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Tour } from '../model/tour';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TourService {
  private readonly toursUrl: string;

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {
    this.toursUrl = 'http://localhost:8080/tour';
  }

  public getTours(): Observable<Tour[]> {
    this.logger.debug(`Trying to get all tours from endpoint ${this.toursUrl}`);
    return this.http.get<Tour[]>(this.toursUrl);
  }
}
