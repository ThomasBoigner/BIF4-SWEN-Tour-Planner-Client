import { Tour } from './tour';
import { Duration } from './duration';
import { Difficulty } from './difficulty';
import { Rating } from './rating';

export interface TourLog {
    id: string,
    tour: Tour,
    duration: Duration,
    comment: string,
    difficulty: Difficulty,
    distance: number,
    rating: Rating
}