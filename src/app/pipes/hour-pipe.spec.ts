import { HourPipe } from './hour-pipe';

describe('HourPipe', () => {
    const hourPipe = new HourPipe();

    it('HourPipe should transform 3600 to 1', () => {
        // Given
        const seconds = 3600;

        // When
        const hours = hourPipe.transform(seconds);

        // Then
        expect(hours).toEqual(1);
    });
});
