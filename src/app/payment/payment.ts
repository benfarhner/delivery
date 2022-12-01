/**
 * Enumeration of possible payment methods.
 */
export enum PaymentMethod {
  CreditCard = 1,
  Cash = 2,
  Check = 3
}

/**
 * Model representing a payment made on a delivery.
 */
export class Payment {
  /**
   * Amount paid.
   */
  public amount: number;

  /**
   * Nicely formatted amount.
   */
  public get amountString(): string {
    return '$' + this.amount.toFixed(2);
  }

  /**
   * Payment method.
   */
  public method: any;

  /**
   * Icon name for the payment method.
   */
  public get methodIcon(): string {
    switch (this.method) {
      case PaymentMethod.CreditCard:
        return 'md-card';
      case PaymentMethod.Cash:
        return 'md-cash';
      case PaymentMethod.Check:
        return 'md-checkbox';
    }
  } 

  /**
   * Default constructor, takes optional DTO to hydrate the model.
   * @param dto Optional data transfer object used to hydrate the model.
   */
  public constructor(dto?: any) {
    this.amount = 0;
    this.method = PaymentMethod.CreditCard;

    // Hydrate model from DTO, if given
    if (typeof dto !== 'undefined' && dto !== null) {
      this.amount = dto.amount || 0;
      this.method = dto.method || this.method;
    }
  }
}
