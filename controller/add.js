const db = require('../database/database');
async function addMember(userinfo) {
	try {
		let userName = '';
		await fetch(
			`https://api.line.me/v2/bot/profile/${userinfo.source.userId}`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + process.env.CHANNEL_ACCESS_TOKEN,
				},
			},
		)
			.then((res) => res.json(res))
			.then((res) => {
				userName = res.displayName;
			});

		const dbOrder = `INSERT INTO zeabur.user (uid, name) VALUES ('${userinfo.source.userId}', '${userName}')`;
		// const deleteOrder =
		// 	"DELETE FROM `zeabur`.`user` WHERE (`id` = '1') and (`uid` = '123');";
		const [rows, fields] = await db.query(dbOrder);
		console.log('rows -----', rows);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = addMember;
