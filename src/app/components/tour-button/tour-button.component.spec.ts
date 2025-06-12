import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourButtonComponent } from './tour-button.component';

describe('TourButtonComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('Text should be displayed and color should be set', () => {
        // Given
        const text = 'hello world';

        // When
        const fixture: ComponentFixture<TourButtonComponent> =
            TestBed.createComponent(TourButtonComponent);

        fixture.componentRef.setInput('text', text);
        fixture.componentRef.setInput('color', 'primary');
        fixture.detectChanges();

        // Then
        const nativeElement = fixture.nativeElement as HTMLElement;
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(text);
        expect(nativeElement.querySelector('button')?.classList).toContain('primary');
    });
});
