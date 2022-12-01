import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, ModalController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AppService } from '../../../app/app.service';
import { Shift } from '../../../app/shift/shift';
import { Delivery } from '../../../app/delivery/delivery';
import { Payment, PaymentMethod } from '../../../app/payment/payment';

import { WorkingState } from '../working/working';
import { EditingPaymentState } from '../editingPayment/editingPayment';

import * as moment from 'moment';

@Component({
  selector: 'state-editingDelivery',
  templateUrl: 'editingDelivery.html'
})
export class EditingDeliveryState {
  public workingState = WorkingState;
  public editingPaymentState = EditingPaymentState;

  public editingDeliveryForm: FormGroup;

  /**
   * Shift model referenced in the view.
   */
  public shift: Shift;

  /**
   * Delivery model referenced in the view.
   */
  public delivery: Delivery;

  /**
   * Whether or not the delivery being edited is a new delivery.
   */
  public isNew: boolean;

  /**
   * Formatted date of the shift.
   */
  public get shiftDate() {
    return moment(this.shift.date).format('MMMM D, YYYY');
  }

  /**
   * Whether or not there are any payments on this delivery yet.
   */
  public get anyPayments() {
    return this.delivery.payments.length > 0;
  }
  
  /**
   * Default constructor.
   * @param navCtrl Injected NavController.
   * @param app Injected App.
   * @param appService Injected AppService.
   * @param formBuilder Injected FormBuilder.
   */
  public constructor(
      public navCtrl: NavController,
      private navParams: NavParams,
      private modalCtrl: ModalController,
      private appService: AppService,
      private formBuilder: FormBuilder) {
    // Get shift model from the app service
    this.shift = this.appService.currentShift;

    // Get the delivery to edit
    this.delivery = this.navParams.get('delivery');

    if (this.delivery == null) {
      this.isNew = true;
      this.delivery = new Delivery();
    }

    // Set up form model
    this.editingDeliveryForm = this.formBuilder.group({
      'total': [this.delivery.total],
      'isCompOrder': [this.delivery.isCompOrder]
    });
  }

  /**
   * Save the delivery to the shift and go back to the Working state.
   */
  public saveDelivery() {
    // Assign values back to the delivery
    this.delivery.total = Number(this.editingDeliveryForm.get('total').value) || 0;
    this.delivery.isCompOrder = this.editingDeliveryForm.get('isCompOrder').value;

    if (this.isNew) {
      this.shift.deliveries.push(this.delivery);
    }
    
    this.appService.saveCurrentShift();
    this.navCtrl.pop();
  }

  /**
   * Edit the given payment.
   * @param payment Payment to edit.
   */
  public editPayment(payment: Payment) {
    // Create and display the edit payment view
    let editPaymentModal = this.modalCtrl.create(EditingPaymentState, { payment: payment });
    editPaymentModal.present();
  }

  /**
   * Delete the given payment from the delivery.
   * @param payment Payment to delete.
   */
  public deletePayment(payment: Payment) {
    let paymentIndex = this.delivery.payments.indexOf(payment);
    this.delivery.payments.splice(paymentIndex, 1);
    this.appService.saveCurrentShift();
  }

  /**
   * Add a new payment.
   */
  public addPayment() {
    // Calculate the default amount of the payment as the remaining balance on the order, or zero, whichever is greater
    let total = Number(this.editingDeliveryForm.get('total').value) || 0;
    let defaultAmount = Math.max(total - this.delivery.paid, 0);

    // Default first payment to a Credit Card, and subsequent payments to Cash
    let defaultPaymentMethod = PaymentMethod.CreditCard;

    if (this.delivery.payments.length > 0) {
      defaultPaymentMethod = PaymentMethod.Cash;
    }

    // Create the edit payment view
    let editPaymentModal = this.modalCtrl.create(EditingPaymentState, {
      payment: null,
      defaultAmount: defaultAmount,
      defaultPaymentMethod: defaultPaymentMethod
    });
    
    // Save payment upon edit payment view closing
    editPaymentModal.onDidDismiss(newPayment => {
      if (newPayment) {
        this.delivery.payments.push(newPayment);
        this.appService.saveCurrentShift();
      }
    });

    // Display the edit payment view
    editPaymentModal.present();
  }
}
