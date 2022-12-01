import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AppService } from '../../../app/app.service';
import { Shift } from '../../../app/shift/shift';
import { Delivery } from '../../../app/delivery/delivery';

import { NotWorkingState } from '../notWorking/notWorking';

import * as moment from 'moment';

@Component({
  selector: 'state-viewingsummary',
  templateUrl: 'viewingSummary.html'
})
export class ViewingSummaryState {
  /**
   * Shift model referenced in the view.
   */
  public shift: Shift;

  /**
   * Formatted date of the shift.
   */
  public get shiftDate() {
    return moment(this.shift.date).format('MMMM D, YYYY');
  }

  /**
   * Calculates the amount that the driver should be taking home at the end of the shift.
   */
  public get takeHome() {
    let takeHome = 0;

    for (let delivery of this.shift.deliveries) {
      takeHome += delivery.tip + this.appService.settings.driverComp;
    }

    return takeHome;
  }

  /**
   * Average tip per delivery, not including driver comp.
   */
  public get averageTip() {
    let totalTip = 0;
    let averageTip = 0;

    if (this.shift.deliveries.length > 0) {
      for (let delivery of this.shift.deliveries) {
        totalTip += delivery.tip;
      }
      
      averageTip = totalTip / this.shift.deliveries.length;
    }
    
    return averageTip;
  }

  /**
   * Whether or not there are any deliveries on the shift yet.
   */
  public get anyDeliveries() {
    return this.shift.deliveries.length > 0;
  }
  
  /**
   * Default constructor.
   * @param navCtrl Injected NavController.
   * @param app Injected App.
   * @param appService Injected AppService.
   * @param formBuilder Injected FormBuilder.
   */
  public constructor(public navCtrl: NavController, private app: App, private appService: AppService) {
    // Get shift model from the app service
    this.shift = this.appService.currentShift;
  }

  /**
   * Finish viewing the summary and go back to Not Working.
   */
  public finishViewingSummary() {
    this.appService.archiveCurrentShift();
    this.navCtrl.setRoot(NotWorkingState);
  }
}
