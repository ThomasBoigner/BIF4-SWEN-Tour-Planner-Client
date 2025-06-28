import { KilometerPipe } from './kilometer-pipe';

describe('KilometerPipe', () => {
    const kilometerPipe = new KilometerPipe();

    it('KilometerPipe should transform 1000 to 1 ', () => {
        // Given
        const meters = 1000;

        // When
        const kilometer = kilometerPipe.transform(meters);

        // Then
        expect(kilometer).toEqual(1);
    });
});
