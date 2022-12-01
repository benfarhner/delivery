/**
 * Model representing application settings.
 */
export class Settings {
  /**
   * Compensation the driver receives per delivery.
   */
  public driverComp: number;

  /**
   * Bank that the driver receives at the beginning of the shift.
   */
  public driverBank: number;

  /**
   * Default constructor, takes optional DTO to hydrate the model.
   * @param dto Optional data transfer object used to hydrate the model.
   */
  public constructor(dto?: any) {
    this.driverComp = 0;
    this.driverBank = 0;

    // Hydrate model from DTO, if given
    if (typeof dto !== 'undefined' && dto !== null) {
      this.driverComp = dto.driverComp || 0;
      this.driverBank = dto.driverBank || 0;
    }
  }
}
