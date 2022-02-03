import { Request, Response } from "express";
import { BuyerDataBase } from "../data/BuyerDataBase";
import { ClientDataBase } from "../data/ClientDataBase";
import { PaymentDataBase } from "../data/PaymentDataBase";
import { Buyer } from "../model/Buyer";
import { Payment, PAYMENT_TYPES } from "../model/Payment";
import { IdGenerator } from "../services/IdGenerator";

export async function createPayment(req: Request, res: Response) {
  try {
    const {
      id_client,
      name,
      email,
      cpf,
      amount,
      type,
      card_holder_name,
      card_number,
      card_expiration_date,
      card_cvv,
    } = req.body;

    if (!id_client || !name || !email || !cpf || !amount || !type) {
      res.status(422).send("Insira corretamente as informações");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (type === PAYMENT_TYPES.CARD) {
      const newPayment = new Payment(
        id,
        amount,
        type,
        id_client,
        name,
        card_holder_name,
        card_number,
        card_expiration_date,
        card_cvv
      );

      const clientDataBase = new ClientDataBase();
      const client = await clientDataBase.findClientById(id_client);

      if (!client) {
        const newClient = new ClientDataBase();
        await newClient.createClient(id_client);
      }

      const buyerDataBase = new BuyerDataBase();
      const buyer = await buyerDataBase.findBuyerByEmail(email);

      if (!buyer) {
        const newBuyer = new Buyer(name, email, cpf, id_client);
        await buyerDataBase.createBuyer(newBuyer);
      }

      const paymentDataBase = new PaymentDataBase();
      await paymentDataBase.createPaymentCard(newPayment);

      res.status(200).send("Pagamento aprovado!");
    }

    const newPayment = new Payment(id, amount, type, id_client, name);

    const clientDataBase = new ClientDataBase();
    const client = await clientDataBase.findClientById(id_client);

    if (!client) {
      const newClient = new ClientDataBase();
      await newClient.createClient(id_client);
    }

    const buyerDataBase = new BuyerDataBase();
    const buyer = await buyerDataBase.findBuyerByEmail(email);

    if (!buyer) {
      const newBuyer = new Buyer(name, email, cpf, id_client);
      buyerDataBase.createBuyer(newBuyer);
    }

    const paymentDataBase = new PaymentDataBase();
    await paymentDataBase.createPaymentBoleto(newPayment);
    res
      .status(200)
      .send(
        "Pagamento registrado. Número do boleto: 982374987 238498273 238479823 293874729"
      );
  } catch (error) {
    res.status(400).send(error.message);
  }
}
