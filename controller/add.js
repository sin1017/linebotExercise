const db = require('../database/database');

async function addMember(userinfo) {
	// console.log('userinfo:::::', userinfo);
	try {
		console.log('add user');
		const dbOrder = `INSERT INTO zeabur.user (uid, name) VALUES (${userinfo.source.userId}, '歆偊')`;
		const deleteOrder =
			"DELETE FROM `zeabur`.`user` WHERE (`id` = '1') and (`uid` = '123');";
		const [rows, fields] = await db.execute(dbOrder);
		return rows;
	} catch (err) {
		return false;
	}
}

module.exports = addMember;
