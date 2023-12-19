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
		? `SELECT * FROM ${tableName} WHERE ${searchTarget}='${searchValue}'`
		: `SELECT * FROM ${tableName}`;
	console.log('search db 語法', selectDbId, '""', searchTarget, searchValue);
	const [result, filed] = await db.query(selectDbId);
	return result;
}

module.exports = selectDb;
