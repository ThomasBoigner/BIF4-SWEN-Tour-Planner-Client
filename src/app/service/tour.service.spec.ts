import { Tour } from '../model/tour';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TourService } from './tour.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { firstValueFrom } from 'rxjs';

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

    it('#getTours should return an array of tours', async () => {
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
        const toursPromise = firstValueFrom(tourService.getTours())
        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tour',
        });
        req.flush(expectedTours);

        // Then
        expect(await toursPromise).toEqual(expectedTours);
    });
});
