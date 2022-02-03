export enum PAYMENT_TYPES {
  BOLETO = "BOLETO",
  CARD = "CARD",
}

export class Payment {
  constructor(
    private id: string,
    private amount: number,
    private type: PAYMENT_TYPES,
    private id_client: string,
    private name_buyer: string,
    private card_holder_name?: string,
    private card_number?: string,
    private card_expiration_date?: string,
    private card_cvv?: number
  ) {}

  public getId() {
    return this.id;
  }

  public getAmount() {
    return this.amount;
  }

  public getType() {
    return this.type;
  }

  public getIdClient() {
    return this.id_client;
  }

  public getNameBuyer() {
    return this.name_buyer;
  }

  public getCardHolderName() {
    return this.card_holder_name;
  }

  public getCardNumber() {
    return this.card_number;
  }

  public getCardExpirationDate() {
    return this.card_expiration_date;
  }

  public getCardCvv() {
    return this.card_cvv;
  }
}
