const db = require('../database/database');
/**
 *
 * @param searchTarget 搜尋欄位名稱
 * @param searchValue 搜尋值
 * @param tableName 表單名稱 預設為 zeabur.user
 * @returns result[ {} ]
 */
async function selectDb(searchTarget, searchValue, tableName = 'zeabur.user') {
	const selectDbId = searchTarget
		? `SELECT * FROM ? WHERE ${searchTarget}='${searchValue}'`
		: `SELECT * FROM ${tableName}`;
	const executeValue = searchTarget
		? [tableName, searchTarget, searchValue]
		: [tableName];
	const [result, filed] = await db.execute(selectDbId, executeValue);
	return result;
}

module.exports = selectDb;
