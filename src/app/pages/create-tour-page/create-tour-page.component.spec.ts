import { TourService } from '../../service/tour.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { CreateTourCommand } from '../../model/commands/create-tour-command';
import { CreateTourPageComponent } from './create-tour-page.component';

describe('CreateTourPageComponent', () => {
    beforeEach(() => {
        const spy = jasmine.createSpyObj<TourService>('TourService', ['createTour']);
        TestBed.configureTestingModule({
            providers: [{ provide: TourService, useValue: spy }, provideRouter(routes)],
        });
    });

    it('All fields should be bound correctly', () => {
        // Given
        const createTourCommand: CreateTourCommand = {
            name: 'Test name',
            description: 'Test description',
            from: {
                country: 'Test from country',
                city: 'Test from city',
                zipCode: 1,
                streetName: 'Test from street name',
                streetNumber: 'Test from street number',
            },
            to: {
                country: 'Test to country',
                city: 'Test to city',
                zipCode: 1,
                streetName: 'Test to street name',
                streetNumber: 'Test to street number',
            },
            transportType: 'HIKE',
        };

        // When
        const fixture: ComponentFixture<CreateTourPageComponent> =
            TestBed.createComponent(CreateTourPageComponent);

        fixture.detectChanges();

        const nativeElement = fixture.nativeElement as HTMLElement;
        const nameInput =
            nativeElement.querySelector<HTMLInputElement>('input#name') ?? new HTMLInputElement();
        const descriptionInput =
            nativeElement.querySelector<HTMLInputElement>('input#description') ??
            new HTMLInputElement();
        const fromStreetNameInput =
            nativeElement.querySelector<HTMLInputElement>('input#fromStreetName') ??
            new HTMLInputElement();
        const fromStreetNumberInput =
            nativeElement.querySelector<HTMLInputElement>('input#fromStreetNumber') ??
            new HTMLInputElement();
        const fromCityInput =
            nativeElement.querySelector<HTMLInputElement>('input#fromCity') ??
            new HTMLInputElement();
        const fromZipCodeInput =
            nativeElement.querySelector<HTMLInputElement>('input#fromZipCode') ??
            new HTMLInputElement();
        const fromCountryInput =
            nativeElement.querySelector<HTMLInputElement>('input#fromCountry') ??
            new HTMLInputElement();
        const toStreetNameInput =
            nativeElement.querySelector<HTMLInputElement>('input#toStreetName') ??
            new HTMLInputElement();
        const toStreetNumberInput =
            nativeElement.querySelector<HTMLInputElement>('input#toStreetNumber') ??
            new HTMLInputElement();
        const toCityInput =
            nativeElement.querySelector<HTMLInputElement>('input#toCity') ?? new HTMLInputElement();
        const toZipCodeInput =
            nativeElement.querySelector<HTMLInputElement>('input#toZipCode') ??
            new HTMLInputElement();
        const toCountryInput =
            nativeElement.querySelector<HTMLInputElement>('input#toCountry') ??
            new HTMLInputElement();
        const transportTypeInput =
            nativeElement.querySelector<HTMLSelectElement>('select') ?? new HTMLSelectElement();

        nameInput.value = createTourCommand.name;
        descriptionInput.value = createTourCommand.description;
        fromStreetNameInput.value = createTourCommand.from.streetName;
        fromStreetNumberInput.value = createTourCommand.from.streetNumber;
        fromCityInput.value = createTourCommand.from.city;
        fromZipCodeInput.value = String(createTourCommand.from.zipCode);
        fromCountryInput.value = createTourCommand.from.country;
        toStreetNameInput.value = createTourCommand.to.streetName;
        toStreetNumberInput.value = createTourCommand.to.streetNumber;
        toCityInput.value = createTourCommand.to.city;
        toZipCodeInput.value = String(createTourCommand.to.zipCode);
        toCountryInput.value = createTourCommand.to.country;
        transportTypeInput.value = transportTypeInput.options[1].value;

        nameInput.dispatchEvent(new Event('input'));
        descriptionInput.dispatchEvent(new Event('input'));
        fromStreetNameInput.dispatchEvent(new Event('input'));
        fromStreetNumberInput.dispatchEvent(new Event('input'));
        fromCityInput.dispatchEvent(new Event('input'));
        fromZipCodeInput.dispatchEvent(new Event('input'));
        fromCountryInput.dispatchEvent(new Event('input'));
        toStreetNameInput.dispatchEvent(new Event('input'));
        toStreetNumberInput.dispatchEvent(new Event('input'));
        toCityInput.dispatchEvent(new Event('input'));
        toZipCodeInput.dispatchEvent(new Event('input'));
        toCountryInput.dispatchEvent(new Event('input'));
        transportTypeInput.dispatchEvent(new Event('change'));

        // Then
        expect(fixture.componentInstance).toBeDefined();
        expect(fixture.componentInstance.tourForm.value.name).toEqual(createTourCommand.name);
        expect(fixture.componentInstance.tourForm.value.description).toEqual(
            createTourCommand.description,
        );
        expect(fixture.componentInstance.tourForm.value.fromStreetName).toEqual(
            createTourCommand.from.streetName,
        );
        expect(fixture.componentInstance.tourForm.value.fromStreetNumber).toEqual(
            createTourCommand.from.streetNumber,
        );
        expect(fixture.componentInstance.tourForm.value.fromCity).toEqual(
            createTourCommand.from.city,
        );
        expect(String(fixture.componentInstance.tourForm.value.fromZipCode)).toEqual(
            String(createTourCommand.from.zipCode),
        );
        expect(fixture.componentInstance.tourForm.value.fromCountry).toEqual(
            createTourCommand.from.country,
        );
        expect(fixture.componentInstance.tourForm.value.toStreetName).toEqual(
            createTourCommand.to.streetName,
        );
        expect(fixture.componentInstance.tourForm.value.toStreetNumber).toEqual(
            createTourCommand.to.streetNumber,
        );
        expect(fixture.componentInstance.tourForm.value.toCity).toEqual(createTourCommand.to.city);
        expect(String(fixture.componentInstance.tourForm.value.toZipCode)).toEqual(
            String(createTourCommand.to.zipCode),
        );
        expect(fixture.componentInstance.tourForm.value.toCountry).toEqual(
            createTourCommand.to.country,
        );
        expect(fixture.componentInstance.tourForm.value.transportType).toEqual(
            createTourCommand.transportType,
        );
    });
});
