const db = require('../database/database');

async function addMember(userinfo) {
	console.log('userinfo:::::', userinfo);
	try {
		const dbOrder = `INSERT INTO 'zeabur'.'user' ('id', 'uid', 'name') VALUES ('1', '123', '歆偊');`;
		const deleteOrder =
			"DELETE FROM `zeabur`.`user` WHERE (`id` = '1') and (`uid` = '123');";
		const [rows, fields] = await db.execute(dbOrder);
	} catch (err) {
		console.log('失敗了', err);
	}
}

module.exports = addMember;
