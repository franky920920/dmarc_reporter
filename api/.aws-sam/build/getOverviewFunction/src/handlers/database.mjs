import Knex from "knex";
import {Model} from "objection";

const knex = Knex({
	client: 'mysql2',
	useNullAsDefault: true,
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
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



export  {Report, Item}
export default Model
