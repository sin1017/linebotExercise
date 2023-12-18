const db = require('../database/database');

async function addMember(userinfo) {
	// console.log('userinfo:::::', userinfo);
	try {
		const dbOrder = `INSERT INTO zeabur.user (uid, name) VALUES (${userinfo.id}, '歆偊')`;
		const deleteOrder =
			"DELETE FROM `zeabur`.`user` WHERE (`id` = '1') and (`uid` = '123');";
		const [rows, fields] = await db.execute(dbOrder);
		return rows;
	} catch (err) {
		return false;
		console.log('失敗了', err);
	}
}

module.exports = addMember;
