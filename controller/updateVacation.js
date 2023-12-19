const db = require('../database/database');
const selectDb = require('../uitls/selectDb');

async function checkRegisterStatus(userId) {
	try {
		const searchResult = await selectDb('uid', userId);
		if (searchResult.length > 0) {
			return searchResult.filter((item) => item.status === 0);
		}
	} catch (error) {
		return [];
	}
}

/**
 *
 * @param userId line user id
 * @param date 休假日期 ex: 2023/12/19
 * @returns 0: 登記成功 1: 登記失敗 2: 查無會員帳號
 */
async function addVacation(userId, date) {
	try {
		const checkSignUpStatus = await checkRegisterStatus(userId);
		if (checkSignUpStatus.length === 0) {
			return 2;
		}
		const addVacationOrder = `INSERT INTO zeabur.vacation_list (uid, date) VALUES (? ,?)`;
		await db.execute(addVacationOrder, [userId, date]);
		return 0;
	} catch (error) {
		console.log('新增休假失敗', error);
		return 1;
	}
}

module.exports = [checkRegisterStatus, addVacation];
