import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tour } from '../../model/tour';
import { TourListItemComponent } from './tour-list-item.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('TourListItemComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter(routes)],
        });
    });

    it('Tour data should be displayed', () => {
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
        const fixture: ComponentFixture<TourListItemComponent> =
            TestBed.createComponent(TourListItemComponent);

        fixture.componentRef.setInput('tour', tour);
        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(tour.name);
        expect(nativeElement.textContent).toContain(tour.estimatedTime / 60);
        expect(nativeElement.textContent).toContain(tour.distance);
    });
});
