import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToursListPageComponent } from './tours-list-page.component';
import { TourService } from '../../service/tour.service';
import { Tour } from '../../model/tour';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { Page } from '../../model/page';
import { BackupService } from '../../service/backup.service';

describe('ToursListPageComponent', () => {
    let tourService: jasmine.SpyObj<TourService>;

    beforeEach(() => {
        const spyTourService = jasmine.createSpyObj<TourService>('TourService', ['getTours']);
        const spyBackupService = jasmine.createSpyObj<BackupService>('BackupService', [
            'exportTour',
            'importTour',
        ]);

        TestBed.configureTestingModule({
            imports: [ToursListPageComponent],
            providers: [
                { provide: TourService, useValue: spyTourService },
                { provide: BackupService, useValue: spyBackupService },
                provideRouter(routes),
            ],
        });
        tourService = TestBed.inject(TourService) as jasmine.SpyObj<TourService>;
    });

    it('Message should be displayed if there are no tours', () => {
        // Given
        tourService.getTours.and.returnValue(of(null));

        // When
        const fixture: ComponentFixture<ToursListPageComponent> =
            TestBed.createComponent(ToursListPageComponent);
        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain('No tours available');
    });

    it('All Tours should be displayed', () => {
        // Given
        const tour1: Tour = {
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
        const tour2: Tour = {
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
                latitude: 10,
                longitude: 20,
            },
            transportType: 'RUNNING',
            distance: 40.0,
            estimatedTime: 240.0,
        };

        const expectedPage: Page<Tour> = {
            content: [tour1, tour2],
            last: false,
            totalPages: 2,
            totalElements: 4,
            first: true,
            size: 2,
            number: 0,
            numberOfElements: 4,
            empty: false,
        };

        tourService.getTours.and.returnValue(of(expectedPage));

        // When
        const fixture: ComponentFixture<ToursListPageComponent> =
            TestBed.createComponent(ToursListPageComponent);

        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(tour1.name);
        expect(nativeElement.textContent).toContain(tour1.estimatedTime / 60);
        expect(nativeElement.textContent).toContain(tour1.distance);
        expect(nativeElement.textContent).toContain(tour2.name);
        expect(nativeElement.textContent).toContain(tour2.estimatedTime / 60);
        expect(nativeElement.textContent).toContain(tour2.distance);
    });
});
