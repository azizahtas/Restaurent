import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user.component";
import {UserCenterComponent} from "./userCenter.component";

const UserRoutes: Routes = [
    {
        children: [
            { path: 'Booking', component: UserComponent },
            { path: '', redirectTo: "/Booking", pathMatch: 'full' }
        ],
        path: '',
        component: UserCenterComponent

    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(UserRoutes);