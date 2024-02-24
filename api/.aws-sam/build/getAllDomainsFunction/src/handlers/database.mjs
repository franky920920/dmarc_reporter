import Knex from "knex";
import {Model} from "objection";
import {
	SecretsManagerClient,
	GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
	region: "us-east-1",
});

let response = await client.send(new GetSecretValueCommand({
	SecretId: "devDb",
}));

const secret = JSON.parse(response.SecretString);

const knex = Knex({
	client: 'mysql2',
	useNullAsDefault: true,
	connection: {
		host: secret.host,
		port: secret.port,
		user: secret.username,
		password: secret.password,
		database: 'dmarc2',
		timezone: '+00:00',
	},
})
Model.knex(knex)

class Report extends Model {
	static get tableName() {
		return 'report';
	}
}

class Item extends Model {
	static get tableName() {
		return 'item';
	}
}


export {Report, Item}
export default Model
