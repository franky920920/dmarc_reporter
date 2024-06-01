import Knex from "knex";
import { Model } from "objection";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: "us-east-1",
});

let response = await client.send(
  new GetSecretValueCommand({
    SecretId: process.env.DB_SECRET_NAME,
  }),
);

const secret = JSON.parse(response.SecretString);

const knex = Knex({
  client: "mysql2",
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: secret.username,
    password: secret.password,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  },
});
Model.knex(knex);

class Report extends Model {
  static get tableName() {
    return "report";
  }
}

class Item extends Model {
  static get tableName() {
    return "item";
  }
}

export { Report, Item };
export default Model;
