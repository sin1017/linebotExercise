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
 * @description 重置資料庫，當前月份往前推一個月資料，關閉status，好讓新增日其實可寫入覆蓋
 */
async function resetVacationStatus() {
	console.log('reset function start');
	const resetList = await selectDb('status', 0, 'zeabur.vacation_list');
	const currentTime = new Date().getTime();

	const resetResultList = resetList.map((item) => {
		const dataTime = new Date(item.date);
		const dataMonth = dataTime.getMonth();
		dataTime.setMonth(dataMonth - 2);
		console.log('resetResult 陣列內部 ');

		return {
			...item,
			status: currentTime > dataTime.getTime() ? 1 : 0,
		};
	});
	console.log('reset function end');

	console.log('reset 日期', resetResultList);
}

/**
 *
 * @param userId line user id
 * @param date 休假日期 ex: 2023/12/19
 * @returns 0: 新增成功 1: 新增失敗 2: 查無會員帳號
 */
async function addVacation(userId, date) {
	try {
		console.log('新增Function 內部 開始');
		await resetVacationStatus();
		console.log('新增Function 內部 重置日期結束');
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

module.exports = { addVacation, checkRegisterStatus };
