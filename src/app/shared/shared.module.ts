import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';

// Pipe
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent,
    ],
    providers: [],
})
export class SharedModule {}