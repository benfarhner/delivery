import { Injectable } from '@angular/core';

/**
 * Singleton storage service used to retrieve data from local storage.
 */
@Injectable()
export class StorageService {
  /**
   * Singleton instance
   */
  private static _instance: StorageService;

  /**
   * Namespace for local storage items.
   */
  private readonly _namespace: string = 'Delivery';

  /**
   * Private constructor to enforce singleton.
   */
  private constructor() {}

  /**
   * Getter method for singleton instance.
   */
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * Gets the item with the given name within the app's namespace from local storage and parses it as JSON.
   * @param itemName String name of the item to fetch from local storage.
   */
  public load(itemName: string) {
    let key = this._namespace + '.' + itemName;
    let json = localStorage.getItem(key);
    
    if (typeof json !== 'undefined' && json !== null) {
      try {
        return JSON.parse(json);
      }
      catch (e) {
        console.log('Error parsing JSON from local storage under key ' + key + ': ' + e.message);
      }
    }

    return null;
  }

  /**
   * Serializes and saves the given object to local storage.
   * @param item Object to save to storage.
   * @param itemName String name to represent the object in local storage.
   */
  public save(itemName: string, item: any) {
    let key = this._namespace + '.' + itemName;
    let json = JSON.stringify(item);

    if (typeof json !== 'undefined' && json !== null) {
      try {
        localStorage.setItem(key, json);
      }
      catch (e) {
        console.log('Error saving data to local storage under key ' + key + ': ' + e.message);
      }
    }
  }
}
