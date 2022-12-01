import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AppService } from '../../../app/app.service';
import { Shift } from '../../../app/shift/shift';

import { WorkingState } from '../working/working';

import * as moment from 'moment';

@Component({
  selector: 'state-clockingin',
  templateUrl: 'clockingIn.html'
})
export class ClockingInState {
  /**
   * Shift model referenced in the view.
   */
  public shift: Shift;

  /**
   * Form model used in the view.
   */
  public clockingInForm: FormGroup;

  /**
   * The shift date in human-readable format.
   */
  public get shiftDate() {
    return moment(this.shift.date).format('MMMM D, YYYY');
  }
  
  /**
   * Default constructor.
   * @param navCtrl Injected NavController
   * @param app Injected App
   * @param appService Injected AppService
   * @param formBuilder Injected FormBuilder
   */
  public constructor(public navCtrl: NavController, private app: App, private appService: AppService, private formBuilder: FormBuilder) {
    // Get shift model from the app service
    this.shift = this.appService.currentShift;
    
    // Set up form model
    this.clockingInForm = this.formBuilder.group({
      'clockedIn': moment(this.shift.clockedIn).format('h:mm a'),
      'odometerStart': this.shift.odometerStart
    });

    // Listen for changes to the form
    this.clockingInForm.valueChanges.subscribe(x => this.appService.saveCurrentShift());
  }

  /**
   * Saves clock-in values to the shift and moves to the Working state.
   */
  public finishClockingIn() {
    this.shift.clockedIn = moment(this.clockingInForm.get('clockedIn').value).format('h:mm a');
    this.shift.odometerStart = Number(this.clockingInForm.get('odometerStart').value);
    this.appService.saveCurrentShift();
    this.navCtrl.push(WorkingState);
  }
}
