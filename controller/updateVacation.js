const db = require('../database/database');
const selectDb = require('../uitls/selectDb');

/**
 * @description 檢查註冊狀態
 * @param userId line id
 * @returns true: 有註冊 false: 未註冊
 */
async function checkRegisterStatus(userId) {
	try {
		const searchResult = await selectDb('uid', userId);
		if (searchResult.length > 0) {
			return searchResult.filter((item) => item.status === 0).length > 0;
		}
	} catch (error) {
		return false;
	}
}
/**
 * @description 重置資料庫，當前月份往前推一個月資料，關閉status，好讓新增日期可寫入覆蓋
 * @returns filter status === 1
 */
async function resetVacationStatus() {
	console.log('resetVacationStatus----start 重置開始');
	try {
		const resetList = await selectDb('status', 0, 'zeabur.vacation_list');

		const currentTime = new Date();
		const currentDataMonth = currentTime.getMonth();
		currentTime.setMonth(currentDataMonth - 2);
		const resetResultList = resetList
			.map((item) => {
				const dataTime = new Date(item?.date);

				return {
					...item,
					status: currentTime?.getTime() >= dataTime.getTime() ? 1 : 0,
				};
			})
			.filter((item) => item.status);

		const upDateOrder = `UPDATE vacation_list SET status = '1' WHERE (id = ?)`;
		const upDateValue = resetResultList.map((data) => data.id);
		console.log('upDateValue list ---- ', upDateValue);
		db.query(upDateOrder, upDateValue);

		return resetResultList;
	} catch (error) {
		console.log('error ::: 重置資料庫失敗', error);
		return [];
	}
}

/**
 * @param userId line user id
 * @param date 休假日期 ex: 2023/12/19
 * @returns 0: 新增成功 1: 新增失敗 2: 查無會員帳號
 */
async function addVacation(userId, date) {
	const checkAddTime = new Date(date).getTime();
	const nowTime = new Date().getTime();
	if (nowTime < checkAddTime) {
		return 1;
	}
	try {
		const dataList = await resetVacationStatus();

		const checkSignUpStatus = await checkRegisterStatus(userId);

		if (checkSignUpStatus.length === 0) {
			return 2;
		}
		const addVacationOrder = `INSERT INTO zeabur.vacation_list (uid, date) VALUES (? ,?)`;
		const upDateOrder = `UPDATE zeabur.vacation_list SET uid = ?, date = ?, status = '0' WHERE (id = ?)`;

		// dataList.length === 0
		// 	? await db.execute(addVacationOrder, [userId, date])
		// 	: await db.execute(upDateOrder, [userId, date, dataList[0].id]);
		await db.execute(addVacationOrder, [userId, date]);

		return 0;
	} catch (error) {
		console.log('新增休假失敗', error);
		return 1;
	}
}

module.exports = { addVacation, checkRegisterStatus };
