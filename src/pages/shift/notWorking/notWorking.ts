import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { ClockingInState } from '../clockingIn/clockingIn';

@Component({
  selector: 'state-notworking',
  templateUrl: 'notWorking.html'
})
export class NotWorkingState {  
  public constructor(public navCtrl: NavController, private app: App) {}

  /**
   * Starts a new shift.
   */
  public startShift() {
    this.navCtrl.setRoot(ClockingInState, null, { animation: 'md-transition' });
  }
}
