import {Report, Item} from './database.mjs'
export const getAllItemsHandler = async (event) => {


}

const getAllMessageCount = async () => {
	Report.query()
	 .select('SUM(item_count)')
}


