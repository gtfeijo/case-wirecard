import { Payment } from "../model/Payment";
import { BaseDataBase } from "./BaseDataBase";

export class PaymentDataBase extends BaseDataBase {
  public async createPaymentCard(payment: Payment) {
    try {
      await BaseDataBase.connection("wirecard_payment").insert({
        id: payment.getId(),
        amount: payment.getAmount(),
        type: payment.getType(),
        id_client: payment.getIdClient(),
        name_buyer: payment.getNameBuyer(),
        card_holder_name: payment.getCardHolderName(),
        card_number: payment.getCardNumber(),
        card_expiration_date: payment.getCardExpirationDate(),
        card_cvv: payment.getCardCvv(),
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async createPaymentBoleto(payment: Payment) {
    try {
      await BaseDataBase.connection("wirecard_payment").insert({
        id: payment.getId(),
        amount: payment.getAmount(),
        type: payment.getType(),
        id_client: payment.getIdClient(),
        name_buyer: payment.getNameBuyer(),
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findPaymentById(id: string): Promise<any> {
    try {
      const product = await BaseDataBase.connection("wirecard_payment")
        .select("*")
        .where({ id });
      return product[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
