import { Component } from '@angular/core';
import { TourLogService } from '../../service/tour-log.service';
import { CreateTourLogCommand } from '../../model/commands/create-tour-log-command';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../model/exception/error-response';
import { NgOptimizedImage } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';
import { DateInputComponent } from '../../components/date-input/date-input.component';

@Component({
    selector: 'create-tour-log-page',
    templateUrl: './create-tour-log-page.component.html',
    styleUrls: ['./create-tour-log-page.component.css'],
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgOptimizedImage,
        ErrorMessageComponent,
        TextInputComponent,
        TourButtonComponent,
        DateInputComponent,
    ],
})
export class CreateTourLogPageComponent {
    errorMessage = '';
    tourId: string;

    tourLogForm = new FormGroup({
        startTime: new FormControl<Date>(new Date(), { nonNullable: true }), // ISO string or datetime-local input
        endTime: new FormControl<Date>(new Date(), { nonNullable: true }),
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
        this.tourId = this.route.snapshot.paramMap.get('id') ?? '';
    }

    handleSubmit() {
        const command: CreateTourLogCommand = {
            tourId: this.tourId,
            startTime: this.tourLogForm.controls.startTime.value,
            endTime: this.tourLogForm.controls.endTime.value,
            comment: this.tourLogForm.controls.comment.value,
            difficulty: this.tourLogForm.controls.difficulty.value,
            distance: this.tourLogForm.controls.distance.value,
            rating: this.tourLogForm.controls.rating.value,
        };

        this.tourLogService.createTourLog(command).subscribe({
            complete: () => void this.router.navigate([`/tour/detail/${this.tourId}`]),
            error: (error: HttpErrorResponse) => {
                this.errorMessage = (error.error as ErrorResponse).message;
            },
        });
    }
}
