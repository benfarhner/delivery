import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import { Shift } from './shift';

/**
 * Service to retrieve shift data from storage.
 */
@Injectable()
export class ShiftService {
  /**
   * Storage keys to retrieve shift data.
   */
  private readonly _currentShiftStorageKey: string = 'CurrentShift';
  private readonly _historicalShiftsStorageKey: string = 'HistoricalShifts';

  /**
   * Singleton instance.
   */
  private static _instance: ShiftService;

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * Current shift instance from storage.
   */
  private _currentShift: Shift;

  public get currentShift() {
    return this._currentShift || (this._currentShift = this.loadCurrentShift());
  }

  public set currentShift(newShift: Shift) {
    this._currentShift = newShift;
    this.saveCurrentShift();
  }

  /**
   * List of historical shifts from storage.
   */
  private _historicalShifts: Array<Shift>;

  public get historicalShifts() {
    return this._historicalShifts || (this._historicalShifts = this.loadHistoricalShifts());
  }
  
  /**
   * Private constructor to enforce singleton.
   */
  private constructor() {}

  /**
   * Adds the given shift to the list of historical shifts.
   * @param historicalShift Shift model to add to the historical shifts.
   */
  public addHistoricalShift(historicalShift: Shift): void {
    if (!this._historicalShifts) {
      this._historicalShifts = this.loadHistoricalShifts();
    }

    this._historicalShifts.push(historicalShift);
    this.saveHistoricalShifts();
  }

  /**
   * Get the current shift from storage.
   */
  private loadCurrentShift(): Shift {
    let dto = StorageService.instance.load(this._currentShiftStorageKey);

    if (dto !== null) {
      return new Shift(dto);
    }

    return null;
  }

  /**
   * Saves the current shift to storage.
   */
  public saveCurrentShift(): void {
    StorageService.instance.save(this._currentShiftStorageKey, this._currentShift);
  }

  /**
   * Gets all historical shifts from storage.
   */
  private loadHistoricalShifts(): Array<Shift> {
    let dtos = StorageService.instance.load(this._historicalShiftsStorageKey);

    if (dtos !== null) {
      let shifts = [];

      for (let dto of dtos) {
        shifts.push(new Shift(dto));
      }
    }

    return [];
  }

  /**
   * Saves list of historical shifts to storage.
   */
  private saveHistoricalShifts(): void {
    StorageService.instance.save(this._historicalShiftsStorageKey, this._historicalShifts);
  }
}
