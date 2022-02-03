export class Buyer {
  constructor(
    private name: string,
    private email: string,
    private cpf: string,
    private idClient: string
  ) {}

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getCpf() {
    return this.cpf;
  }

  public getIdClient() {
    return this.idClient;
  }
}
