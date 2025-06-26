import { Tour } from '../model/tour';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TourService } from './tour.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { catchError, of } from 'rxjs';
import { CreateTourCommand } from '../model/commands/create-tour-command';
import { Page } from '../model/page';
import { UpdateTourCommand } from '../model/commands/update-tour-command';

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

    it('#getTours should return a page with tours from the server', () => {
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
                    latitude: 10,
                    longitude: 20,
                },
                to: {
                    country: 'Austria',
                    city: 'Strasshof an der Nordbahn',
                    zipCode: 2231,
                    streetName: 'Billroth-Gasse',
                    streetNumber: '5',
                    latitude: 20,
                    longitude: 30,
                },
                transportType: 'BIKE',
                distance: 20.0,
                estimatedTime: 120.0,
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
                    latitude: 10,
                    longitude: 20,
                },
                to: {
                    country: 'Austria',
                    city: 'Strasshof an der Nordbahn',
                    zipCode: 2231,
                    streetName: 'Billroth-Gasse',
                    streetNumber: '5',
                    latitude: 20,
                    longitude: 30,
                },
                transportType: 'RUNNING',
                distance: 40.0,
                estimatedTime: 240.0,
            },
        ];

        const expectedPage: Page<Tour> = {
            content: expectedTours,
            last: false,
            totalPages: 2,
            totalElements: 4,
            first: true,
            size: 2,
            number: 0,
            numberOfElements: 4,
            empty: false,
        };

        // When
        const response = tourService.getTours();

        // Then
        response.subscribe((tours) => {
            expect(tours).toEqual(expectedPage);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour?name=&page=0&size=5',
        });

        req.flush(expectedPage);
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
            url: 'http://localhost:8080/api/tour?name=&page=0&size=5',
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
            url: 'http://localhost:8080/api/tour?name=&page=0&size=5',
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
                latitude: 10,
                longitude: 20,
            },
            to: {
                country: 'Austria',
                city: 'Strasshof an der Nordbahn',
                zipCode: 2231,
                streetName: 'Billroth-Gasse',
                streetNumber: '5',
                latitude: 10,
                longitude: 20,
            },
            transportType: 'BIKE',
            distance: 20.0,
            estimatedTime: 120.0,
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

    it('#createTour should create Tour on the server and return tour', () => {
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
                latitude: 10,
                longitude: 20,
            },
            to: {
                country: 'Austria',
                city: 'Strasshof an der Nordbahn',
                zipCode: 2231,
                streetName: 'Billroth-Gasse',
                streetNumber: '5',
                latitude: 10,
                longitude: 20,
            },
            transportType: 'BIKE',
            distance: 20.0,
            estimatedTime: 120.0,
        };
        const createTourCommand: CreateTourCommand = {
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
        };

        // When
        const response = tourService.createTour(createTourCommand);

        // Then
        response.subscribe((tour) => {
            expect(tour).toEqual(expectedTour);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'POST',
            url: 'http://localhost:8080/api/tour',
        });

        req.flush(expectedTour);
        expect(req.request.responseType).toEqual('json');
    });

    it('#createTour should return an error when the request failed', () => {
        // Given
        const tourService = TestBed.inject(TourService);
        const createTourCommand: CreateTourCommand = {
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
        };

        // When
        const response = tourService.createTour(createTourCommand);

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
            method: 'POST',
            url: 'http://localhost:8080/api/tour',
        });

        req.error(new ProgressEvent('Network Error'));
    });

    it('#createTour should return an error when the server send an error', () => {
        // Given
        const tourService = TestBed.inject(TourService);
        const createTourCommand: CreateTourCommand = {
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
        };

        // When
        const response = tourService.createTour(createTourCommand);

        // Then
        response
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(500);
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'POST',
            url: 'http://localhost:8080/api/tour',
        });

        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });

    it('#updateTour should update a tour on the server and return a tour', () => {
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
                latitude: 10,
                longitude: 20,
            },
            to: {
                country: 'Austria',
                city: 'Strasshof an der Nordbahn',
                zipCode: 2231,
                streetName: 'Billroth-Gasse',
                streetNumber: '5',
                latitude: 10,
                longitude: 20,
            },
            transportType: 'BIKE',
            distance: 20.0,
            estimatedTime: 120.0,
        };
        const updateTourCommand: UpdateTourCommand = {
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
        };

        // When
        const response = tourService.updateTour(expectedTour.id, updateTourCommand);

        // Then
        response.subscribe((tour) => {
            expect(tour).toEqual(expectedTour);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'PUT',
            url: `http://localhost:8080/api/tour/${expectedTour.id}`,
        });

        req.flush(expectedTour);
        expect(req.request.responseType).toEqual('json');
    });

    it('#deleteTour delete a tour on the server', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        tourService.deleteTour('e4f61472-1ead-4b0a-a895-c7ae75139fc2').subscribe();

        // Then
        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'DELETE',
            url: 'http://localhost:8080/api/tour/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.flush(null, { status: 200, statusText: 'ok' });
    });

    it('#deleteTour should return an error when the request failed', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        tourService
            .deleteTour('e4f61472-1ead-4b0a-a895-c7ae75139fc2')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(0);
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        // Then
        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'DELETE',
            url: 'http://localhost:8080/api/tour/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.error(new ProgressEvent('Network Error'));
    });

    it('#deleteTour should return an error when the server send an error', () => {
        // Given
        const tourService = TestBed.inject(TourService);

        // When
        tourService
            .deleteTour('e4f61472-1ead-4b0a-a895-c7ae75139fc2')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    expect(error.status).toEqual(500);
                    expect(error.ok).toBeFalsy();
                    return of(error);
                }),
            )
            .subscribe();

        // Then
        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'DELETE',
            url: 'http://localhost:8080/api/tour/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
});
