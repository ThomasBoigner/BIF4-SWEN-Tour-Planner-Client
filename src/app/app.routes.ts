import { Routes } from '@angular/router';
import { ToursListPageComponent } from './pages/tours-list-page/tours-list-page.component';
import { TourDetailsPageComponent } from './pages/tour-details-page/tour-details-page.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Tours list page',
        component: ToursListPageComponent,
    },
    {
        path: 'tour/:id',
        title: 'Tours details page',
        component: TourDetailsPageComponent,
    }
];
