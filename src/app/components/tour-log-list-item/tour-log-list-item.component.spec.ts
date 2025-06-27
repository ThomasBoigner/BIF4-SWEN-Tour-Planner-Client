import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourLog } from '../../model/tour-log';
import { TourLogListItemComponent } from './tour-log-list-item.component';
import { DatePipe } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('TourLogListItemComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter(routes)],
        });
    });

    it('Tour log data should be displayed', () => {
        // Given
        const tourLog: TourLog = {
            id: 'df976291-f8e0-4f82-892c-953aee665ec1',
            tourId: '51585267-aba9-4904-9ba1-2d4d04a864da',
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
        const datePipe = new DatePipe('en');

        // When
        const fixture: ComponentFixture<TourLogListItemComponent> =
            TestBed.createComponent(TourLogListItemComponent);

        fixture.componentRef.setInput('tourLog', tourLog);
        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(
            datePipe.transform(tourLog.duration.startTime, 'dd.MM.yyyy HH:mm'),
        );
        expect(nativeElement.textContent).toContain(
            datePipe.transform(tourLog.duration.endTime, 'dd.MM.yyyy HH:mm'),
        );
        expect(nativeElement.textContent).toContain(tourLog.duration.duration);
        expect(nativeElement.textContent).toContain(tourLog.comment);
        expect(nativeElement.textContent).toContain(tourLog.difficulty);
        expect(nativeElement.textContent).toContain(tourLog.distance);
        expect(nativeElement.textContent).toContain(tourLog.rating);
    });
});
