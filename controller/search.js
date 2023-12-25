const searchDb = require('../uitls/selectDb');

/**
 * @description 查詢已註冊會員名單
 * @returns []
 */
async function searchMember() {
	const result = await searchDb('status', 0);

	return result;
}
/**
 * @description 搜尋有效休假名單
 * @returns []
 */
async function searchVacationList() {
	try {
		const vacationList = await searchDb('status', 0, 'vacation_list');
		return vacationList;
	} catch (error) {
		return [];
	}
}
/**
 * @description 將有效休假列表，進行排序及會員名稱添加
 * @param vacationList 休假列表
 * @param memberList 會員列表
 * @param month 查詢月份
 * @returns [
 * 	{
 *  	id:vacation_list db id,
 * 		uid:
 * 	}
 * ] : 依照會員名稱、日期排序
 */
function filterAndSortVacationList(vacationList, memberList, month) {
	return vacationList
		.filter((item) => new Date(item.date).getMonth() + 1 === month)
		.sort((a, b) => {
			return a.uid === b.uid
				? new Date(a.date) - new Date(b.date)
				: a.uid.localeCompare(b.uid);
		})
		.map((item) => {
			const userName = memberList.find((value) => value.uid === item.uid);

			return {
				...item,
				name: userName ? userName?.name : null,
			};
		});
}
/**
 *
 * @param searchMonthList 查詢月份休假列表
 * @param month 查詢月份
 * @returns 字串拼接
 */
function generateResultText(searchMonthList, month) {
	if (searchMonthList.length === 0) {
		return '該月份無人休假';
	}
	let indexNumber = 1;
	const resultText = searchMonthList.reduce((result, item) => {
		const name = item.name;
		if (result.indexOf(name) === -1 && name) {
			const vacationNum = searchMonthList.filter(
				(value) => item.name === value.name,
			);
			result += `
			${indexNumber}. ${name} ： 休 ${vacationNum.length} 天`;
			indexNumber++;
		}
		return result;
	}, `${month}月：`);

	return resultText;
}

/**
 * @description 查詢月份休假名單
 * @param  month 月份
 * @returns string 名單字串拼接, 1: 查詢失敗
 */
async function searchMonth(month) {
	try {
		//休假列表
		const vacationList = await searchVacationList();
		//會員名單列表
		const memberList = await searchMember();
		const searchMonthList = filterAndSortVacationList(
			vacationList,
			memberList,
			month,
		);

		return generateResultText(searchMonthList, month);
	} catch (error) {
		console.log('查詢休假月份失敗', error);
		return '1';
	}
}

async function searchAllVacationList() {
	const memberList = await searchMember();
	const vacationList = await searchVacationList();
	const sortVacationList = vacationList
		.map((item) => {
			const userName = memberList.find((value) => value.uid === item.uid);

			return {
				...item,
				name: userName ? userName.name : null,
			};
		})
		.sort((a, b) => new Date(a.date) - new Date(b.date))
		.filter((value) => value.name);
	if (sortVacationList.length === 0) {
		return null;
	}
	const allVacationListText = sortVacationList.reduce((result, item, index) => {
		result += `${index + 1}. ${item.name} - ${new Date(
			item.date,
		).toLocaleDateString()}
		`;
		return result;
	}, '  ');

	return allVacationListText;
}

module.exports = { searchMember, searchMonth, searchAllVacationList };
