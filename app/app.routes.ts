
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

const itemRoutes: Routes = [
    { path: 'Item', loadChildren: 'app/Item/item.module#ItemModule' },
];

const companyRoutes: Routes = [
    { path: 'Company', loadChildren: 'app/Company/company.module#CompanyModule' },
];

const stockRoutes: Routes = [
    { path: 'Stock', loadChildren: 'app/Stock/stock.module#StockModule' },
];

const dashboardRoutes: Routes = [
    { path: 'DashboardCenter', loadChildren: 'app/Dashboard/dashboard.module#DashboardModule' },
    { path: '', redirectTo: "/DashboardCenter", pathMatch: 'full' }
];



export const routes : Routes = [
    ...itemRoutes,
    ...stockRoutes,
    ...companyRoutes,
    ...dashboardRoutes
];

export const appRoutingProviders:any[] = [

];

export const appRoutes:ModuleWithProviders = RouterModule.forRoot(routes);