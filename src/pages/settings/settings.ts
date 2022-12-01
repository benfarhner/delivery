import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { AppService } from '../../app/app.service';
import { Settings } from '../../app/settings/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  /**
   * Settings model referenced in the view.
   */
  public settings: Settings;

  public settingsForm: FormGroup;

  constructor(public navCtrl: NavController, private appService: AppService, private formBuilder: FormBuilder) {
    // Get settings model from the app service
    this.settings = this.appService.settings;

    // Set up form model
    this.settingsForm = this.formBuilder.group({
      'driverComp': [this.settings.driverComp],
      'driverBank': [this.settings.driverBank]
    })

    // Listen for changes to the form
    this.settingsForm.valueChanges.subscribe(x => this.appService.saveSettings());
  }
}
