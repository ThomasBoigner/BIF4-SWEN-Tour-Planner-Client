import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TourLogService } from '../../service/tour-log.service';
import { DateInputComponent } from '../../components/date-input/date-input.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { TourButtonComponent } from '../../components/tour-button/tour-button.component';

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
    }
}