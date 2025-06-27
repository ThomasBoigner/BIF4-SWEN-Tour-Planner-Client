export interface UpdateTourLogCommand {
    startTime: Date;
    endTime: Date;
    comment: string;
    difficulty: number;
    distance: number;
    rating: number;
}
