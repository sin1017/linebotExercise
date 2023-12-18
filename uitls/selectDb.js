const db = require('../database/database');
/**
 *
 * @param searchTarget 搜尋欄位名稱
 * @param searchValue 搜尋值
 * @returns result[ {} ]
 */
async function selectDb(searchTarget, searchValue) {
	const selectDbId =
		searchTarget && searchValue
			? `SELECT * FROM zeabur.user WHERE ${searchTarget}='${searchValue}'`
			: `SELECT * FROM zeabur.user`;

	const [result, filed] = await db.query(selectDbId);
	return result;
}

module.exports = selectDb;
