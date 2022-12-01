import { Delivery } from '../delivery/delivery';

/**
 * Model representing a shift.
 */
export class Shift {
  /**
   * Date of this shift.
   */
  public date: any;

  /**
   * Odometer reading at the start of this shift.
   */
  public odometerStart: number;

  /**
   * Odometer reading at the end of this shift.
   */
  public odometerEnd: number;

  /**
   * Time clocked into this shift.
   */
  public clockedIn: any;

  /**
   * Time clocked out of this shift.
   */
  public clockedOut: any;

  /**
   * List of deliveries for this shift.
   */
  public deliveries: Array<Delivery>;

  /**
   * Default constructor.
   */
  public constructor(dto?: any) {
    // By default, shift date is today
    this.date = new Date();
    this.odometerStart = 0;
    this.odometerEnd = 0;
    this.clockedIn = new Date();
    this.clockedOut = new Date();
    this.deliveries = [];

    // Hydrate this model from the DTO, if given
    if (typeof dto !== 'undefined' && dto !== null) {
      this.date = dto.date || this.date;
      this.odometerStart = dto.odometerStart || 0;
      this.odometerEnd = dto.odometerEnd || 0;
      this.clockedIn = dto.clockedIn || null;
      this.clockedOut = dto.clockedOut || null;

      // Hydrate each delivery in the shift
      if (dto.deliveries) {
        for (let deliveryDto of dto.deliveries) {
          this.deliveries.push(new Delivery(deliveryDto));
        }
      }
    }
  }
}
