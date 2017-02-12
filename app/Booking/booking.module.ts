// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { BookingComponent } from './booking.component';
import { BookingCenterComponent } from './bookingCenter.component';
import { BookingService } from './booking.service';
import { SharedModule } from '../Shared/shared.module';
import { BookingRouting } from './booking.routes';

@NgModule({
    imports: [SharedModule,BookingRouting],
    declarations: [
        BookingCenterComponent,
        BookingComponent,
    ],
    providers : [BookingService ]
})
export class BookingModule {

}
