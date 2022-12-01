import { Component } from '@angular/core';

import { ShiftPage } from '../shift/shift';
import { StatsPage } from '../stats/stats';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public shiftRoot: any = ShiftPage;
  public statsRoot: any = StatsPage;
  public settingsRoot: any = SettingsPage;

  public constructor() {}
}
