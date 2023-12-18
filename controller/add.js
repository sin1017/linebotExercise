const db = require('../database/database');
const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN;
async function addMember(userinfo) {
	try {
		let userName = '';
		await fetch(
			`https://api.line.me/v2/bot/profile/${userinfo.source.userId}`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + channelAccessToken,
				},
			},
		)
			.then((res) => res.json(res))
			.then((res) => {
				userName = res.displayName;
			});

		const dbOrder = `INSERT INTO zeabur.user (uid, name) VALUES ('${userinfo.source.userId}', '${userName}')`;

		await db.query(dbOrder);

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteMember(userinfo) {
	try {
		const dbId = `SELECT * FROM zeabur.user WHERE uid='${userinfo.source.userId}'`;
		console.log('db id :::: ----', dbId);
		// const deleteOrder = `UPDATE zeabur.user SET`;
		// "DELETE FROM `zeabur`.`user` WHERE (`id` = '1') and (`uid` = '123');";
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = addMember;
