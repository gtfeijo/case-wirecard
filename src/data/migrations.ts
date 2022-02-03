import { BaseDataBase } from "./BaseDataBase";

class Migrations extends BaseDataBase {
  async createTable() {
    await BaseDataBase.connection.raw(`
        create table wirecard_client(
            id VARCHAR(255) PRIMARY KEY
        );
        
        create table wirecard_buyer(
            name VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255),
            cpf VARCHAR(255),
            id_client VARCHAR(255),
            foreign key (id_client) references wirecard_client(id)
        );
        
        create table wirecard_payment(
            id VARCHAR(255) PRIMARY KEY,
            amount FLOAT,
            type VARCHAR(255),
            id_client VARCHAR(255),
            name_buyer VARCHAR(255),
            card_holder_name VARCHAR(255),
            card_number VARCHAR(255),
            card_expiration_date VARCHAR(255),
            card_cvv INT,
            foreign key (id_client) references wirecard_client(id),
            foreign key (name_buyer) references wirecard_buyer(name)
        );
        `);
    console.log("Tabelas criadas com sucesso!");
  }
}

const createTableMigrations = new Migrations();
createTableMigrations.createTable();
