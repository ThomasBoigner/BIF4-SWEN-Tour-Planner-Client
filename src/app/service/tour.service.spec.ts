import { Tour } from '../model/tour';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TourService } from './tour.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { catchError, of } from 'rxjs';

describe('TourService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LoggerTestingModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
    });

    afterEach(() => {
        TestBed.inject(HttpTestingController).verify();
    });

    it('#getTours should return an array of tours from the server', () => {
        // Given
        const tourService = TestBed.inject(TourService);
        const expectedTours: Tour[] = [
            {
                id: 'e4f61472-1ead-4b0a-a895-c7ae75139fc2',
                name: 'Tour 1',
                description: 'This tour is awesome',
                from: {
                    country: 'Austria',
                    city: 'Deutsch Wagram',
                    zipCode: 2232,
                    streetName: 'Radetzkystraße',
                    streetNumber: '2-6',
                },
                to: {
                    country: 'Austria',
                    city: 'Strasshof an der Nordbahn',
                    zipCode: 2231,
                    streetName: 'Billroth-Gasse',
                    streetNumber: '5',
                },
                transportType: 'BIKE',
                distance: 20.0,
                estimatedTime: 120.0,
                imageUrl: 'img',
            },
            {
                id: '05de8280-f825-471c-bd42-6aa6944183c0',
                name: 'Tour 2',
                description: 'This tour is awesome',
                from: {
                    country: 'Austria',
                    city: 'Deutsch Wagram',
                    zipCode: 2232,
                    streetName: 'Radetzkystraße',
                    streetNumber: '2-6',
                },
                to: {
                    country: 'Austria',
                    city: 'Strasshof an der Nordbahn',
                    zipCode: 2231,
                    streetName: 'Billroth-Gasse',
                    streetNumber: '5',
                },
                transportType: 'RUNNING',
                distance: 40.0,
                estimatedTime: 240.0,
                imageUrl: 'img',
            },
        ];

        // When
        const response = tourService.getTours();

        // Then
        response.subscribe((tours) => {
            expect(tours).toEqual(expectedTours);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour',
        });

        req.flush(expectedTours);
        expect(req.request.responseType).toEqual('json');
    });

    it('#getTours should return an error when the request failed', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        const response = tourService.getTours();

        // Then
        response
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(0);
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour',
        });

        req.error(new ProgressEvent('Network Error'));
    });

    it('#getTours should return an error when the server send an error', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        const response = tourService.getTours();

        // Then
        response
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(500);
                    expect(error.statusText).toEqual('Internal Server Error');
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour',
        });

        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });

    it('#getTour should return a tour from the server', () => {
        // Given
        const tourService = TestBed.inject(TourService);
        const expectedTour: Tour = {
            id: 'e4f61472-1ead-4b0a-a895-c7ae75139fc2',
            name: 'Tour 1',
            description: 'This tour is awesome',
            from: {
                country: 'Austria',
                city: 'Deutsch Wagram',
                zipCode: 2232,
                streetName: 'Radetzkystraße',
                streetNumber: '2-6',
            },
            to: {
                country: 'Austria',
                city: 'Strasshof an der Nordbahn',
                zipCode: 2231,
                streetName: 'Billroth-Gasse',
                streetNumber: '5',
            },
            transportType: 'BIKE',
            distance: 20.0,
            estimatedTime: 120.0,
            imageUrl: 'img',
        };

        // When
        const response = tourService.getTour('e4f61472-1ead-4b0a-a895-c7ae75139fc2');

        // Then
        response.subscribe((tour) => {
            expect(tour).toEqual(expectedTour);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.flush(expectedTour);
        expect(req.request.responseType).toEqual('json');
    });

    it('#getTour should return an error when the request failed', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        const response = tourService.getTour('e4f61472-1ead-4b0a-a895-c7ae75139fc2');

        // Then
        response
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(0);
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.error(new ProgressEvent('Network Error'));
    });

    it('#getTour should return an error when the server send an error', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        const response = tourService.getTour('e4f61472-1ead-4b0a-a895-c7ae75139fc2');

        // Then
        response
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(500);
                    expect(error.statusText).toEqual('Internal Server Error');
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
});
