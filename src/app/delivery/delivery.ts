import { Payment, PaymentMethod } from '../payment/payment';

/**
 * Model representing a delivery order.
 */
export class Delivery {
  /**
   * Order total charge.
   */
  public total: number;

  /**
   * Whether or not this order has been comped.
   */
  public isCompOrder: boolean;
  
  /**
   * List of payment for this delivery.
   */
  public payments: Array<Payment>;

  /**
   * Calculated total amount paid on this delivery.
   */
  public get paid() {
    let totalPaid = 0;

    for (let payment of this.payments) {
      totalPaid += payment.amount;
    }

    return totalPaid;
  }

  /**
   * Calculated tip on the delivery.
   */
  public get tip() {
    return this.paid - this.total;
  }

  /**
   * Default constructor, takes optional DTO to hydrate the model.
   * @param dto Optional data transfer object used to hydrate the model.
   */
  public constructor(dto?: any) {
    this.total = 0;
    this.isCompOrder = false;
    this.payments = new Array<Payment>();

    // Hydrate model from DTO, if given
    if (typeof dto !== 'undefined' && dto !== null) {
      this.total = dto.total || 0;
      this.isCompOrder = dto.isCompOrder || false;
      this.payments = [];

      // Hydrate each payment on the delivery
      if (dto.payments) {
        for (let paymentDto of dto.payments) {
          this.payments.push(new Payment(paymentDto));
        }
      }
    }
  }
}
