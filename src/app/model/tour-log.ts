import { Duration } from './duration';

export interface TourLog {
    id: string;
    tourId: string;
    duration: Duration;
    comment: string;
    difficulty: number;
    distance: number;
    rating: number;
}
