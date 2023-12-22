const order = {
	type: 'text',
	text: `👉 查詢
      查詢+月份：查詢該月份休假名單及天數
      查詢名單：查詢現職員工名單
      範本：查詢12月 -> 歆偊 2天
👉 新增
      註冊會員：註冊發送訊息的員工資料
      休假年/月/日：新增休假
      範本：休假2023/12/15
👉 刪除
      停用會員：刪除發送訊息的員工資料
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
	if (!condition) {
		defaultMessage.text = '註冊失敗 😭😭😭';
		return defaultMessage;
	}
	defaultMessage.text = '註冊成功 🎉🎉🎉';
	return defaultMessage;
}
function deleteMemberMessage(condition) {
	if (!condition) {
		defaultMessage.text = '刪除失敗 😭😭😭';
		return defaultMessage;
	}
	defaultMessage.text = '刪除成功 🎉🎉🎉';
	return defaultMessage;
}
function addVacationMessage(condition) {
	switch (condition) {
		case 1:
			defaultMessage.text = '刪除失敗 😭😭😭';
		case 2:
			defaultMessage.text = '查無會員帳號 🤨🤨🤨';
		default:
			defaultMessage.text = '新增成功 🎉🎉🎉';
			break;
	}
	return defaultMessage;
}

function deleteVacationMessage(condition) {
	if (!condition) {
		defaultMessage.text = '刪除失敗 😭😭😭';
		return defaultMessage;
	}
	defaultMessage.text = '刪除成功 🎉🎉🎉';
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

module.exports = [
	returnMessageHandle,
	registerMemberMessage,
	deleteMemberMessage,
	addVacationMessage,
	deleteVacationMessage,
	searchMemberMessage,
];
