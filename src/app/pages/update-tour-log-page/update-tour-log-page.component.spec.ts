import { TourLogService } from '../../service/tour-log.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { UpdateTourLogPageComponent } from './update-tour-log-page.component';
import { TourLog } from '../../model/tour-log';
import { of } from 'rxjs';

describe('UpdateTourLogPageComponent', () => {
    let tourLogService: jasmine.SpyObj<TourLogService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj<TourLogService>('TourLogService', ['getTourLog']);

        TestBed.configureTestingModule({
            providers: [{ provide: TourLogService, useValue: spy }, provideRouter(routes)],
        });
        tourLogService = TestBed.inject(TourLogService) as jasmine.SpyObj<TourLogService>;
    });

    it('All fields should be bound correctly', () => {
        // Given
        const startTime = '2024-12-31T22:00';
        const endTime = '2024-12-31T23:00';
        const comment = 'Test comment';
        const distance = 10;
        const difficulty = 1;
        const rating = 2;

        const tourLog: TourLog = {
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

        tourLogService.getTourLog.and.returnValue(of(tourLog));

        // When
        const fixture: ComponentFixture<UpdateTourLogPageComponent> = TestBed.createComponent(
            UpdateTourLogPageComponent,
        );

        fixture.detectChanges();

        const nativeElement = fixture.nativeElement as HTMLElement;
        const startTimeInput =
            nativeElement.querySelector<HTMLInputElement>('input#startTime') ??
            new HTMLInputElement();
        const endTimeInput =
            nativeElement.querySelector<HTMLInputElement>('input#endTime') ??
            new HTMLInputElement();
        const commentInput =
            nativeElement.querySelector<HTMLInputElement>('input#comment') ??
            new HTMLInputElement();
        const distanceInput =
            nativeElement.querySelector<HTMLInputElement>('input#distance') ??
            new HTMLInputElement();
        const difficultyInput =
            nativeElement.querySelector<HTMLInputElement>('input#difficulty') ??
            new HTMLInputElement();
        const ratingInput =
            nativeElement.querySelector<HTMLInputElement>('input#rating') ?? new HTMLInputElement();

        startTimeInput.value = startTime;
        endTimeInput.value = endTime;
        commentInput.value = comment;
        distanceInput.value = String(distance);
        difficultyInput.value = String(difficulty);
        ratingInput.value = String(rating);

        startTimeInput.dispatchEvent(new Event('input'));
        endTimeInput.dispatchEvent(new Event('input'));
        commentInput.dispatchEvent(new Event('input'));
        distanceInput.dispatchEvent(new Event('input'));
        distanceInput.dispatchEvent(new Event('input'));
        difficultyInput.dispatchEvent(new Event('input'));
        ratingInput.dispatchEvent(new Event('input'));

        // Then
        expect(fixture.componentInstance).toBeDefined();
        expect(fixture.componentInstance.tourLogForm.value.startTime?.toLocaleString()).toEqual(
            startTime,
        );
        expect(fixture.componentInstance.tourLogForm.value.endTime?.toLocaleString()).toEqual(
            endTime,
        );
        expect(fixture.componentInstance.tourLogForm.value.comment).toEqual(comment);
        expect(String(fixture.componentInstance.tourLogForm.value.distance)).toEqual(
            String(distance),
        );
        expect(String(fixture.componentInstance.tourLogForm.value.difficulty)).toEqual(
            String(difficulty),
        );
        expect(String(fixture.componentInstance.tourLogForm.value.rating)).toEqual(String(rating));
    });
});
