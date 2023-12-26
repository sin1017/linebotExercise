const order = {
	type: 'text',
	text: `👉 查詢
		查詢+月份：查詢該月份休假名單及天數（最多只可查當月往回一個月，往後不限）
		查詢名單：查詢現職員工名單
		查詢休假表：查詢已排休日期
		範本：查詢12月 -> 歆偊 2天
👉 新增
		註冊帳號：註冊發送訊息的員工資料
		休假年/月/日：新增休假
		範本：休假2023/12/15
👉 刪除
		停用帳號：刪除發送訊息的員工資料
		刪除年/月/日：刪除休假
		範本：刪除2023/12/15
`,
};
const defaultMessage = {
	type: 'text',
	text: null,
};
function returnMessageHandle() {
	return order;
}
function registerMemberMessage(condition) {
	defaultMessage.text = !condition ? '註冊失敗 😭😭😭' : '註冊成功 🎉🎉🎉';
	return defaultMessage;
}
function deleteMemberMessage(condition) {
	defaultMessage.text = !condition ? '刪除失敗 😭😭😭' : '刪除成功 🎉🎉🎉';
	return defaultMessage;
}
function addVacationMessage(condition) {
	switch (condition) {
		case '1':
			defaultMessage.text = '新增失敗 😭😭😭';
			break;
		case '2':
			defaultMessage.text = '查無會員帳號 🤨🤨🤨';
			break;
		case '3':
			defaultMessage.text = '這天有人休假囉 😢😢😢';
			break;
		default:
			defaultMessage.text = '新增成功 🎉🎉🎉';
			break;
	}
	return defaultMessage;
}

function deleteVacationMessage(condition) {
	switch (condition) {
		case '1':
			defaultMessage.text = '刪除失敗 😭😭😭';
			break;
		case '2':
			defaultMessage.text = '查無會員帳號 🤨🤨🤨';
			break;
		default:
			defaultMessage.text = '刪除成功 🎉🎉🎉';
			break;
	}
	return defaultMessage;
}

function searchMemberMessage(message = []) {
	defaultMessage.text = message.reduce((result, item, index) => {
		result += `${index + 1}. ${item.name} 
		`;
		return result;
	}, '  ');
	return defaultMessage;
}

function searchMonthMessage(message) {
	defaultMessage.text = message === '1' ? '查詢失敗' : message;
	return defaultMessage;
}

function searchAllVacationListMessage(message) {
	defaultMessage.text = message ? message : '無人休假';
	return defaultMessage;
}

module.exports = {
	returnMessageHandle,
	registerMemberMessage,
	addVacationMessage,
	deleteMemberMessage,
	deleteVacationMessage,
	searchMemberMessage,
	searchMonthMessage,
	searchAllVacationListMessage,
};
