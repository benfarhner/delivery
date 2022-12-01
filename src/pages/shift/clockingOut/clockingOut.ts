import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AppService } from '../../../app/app.service';
import { Shift } from '../../../app/shift/shift';

import { ViewingSummaryState } from '../viewingSummary/viewingSummary';

import * as moment from 'moment';

@Component({
  selector: 'state-clockingOut',
  templateUrl: 'clockingOut.html'
})
export class ClockingOutState {
  /**
   * Shift model referenced in the view.
   */
  public shift: Shift;

  /**
   * Model of the form on this view.
   */
  public clockingOutForm: FormGroup;

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
  public constructor(public navCtrl: NavController, private app: App, private appService: AppService, private formBuilder: FormBuilder) {
    // Get shift model from the app service
    this.shift = this.appService.currentShift;

    // Set up form model
    this.clockingOutForm = this.formBuilder.group({
      'actualTips': 0,
      'clockedIn': moment(this.shift.clockedIn).format('h:mm a'),
      'clockedOut': moment(this.shift.clockedOut).format('h:mm a'),
      'odometerStart': this.shift.odometerStart,
      'odometerEnd': this.shift.odometerEnd
    });
  }

  /**
   * Finish clocking out and move to the Viewing Summary state.
   */
  public finishClockingOut() {
    // Capture values from the form into the current shift
    this.shift.clockedIn = moment(this.clockingOutForm.get('clockedIn').value).format('h:mm a');
    this.shift.clockedOut = moment(this.clockingOutForm.get('clockedOut').value).format('h:mm a');
    this.shift.odometerStart = Number(this.clockingOutForm.get('odometerStart').value) || 0;
    this.shift.odometerEnd = Number(this.clockingOutForm.get('odometerEnd').value) || 0;

    // Save the shift
    this.appService.saveCurrentShift();

    // Move to the Viewing Summary state
    this.navCtrl.push(ViewingSummaryState);
  }
}
