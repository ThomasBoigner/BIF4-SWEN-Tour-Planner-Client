import { TourLogService } from '../../service/tour-log.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { CreateTourLogPageComponent } from './create-tour-log-page-component';

describe('CreateTourLogPageComponent', () => {
    beforeEach(() => {
        const spy = jasmine.createSpyObj<TourLogService>('TourLogService', ['createTourLog']);

        TestBed.configureTestingModule({
            providers: [{ provide: TourLogService, useValue: spy }, provideRouter(routes)],
        });
    });

    it('All fields should be bound correctly', () => {
        // Given
        const startTime = '2024-12-31T22:00';
        const endTime = '2024-12-31T23:00';
        const comment = 'Test comment';
        const distance = 10;
        const difficulty = 1;
        const rating = 2;

        // When
        const fixture: ComponentFixture<CreateTourLogPageComponent> = TestBed.createComponent(
            CreateTourLogPageComponent,
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
