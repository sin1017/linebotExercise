const order = {
	type: 'text',
	text: `| 查詢 |
      查詢+月份：查詢該月份休假名單及天數
      查詢名單：查詢現職員工名單
      範本：查詢12月 -> 歆偊 2天
| 新增 |
      註冊會員：註冊發送訊息的員工資料
      休假2023/12/15：新增休假
| 刪除 |
      刪除會員：刪除發送訊息的員工資料
      刪除2023/12/15：刪除休假
`,
};
function returnMessageHandle(message) {
	if (message === '指令' || message === '使用方式' || message === '查詢') {
		return order;
	}
}
function registerResultMessage(condition) {
	const defaultMessage = {
		type: 'text',
		text: '註冊成功 🎉🎉🎉',
	};
	if (!condition) {
		defaultMessage.text = '註冊失敗😭😭😭';
	}
	return defaultMessage;
}

module.exports = [returnMessageHandle, registerResultMessage];
