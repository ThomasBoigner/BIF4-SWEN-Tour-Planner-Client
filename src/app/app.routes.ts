import { Routes } from '@angular/router';
import { ToursListPageComponent } from './pages/tours-list-page/tours-list-page.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Tours list page',
        component: ToursListPageComponent,
    },
];
