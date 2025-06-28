import { TourService } from '../../service/tour.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { Tour } from '../../model/tour';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TourDetailsPageComponent } from './tour-details-page.component';
import { NGXLogger } from 'ngx-logger';
import { TourLogService } from '../../service/tour-log.service';
import { TourLog } from '../../model/tour-log';
import { Page } from '../../model/page';
import { DatePipe } from '@angular/common';
import { KilometerPipe } from '../../pipes/kilometer-pipe';
import { HourPipe } from '../../pipes/hour-pipe';

describe('TourDetailsPageComponent', () => {
    let tourService: jasmine.SpyObj<TourService>;
    let tourLogService: jasmine.SpyObj<TourLogService>;

    const kilometerPipe = new KilometerPipe();
    const hourPipe = new HourPipe();

    beforeEach(() => {
        const spyTourService = jasmine.createSpyObj<TourService>('TourService', ['getTour']);
        const spyTourLogService = jasmine.createSpyObj<TourLogService>('TourLogService', [
            'getTourLogsForTour',
        ]);
        const httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', [
            'get',
            'post',
            'put',
            'delete',
        ]);

        const loggerSpy = jasmine.createSpyObj<NGXLogger>('NGXLogger', [
            'debug',
            'info',
            'warn',
            'error',
            'fatal',
            'trace',
            'log',
            'updateConfig',
        ]);

        TestBed.configureTestingModule({
            imports: [TourDetailsPageComponent],
            providers: [
                { provide: TourService, useValue: spyTourService },
                { provide: TourLogService, useValue: spyTourLogService },
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: NGXLogger, useValue: loggerSpy },
                provideRouter(routes),
            ],
        });

        tourService = TestBed.inject(TourService) as jasmine.SpyObj<TourService>;
        tourLogService = TestBed.inject(TourLogService) as jasmine.SpyObj<TourLogService>;
    });

    it('Tour details should be displayed', () => {
        // Given
        const tour: Tour = {
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

        tourService.getTour.and.returnValue(of(tour));
        tourLogService.getTourLogsForTour.and.returnValue(of(null));

        // When
        const fixture: ComponentFixture<TourDetailsPageComponent> =
            TestBed.createComponent(TourDetailsPageComponent);

        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(tour.name);
        expect(nativeElement.textContent).toContain(tour.description);
        expect(nativeElement.textContent).toContain(tour.from.streetName);
        expect(nativeElement.textContent).toContain(tour.from.streetNumber);
        expect(nativeElement.textContent).toContain(tour.from.zipCode);
        expect(nativeElement.textContent).toContain(tour.from.city);
        expect(nativeElement.textContent).toContain(tour.from.country);
        expect(nativeElement.textContent).toContain(tour.to.streetName);
        expect(nativeElement.textContent).toContain(tour.to.streetNumber);
        expect(nativeElement.textContent).toContain(tour.to.zipCode);
        expect(nativeElement.textContent).toContain(tour.to.city);
        expect(nativeElement.textContent).toContain(tour.to.country);
        expect(nativeElement.textContent).toContain(kilometerPipe.transform(tour.distance));
        expect(nativeElement.textContent).toContain(hourPipe.transform(tour.estimatedTime));
        expect(nativeElement.textContent).toContain('Bike');
    });

    it('Message should be displayed if there are no tour logs ', () => {
        // Given
        tourLogService.getTourLogsForTour.and.returnValue(of(null));

        // When
        const fixture: ComponentFixture<TourDetailsPageComponent> =
            TestBed.createComponent(TourDetailsPageComponent);

        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain('No tour logs available');
    });

    it('Tour logs should be displayed ', () => {
        // Given
        const datePipe = new DatePipe('en');
        const expectedTourLog: TourLog = {
            id: 'c1946dcc-1afb-4c12-bf95-bf95fc2bf80f',
            tourId: '4b4701b8-18e7-49c9-85aa-97cf3a3e5890',
            duration: {
                startTime: new Date('2025-01-01T12:00:00'),
                endTime: new Date('2025-01-01T13:00:00'),
                duration: 60,
            },
            comment: 'What a nice tour!',
            difficulty: 3,
            distance: 2.0,
            rating: 5,
        };

        const expectedPage: Page<TourLog> = {
            content: [expectedTourLog],
            last: false,
            totalPages: 2,
            totalElements: 4,
            first: true,
            size: 2,
            number: 0,
            numberOfElements: 4,
            empty: false,
        };

        tourLogService.getTourLogsForTour.and.returnValue(of(expectedPage));

        // When
        const fixture: ComponentFixture<TourDetailsPageComponent> =
            TestBed.createComponent(TourDetailsPageComponent);

        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(
            datePipe.transform(expectedTourLog.duration.startTime, 'dd.MM.yyyy HH:mm'),
        );
        expect(nativeElement.textContent).toContain(
            datePipe.transform(expectedTourLog.duration.endTime, 'dd.MM.yyyy HH:mm'),
        );
        expect(nativeElement.textContent).toContain(expectedTourLog.duration.duration);
        expect(nativeElement.textContent).toContain(expectedTourLog.comment);
        expect(nativeElement.textContent).toContain(expectedTourLog.difficulty);
        expect(nativeElement.textContent).toContain(expectedTourLog.distance);
        expect(nativeElement.textContent).toContain(expectedTourLog.rating);
    });
});
