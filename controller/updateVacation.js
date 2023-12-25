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

		return searchResult.filter((item) => item.status === 0).length > 0;
	} catch (error) {
		return false;
	}
}
/**
 * @description 重置資料庫，當前月份往前推一個月資料，關閉status，好讓新增日期可寫入覆蓋
 * @returns filter status === 1
 */
async function resetVacationStatus() {
	try {
		const resetList = await selectDb('status', 0, 'vacation_list');
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
		if (resetResultList.length === 0) {
			return resetResultList;
		}
		const upDateOrder = `UPDATE vacation_list SET status = '1' WHERE (id = ?)`;
		const upDateValue = resetResultList.map((data) => [data.id]);

		await db.query(upDateOrder, [upDateValue]);

		return resetResultList;
	} catch (error) {
		console.log('error ::: 重置資料庫失敗', error);
		return [];
	}
}
/**
 * @description 確認休假日期是否重複
 * @param date 休假日期
 * @returns boolean , true: 重複 false: 無重複
 */
async function checkAddVacation(date) {
	try {
		const checkAddVacationStatus = await selectDb(
			'date',
			date,
			'vacation_list',
		);
		if (checkAddVacationStatus.length !== 0) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
}

/**
 * @param userId line user id
 * @param date 休假日期 ex: 2023/12/19
 * @returns 0: 新增成功 1: 新增失敗 2: 查無會員帳號 3: 這天有人休假囉
 */
async function addVacation(userId, date) {
	const checkAddTime = new Date(date).getTime();
	const nowTime = new Date().getTime();
	if (nowTime > checkAddTime) {
		return '1';
	}
	try {
		const checkVacationRepeat = await checkAddVacation(date);
		if (checkVacationRepeat) {
			return '3';
		}
		const dataList = await resetVacationStatus();
		const checkSignUpStatus = await checkRegisterStatus(userId);

		if (!checkSignUpStatus) {
			return '2';
		}
		const addVacationOrder = `INSERT INTO vacation_list (uid, date) VALUES (? ,?)`;
		const upDateOrder = `UPDATE vacation_list SET uid = ?, date = ?, status = '0' WHERE (id = ?)`;
		dataList.length === 0
			? await db.execute(addVacationOrder, [userId, date])
			: await db.execute(upDateOrder, [userId, date, dataList[0].id]);

		return '0';
	} catch (error) {
		console.log('新增休假失敗', error);
		return '1';
	}
}

/**
 *
 * @param userId 刪除user id
 * @param date 刪除日期
 * @returns 0: 刪除成功 1: 刪除失敗 2: 查無會員帳號
 */
async function updateVacationStatus(userId, date) {
	try {
		const checkSignUpStatus = await checkRegisterStatus(userId);

		if (!checkSignUpStatus) {
			return '2';
		}
		const searchDbID = await selectDb('date', date, 'vacation_list');
		const updateTarget = searchDbID.find(
			(item) => item.uid === userId && item.status === 0,
		);
		if (!updateTarget) {
			return '1';
		}
		const updateOrder = `UPDATE vacation_list SET status = '1' WHERE (uid = ?) and (date = ?);`;
		await db.query(updateOrder, [userId, date]);
		return '0';
	} catch (error) {
		console.log(error);
		return '2';
	}
}

module.exports = { addVacation, checkRegisterStatus, updateVacationStatus };
