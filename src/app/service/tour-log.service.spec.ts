import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TourLogService } from './tour-log.service';
import { TourLog } from '../model/tour-log';
import { Page } from '../model/page';
import { CreateTourLogCommand } from '../model/commands/create-tour-log-command';

describe('TourLogService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LoggerTestingModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
    });

    afterEach(() => {
        TestBed.inject(HttpTestingController).verify();
    });

    it('#getTourLogs should return a page with tour logs from the server', () => {
        // Given
        const tourLogService = TestBed.inject(TourLogService);
        const expectedTourLogs: TourLog[] = [
            {
                id: 'c1946dcc-1afb-4c12-bf95-bf95fc2bf80f',
                tourId: '4b4701b8-18e7-49c9-85aa-97cf3a3e5890',
                duration: {
                    startTime: '2025-01-01T12:00:00',
                    endTime: '2025-01-01T13:00:00',
                    duration: 60,
                },
                comment: 'What a nice tour!',
                difficulty: 3,
                distance: 2.0,
                rating: 5,
            },
            {
                id: '09b6cfc1-4977-43d4-902f-0fd387c753ed',
                tourId: '4b4701b8-18e7-49c9-85aa-97cf3a3e5890',
                duration: {
                    startTime: '2025-02-01T08:00:00',
                    endTime: '2025-02-01T10:00:00',
                    duration: 120,
                },
                comment: 'Super cool!',
                difficulty: 2,
                distance: 1.5,
                rating: 4,
            },
        ];

        const expectedPage: Page<TourLog> = {
            content: expectedTourLogs,
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
        const response = tourLogService.getTourLogsForTour('abc');

        // Then
        response.subscribe((tourLogs) => {
            expect(tourLogs).toEqual(expectedPage);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'GET',
            url: 'http://localhost:8080/api/tourLog/tour/abc?comment=&page=0&size=5',
        });

        req.flush(expectedPage);
        expect(req.request.responseType).toEqual('json');
    });

    it('#createTourLog should create a tour log on the server and return that log', () => {
        // Given
        const tourLogService = TestBed.inject(TourLogService);
        const expectedTourLog: TourLog = {
            id: 'c1946dcc-1afb-4c12-bf95-bf95fc2bf80f',
            tourId: '4b4701b8-18e7-49c9-85aa-97cf3a3e5890',
            duration: {
                startTime: '2025-01-01T12:00:00',
                endTime: '2025-01-01T13:00:00',
                duration: 60,
            },
            comment: 'What a nice tour!',
            difficulty: 3,
            distance: 2.0,
            rating: 5,
        };

        const createTourLog: CreateTourLogCommand = {
            tourId: '4b4701b8-18e7-49c9-85aa-97cf3a3e5890',
            startTime: new Date('2024-12-31T22:00'),
            endTime: new Date('2024-12-31T23:00'),
            comment: 'abc',
            distance: 10,
            difficulty: 1,
            rating: 5,
        };

        // When
        const response = tourLogService.createTourLog(createTourLog);

        // Then
        response.subscribe((tourLog) => {
            expect(tourLog).toEqual(expectedTourLog);
        });

        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'POST',
            url: 'http://localhost:8080/api/tourLog',
        });

        req.flush(expectedTourLog);
        expect(req.request.responseType).toEqual('json');
    });

    it('#deleteTourLog should delete a tour log on the server', () => {
        // Given
        const tourLogService = TestBed.inject(TourLogService);

        // When
        tourLogService.deleteTourLog('e4f61472-1ead-4b0a-a895-c7ae75139fc2').subscribe();

        // Then
        const req = TestBed.inject(HttpTestingController).expectOne({
            method: 'DELETE',
            url: 'http://localhost:8080/api/tourLog/e4f61472-1ead-4b0a-a895-c7ae75139fc2',
        });

        req.flush(null, { status: 200, statusText: 'ok' });
    });
});
