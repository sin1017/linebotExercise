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
		// get db id
		const selectDbId = `SELECT * FROM zeabur.user WHERE uid='${userinfo.source.userId}'`;

		const [result, filed] = await db.query(selectDbId);
		const dbId = result[0].id;

		const updateOrder = `UPDATE zeabur.user SET status = '1' WHERE (id = ${dbId})`;

		await db.query(updateOrder);

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = [addMember, deleteMember];
