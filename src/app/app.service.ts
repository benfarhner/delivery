import { Injectable } from '@angular/core';

import { ShiftService } from './shift/shift.service';
import { SettingsService } from './settings/settings.service';

import { Shift } from './shift/shift';
import { Settings } from './settings/settings';

@Injectable()
export class AppService {

  /**
   * Private constructor to enforce singleton.
   */
  public constructor() {}

  public get currentShift(): Shift {
    return ShiftService.instance.currentShift;
  }

  public saveCurrentShift(): void {
    ShiftService.instance.saveCurrentShift();
  }
  
  /**
   * Saves the current shift as a historical shift, and then clears out the current shift.
   */
  public archiveCurrentShift(): void {
    if (ShiftService.instance.currentShift !== null) {
      ShiftService.instance.addHistoricalShift(ShiftService.instance.currentShift);
      ShiftService.instance.currentShift = null;
    }
  }

  public get historicalShifts(): Array<Shift> {
    return ShiftService.instance.historicalShifts;
  }

  public get settings(): Settings {
    return SettingsService.instance.settings;
  }

  public saveSettings(): void {
    SettingsService.instance.saveSettings();
  }
}
