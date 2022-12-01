import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';

import { AppService } from '../../../app/app.service';
import { Shift } from '../../../app/shift/shift';
import { Delivery } from '../../../app/delivery/delivery';
import { Payment, PaymentMethod } from '../../../app/payment/payment';

import { WorkingState } from '../working/working';
import { EditingDeliveryState } from '../editingDelivery/editingDelivery';

import * as moment from 'moment';

@Component({
  selector: 'state-editingPayment',
  templateUrl: 'editingPayment.html'
})
export class EditingPaymentState {
  public editingPaymentState = EditingPaymentState;

  public editingPaymentForm: FormGroup;

  /**
   * Payment model referenced in the view.
   */
  public payment: Payment;

  /**
   * Whether or not the payment being edited is a new payment.
   */
  public isNew: boolean;
  
  /**
   * Default constructor.
   * @param navCtrl Injected NavController.
   * @param app Injected App.
   * @param appService Injected AppService.
   * @param formBuilder Injected FormBuilder.
   */
  public constructor(
      private viewCtrl: ViewController,
      private navParams: NavParams,
      private modalCtrl: ModalController,
      private appService: AppService,
      private formBuilder: FormBuilder) {
    // Get the default amount of the payment
    let defaultAmount = this.navParams.get('defaultAmount') || 0;

    // Get the default payment method
    let defaultPaymentMethod = this.navParams.get('defaultPaymentMethod') || PaymentMethod.CreditCard;

    // Get the payment to edit
    this.payment = this.navParams.get('payment');

    if (this.payment == null) {
      this.isNew = true;
      this.payment = new Payment();
      this.payment.amount = defaultAmount;
      this.payment.method = defaultPaymentMethod;
    }

    // Set up form model
    this.editingPaymentForm = this.formBuilder.group({
      'amount': [this.payment.amount, Validators.required],
      'method': [this.payment.method, Validators.required]
    });
  }

  /**
   * Save the payment to the delivery and go back to the Editing Delivery state.
   */
  public savePayment() {
    // Assign values back to the delivery
    this.payment.amount = Number(this.editingPaymentForm.get('amount').value) || 0;
    this.payment.method = Number(this.editingPaymentForm.get('method').value) || PaymentMethod.CreditCard;;

    if (this.isNew) {
      this.viewCtrl.dismiss(this.payment);
    }
    else {
      this.appService.saveCurrentShift();
      this.viewCtrl.dismiss();
    }
  }

  /**
   * Cancel any changes to the payment and close the view, going back to the Editing Delivery state.
   */
  public cancelPayment() {
    this.viewCtrl.dismiss();
  }
}
