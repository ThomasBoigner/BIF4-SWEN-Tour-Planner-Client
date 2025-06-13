import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('Should bind to passed in form group', () => {
        // Given
        const date = '2024-12-31T23:00';
        const label = 'hello world';
        const formGroup = new FormGroup({
            date: new FormControl<string>(''),
        });

        // When
        const fixture: ComponentFixture<DateInputComponent> =
            TestBed.createComponent(DateInputComponent);

        fixture.componentRef.setInput('label', label);
        fixture.componentRef.setInput('formGroup', formGroup);
        fixture.componentRef.setInput('controlName', 'date');
        fixture.detectChanges();

        const nativeElement = fixture.nativeElement as HTMLElement;
        const input = nativeElement.querySelector('input') ?? new HTMLInputElement();

        input.value = date;
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Then
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(label);
        const formObject = fixture.componentInstance.formGroup().value as { date: string };
        expect(formObject.date).toEqual(date);
    });
});
