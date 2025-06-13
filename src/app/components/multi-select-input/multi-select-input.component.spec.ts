import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MultiSelectInput } from './multi-select-input.component';

describe('MultiSelectInputComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('Should bind passed in form group', () => {
        // Given
        const options = [{ id: 1, label: 'Test', value: 'TEST' }];
        const label = 'Message';
        const formGroup = new FormGroup({
            value: new FormControl<string>(''),
        });

        // When
        const fixture: ComponentFixture<MultiSelectInput> =
            TestBed.createComponent(MultiSelectInput);

        fixture.componentRef.setInput('label', label);
        fixture.componentRef.setInput('formGroup', formGroup);
        fixture.componentRef.setInput('controlName', 'value');
        fixture.componentRef.setInput('options', options);
        fixture.detectChanges();

        const nativeElement = fixture.nativeElement as HTMLElement;
        const select = nativeElement.querySelector('select') ?? new HTMLSelectElement();

        select.value = select.options[0].value;
        select.dispatchEvent(new Event('change'))
        fixture.detectChanges();

        // Then
        expect(fixture.componentInstance).toBeDefined();
        expect(nativeElement.textContent).toContain(label)
        const formObject = fixture.componentInstance.formGroup().value as {value: string};
        expect(formObject.value).toEqual('TEST');
    });
});
