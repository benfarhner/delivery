import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { Settings } from './settings';

/**
 * Service to retrieve application settings from storage.
 */
@Injectable()
export class SettingsService {
  /**
   * Storage key to retrieve settings.
   */
  private readonly _settingsStorageKey: string = 'Settings';

  /**
   * Singleton instance.
   */
  private static _instance: SettingsService;
  
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * Settings instance from storage.
   */
  private _settings: Settings;

  public get settings() {
    return this._settings || (this._settings = this.loadSettings());
  }

  public set settings(newSettings: Settings) {
    this._settings = newSettings;
    this.saveSettings();
  }
  
  /**
   * Private constructor to enforce singleton.
   */
  private constructor() {}

  /**
   * Get settings from storage.
   */
  private loadSettings() {
    let dto = StorageService.instance.load(this._settingsStorageKey);
    return new Settings(dto);
  }

  /**
   * Save settings to storage.
   */
  public saveSettings(): void {
    StorageService.instance.save(this._settingsStorageKey, this._settings);
  }
}
