const db = require('../database/database');
const selectDb = require('../uitls/selectDb');
const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN;

async function addMember(userinfo) {
	try {
		let userName = '';
		const registerCheck = await selectDb('uid', userinfo.source.userId);
		const registerCheckList = registerCheck.find((item) => item.status === 0);

		if (registerCheck.length > 0 && registerCheckList !== undefined) {
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

		const addOrder = `INSERT INTO zeabur.user (uid, name) VALUES (?, ?)`;

		const updateOrder = `UPDATE zeabur.user SET uid = ?, name = ?, status = '0' WHERE (id = ?)`;

		selectResult.length < 10
			? await db.execute(addOrder, [userinfo.source.userId, userName])
			: await db.execute(updateOrder, [
					userinfo.source.userId,
					userName,
					statusList?.id,
			  ]);

		return true;
	} catch (err) {
		console.log('addMember filed', err);
		return false;
	}
}

async function deleteMember(userinfo) {
	try {
		// get db id
		const selectDbId = `SELECT * FROM zeabur.user WHERE uid = ?`;

		const [result, filed] = await db.execute(selectDbId, [
			userinfo.source.userId,
		]);
		let dbId = '';
		const dbStatusCheck = result.every((item) => {
			if (item.status === 1) {
				return true;
			}
			dbId = item.id;
			return false;
		});
		console.log('dbId some 結果', dbId);
		if (dbStatusCheck) throw false;

		const updateOrder = `UPDATE zeabur.user SET status = '1' WHERE (id = ?)`;

		await db.execute(updateOrder, [dbId]);

		return true;
	} catch (error) {
		console.log('deleteMember filed', error);
		return false;
	}
}

module.exports = [addMember, deleteMember];
