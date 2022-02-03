import { Request, Response } from "express";
import { PaymentDataBase } from "../data/PaymentDataBase";

export async function getPaymentById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(422).send("Id não informado!");
    }

    const paymentDataBase = new PaymentDataBase();
    const payment = await paymentDataBase.findPaymentById(id);

    if (!payment) {
      res.status(404).send("Pagamento não encontrado!").end;
    }

    res.status(200).send(payment);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
