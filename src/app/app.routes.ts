import { Routes } from '@angular/router';
import { ToursListPageComponent } from './pages/tours-list-page/tours-list-page.component';
import { TourDetailsPageComponent } from './pages/tour-details-page/tour-details-page.component';
import { CreateTourPageComponent } from './pages/create-tour-page/create-tour-page.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Tours list page',
        component: ToursListPageComponent,
    },
    {
        path: 'tour/detail/:id',
        title: 'Tour details page',
        component: TourDetailsPageComponent,
    },
    {
        path: 'tour/new',
        title: 'Create a new tour',
        component: CreateTourPageComponent,
    },
];
