import { Buyer } from "../model/Buyer";
import { BaseDataBase } from "./BaseDataBase";

export class BuyerDataBase extends BaseDataBase {
  public async createBuyer(buyer: any) {
    console.log(buyer);
    try {
      await BaseDataBase.connection("wirecard_buyer").insert({
        name: buyer.getName(),
        email: buyer.getEmail(),
        cpf: buyer.getCpf(),
        id_client: buyer.getIdClient(),
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findBuyerByEmail(email: string) {
    try {
      const buyer = await BaseDataBase.connection("wirecard_buyer")
        .select("*")
        .where({ email });
      return buyer[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
