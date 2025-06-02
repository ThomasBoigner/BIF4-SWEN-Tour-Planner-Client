import { Component } from '@angular/core';
import { TourLogService } from '../../service/tour-log.service';
import { CreateTourLogCommand } from '../../model/commands/create-tour-log-command';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../model/exception/error-response';

@Component({
    selector: 'create-tour-log-page',
    templateUrl: './create-tour-log-page.component.html',
    styleUrls: ['./create-tour-log-page.component.css'],
    imports: [RouterLink, ReactiveFormsModule],
})
export class CreateTourLogPageComponent {
    errorMessage = '';

    tourLogForm = new FormGroup({
        tourId: new FormControl<string>('', { nonNullable: true }),
        startTime: new FormControl<string>('', { nonNullable: true }), // ISO string or datetime-local input
        endTime: new FormControl<string>('', { nonNullable: true }),
        comment: new FormControl<string>('', { nonNullable: true }),
        difficulty: new FormControl<number>(1, { nonNullable: true }),
        distance: new FormControl<number>(0, { nonNullable: true }),
        rating: new FormControl<number>(1, { nonNullable: true }),
    });

    constructor(
        private tourLogService: TourLogService,
        private router: Router,
    ) {}

    handleSubmit() {
        const command: CreateTourLogCommand = {
            tourId: this.tourLogForm.controls.tourId.value,
            startTime: new Date(this.tourLogForm.controls.startTime.value),
            endTime: new Date(this.tourLogForm.controls.endTime.value),
            comment: this.tourLogForm.controls.comment.value,
            difficulty: this.tourLogForm.controls.difficulty.value,
            distance: this.tourLogForm.controls.distance.value,
            rating: this.tourLogForm.controls.rating.value,
        };

        this.tourLogService.createTourLog(command).subscribe({
            complete: () => void this.router.navigate(['/']),
            error: (error: HttpErrorResponse) => {
                this.errorMessage = (error.error as ErrorResponse).message;
            },
        });
    }
}
