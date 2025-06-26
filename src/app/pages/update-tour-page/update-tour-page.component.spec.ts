import { TourService } from '../../service/tour.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { UpdateTourCommand } from '../../model/commands/update-tour-command';
import { UpdateTourPageComponent } from './update-tour-page.component';
import { Tour } from '../../model/tour';
import { of } from 'rxjs';

describe('UpdateTourPageComponent', () => {
    let tourService: jasmine.SpyObj<TourService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj<TourService>('TourService', ['getTour']);
        TestBed.configureTestingModule({
            providers: [{ provide: TourService, useValue: spy }, provideRouter(routes)],
        });
        tourService = TestBed.inject(TourService) as jasmine.SpyObj<TourService>;
    });

    it('All fields should be bound correctly', () => {
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
        };

        tourService.getTour.and.returnValue(of(tour));

        const updateTourCommand: UpdateTourCommand = {
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
        const fixture: ComponentFixture<UpdateTourPageComponent> =
            TestBed.createComponent(UpdateTourPageComponent);

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

        nameInput.value = updateTourCommand.name;
        descriptionInput.value = updateTourCommand.description;
        fromStreetNameInput.value = updateTourCommand.from.streetName;
        fromStreetNumberInput.value = updateTourCommand.from.streetNumber;
        fromCityInput.value = updateTourCommand.from.city;
        fromZipCodeInput.value = String(updateTourCommand.from.zipCode);
        fromCountryInput.value = updateTourCommand.from.country;
        toStreetNameInput.value = updateTourCommand.to.streetName;
        toStreetNumberInput.value = updateTourCommand.to.streetNumber;
        toCityInput.value = updateTourCommand.to.city;
        toZipCodeInput.value = String(updateTourCommand.to.zipCode);
        toCountryInput.value = updateTourCommand.to.country;
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
        expect(fixture.componentInstance.tourForm.value.name).toEqual(updateTourCommand.name);
        expect(fixture.componentInstance.tourForm.value.description).toEqual(
            updateTourCommand.description,
        );
        expect(fixture.componentInstance.tourForm.value.fromStreetName).toEqual(
            updateTourCommand.from.streetName,
        );
        expect(fixture.componentInstance.tourForm.value.fromStreetNumber).toEqual(
            updateTourCommand.from.streetNumber,
        );
        expect(fixture.componentInstance.tourForm.value.fromCity).toEqual(
            updateTourCommand.from.city,
        );
        expect(String(fixture.componentInstance.tourForm.value.fromZipCode)).toEqual(
            String(updateTourCommand.from.zipCode),
        );
        expect(fixture.componentInstance.tourForm.value.fromCountry).toEqual(
            updateTourCommand.from.country,
        );
        expect(fixture.componentInstance.tourForm.value.toStreetName).toEqual(
            updateTourCommand.to.streetName,
        );
        expect(fixture.componentInstance.tourForm.value.toStreetNumber).toEqual(
            updateTourCommand.to.streetNumber,
        );
        expect(fixture.componentInstance.tourForm.value.toCity).toEqual(updateTourCommand.to.city);
        expect(String(fixture.componentInstance.tourForm.value.toZipCode)).toEqual(
            String(updateTourCommand.to.zipCode),
        );
        expect(fixture.componentInstance.tourForm.value.toCountry).toEqual(
            updateTourCommand.to.country,
        );
        expect(fixture.componentInstance.tourForm.value.transportType).toEqual(
            updateTourCommand.transportType,
        );
    });
});
