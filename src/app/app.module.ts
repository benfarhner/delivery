import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';

import { Autofocuser } from './autofocuser.directive';
import { FmcAnnouncement } from './announcement/announcement.component';

import { AppService } from './app.service';

import { ShiftPage } from '../pages/shift/shift';
import { StatsPage } from '../pages/stats/stats';
import { SettingsPage } from '../pages/settings/settings';

import { TabsPage } from '../pages/tabs/tabs';

import { NotWorkingState } from '../pages/shift/notWorking/notWorking';
import { ClockingInState } from '../pages/shift/clockingIn/clockingIn';
import { WorkingState } from '../pages/shift/working/working';
import { EditingDeliveryState } from '../pages/shift/editingDelivery/editingDelivery';
import { EditingPaymentState } from '../pages/shift/editingPayment/editingPayment';
import { ClockingOutState } from '../pages/shift/clockingOut/clockingOut';
import { ViewingSummaryState } from '../pages/shift/viewingSummary/viewingSummary';

@NgModule({
  declarations: [
    MyApp,
    Autofocuser,
    FmcAnnouncement,
    ShiftPage,
    StatsPage,
    SettingsPage,
    TabsPage,
    NotWorkingState,
    ClockingInState,
    WorkingState,
    EditingDeliveryState,
    EditingPaymentState,
    ClockingOutState,
    ViewingSummaryState
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShiftPage,
    StatsPage,
    SettingsPage,
    TabsPage,
    NotWorkingState,
    ClockingInState,
    WorkingState,
    EditingDeliveryState,
    EditingPaymentState,
    ClockingOutState,
    ViewingSummaryState
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppService,
    StatusBar,
    SplashScreen,
    Keyboard
  ]
})
export class AppModule {}
