import { Client } from "../model/Client";
import { BaseDataBase } from "./BaseDataBase";

export class ClientDataBase extends BaseDataBase {
  public async createClient(id: string) {
    console.log("essa aqui", id);
    try {
      await BaseDataBase.connection("wirecard_client").insert({
        id,
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findClientById(id: string): Promise<Client> {
    try {
      const client = await BaseDataBase.connection("wirecard_client")
        .select("*")
        .where({ id });
      return client[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
