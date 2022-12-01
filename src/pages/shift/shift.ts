import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AppService } from '../../app/app.service';

import { NotWorkingState } from './notWorking/notWorking';
import { WorkingState } from './working/working';

@Component({
  selector: 'page-shift',
  templateUrl: 'shift.html'
})
export class ShiftPage {
  // @ViewChild('shiftNav')
  // public shiftNav;

  // public notWorkingState: NotWorkingState;

  constructor(public navCtrl: NavController, private app: App, private appService: AppService) {
    // if (this.appService.currentShift !== null) {
    //   // Switch to working pane
    //   this.shiftNav.setRoot(WorkingState);
    // }
    //this.shiftNav.setRoot(NotWorkingState);
  }
}
