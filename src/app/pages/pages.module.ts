import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ChartsModule } from 'ng2-charts';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Temp
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficaDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    imports: [ 
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
     ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    providers: [],
})
export class PagesModule {}