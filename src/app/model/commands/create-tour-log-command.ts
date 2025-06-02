export interface CreateTourLogCommand {
    tourId: string;
    startTime: Date;
    endTime: Date;
    comment: string;
    difficulty: number;
    distance: number;
    rating: number;
}
