const db = require('../database/database');
const selectDb = require('../uitls/selectDb');
const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN;

async function addMember(userinfo) {
	try {
		let userName = '';
		const registerCheck = await selectDb('uid', userinfo.source.userId);
		console.log('register check result::::""""', registerCheck);
		if (registerCheck.length > 0) {
			throw false;
		}
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
		const selectResult = await selectDb();
		const statusList = selectResult.find((item) => item.status === 1);
		const addOrder = `INSERT INTO zeabur.user (uid, name) VALUES ('${userinfo.source.userId}', '${userName}')`;
		const updateOrder = `UPDATE zeabur.user SET uid = '${userinfo.source.userId}', name = '${userName}', status = '0' WHERE (id = ${statusList.id})`;
		selectResult.length < 10
			? await db.query(addOrder)
			: await db.query(updateOrder);
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
		const dbId = result[0];
		if (dbId.status === 1) throw false;

		const updateOrder = `UPDATE zeabur.user SET status = '1' WHERE (id = ${dbId.id})`;

		await db.query(updateOrder);

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = [addMember, deleteMember];
