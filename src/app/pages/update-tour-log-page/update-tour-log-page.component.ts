import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TourLogService } from '../../service/tour-log.service';
import { DateInputComponent } from '../../components/date-input/date-input.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../model/exception/error-response';
import { UpdateTourLogCommand } from '../../model/commands/update-tour-log-command';
import { TourLog } from '../../model/tour-log';

@Component({
    selector: 'update-tour-log-page',
    templateUrl: './update-tour-log-page.component.html',
    styleUrls: ['./update-tour-log-page.component.css'],
    imports: [
        NgOptimizedImage,
        RouterLink,
        ErrorMessageComponent,
        ReactiveFormsModule,
        DateInputComponent,
        TextInputComponent,
        TourButtonComponent,
    ],
})
export class UpdateTourLogPageComponent {
    errorMessage = '';

    tourLogId: string;
    tourLog: TourLog | undefined;
    tourLogForm = new FormGroup({
        startTime: new FormControl<string>('', { nonNullable: true }), // ISO string or datetime-local input
        endTime: new FormControl<string>('', { nonNullable: true }),
        comment: new FormControl<string>('', { nonNullable: true }),
        difficulty: new FormControl<number>(1, { nonNullable: true }),
        distance: new FormControl<number>(0, { nonNullable: true }),
        rating: new FormControl<number>(1, { nonNullable: true }),
    });

    constructor(
        private tourLogService: TourLogService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.tourLogId = this.route.snapshot.paramMap.get('id') ?? '';
        this.tourLogService.getTourLog(this.tourLogId).subscribe((tourLog) => {
            this.tourLog = tourLog;
            this.tourLogForm = new FormGroup({
                startTime: new FormControl<string>(tourLog.duration.startTime, {
                    nonNullable: true,
                }), // ISO string or datetime-local input
                endTime: new FormControl<string>(tourLog.duration.endTime, { nonNullable: true }),
                comment: new FormControl<string>(tourLog.comment, { nonNullable: true }),
                difficulty: new FormControl<number>(tourLog.difficulty, { nonNullable: true }),
                distance: new FormControl<number>(tourLog.distance, { nonNullable: true }),
                rating: new FormControl<number>(tourLog.rating, { nonNullable: true }),
            });
        });
    }

    handleSubmit() {
        const command: UpdateTourLogCommand = {
            startTime: new Date(this.tourLogForm.controls.startTime.value),
            endTime: new Date(this.tourLogForm.controls.endTime.value),
            comment: this.tourLogForm.controls.comment.value,
            difficulty: this.tourLogForm.controls.difficulty.value,
            distance: this.tourLogForm.controls.distance.value,
            rating: this.tourLogForm.controls.rating.value,
        };

        this.tourLogService.updateTourLog(this.tourLogId, command).subscribe({
            complete: () =>
                void this.router.navigate([
                    this.tourLog ? `tour/detail/${this.tourLog.tourId}` : '/',
                ]),
            error: (error: HttpErrorResponse) => {
                this.errorMessage = (error.error as ErrorResponse).message;
            },
        });
    }
}
