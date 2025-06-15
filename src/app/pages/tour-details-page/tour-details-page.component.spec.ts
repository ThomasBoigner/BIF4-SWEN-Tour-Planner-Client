import { TourService } from '../../service/tour.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { Tour } from '../../model/tour';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TourDetailsPageComponent } from './tour-details-page.component';
import { NGXLogger } from 'ngx-logger';

describe('TourDetailsPageComponent', () => {
    let tourService: jasmine.SpyObj<TourService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj<TourService>('TourService', ['getTour']);
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
                { provide: TourService, useValue: spy },
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: NGXLogger, useValue: loggerSpy },
                provideRouter(routes),
            ],
        });

        tourService = TestBed.inject(TourService) as jasmine.SpyObj<TourService>;
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
            imageUrl: 'img',
        };

        tourService.getTour.and.returnValue(of(tour));

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
        expect(nativeElement.textContent).toContain(tour.distance);
        expect(nativeElement.textContent).toContain(tour.estimatedTime / 60);
        expect(nativeElement.textContent).toContain('Bike');
    });
});
