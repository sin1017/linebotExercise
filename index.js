require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const [addMember, deleteMember] = require('./controller/updateMember');
const {
	searchMember,
	searchMonth,
	searchAllVacationList,
} = require('./controller/search');
const {
	addVacation,
	updateVacationStatus,
} = require('./controller/updateVacation');
// create LINE SDK config from env variables
const config = {
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
const cors = require('cors');
app.use(cors());
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
	Promise.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result))
		.catch((err) => {
			console.log('errrrrrr |||||||', err);
			res.status(500).end();
		});
});

// event handler
const {
	returnMessageHandle,
	registerMemberMessage,
	deleteMemberMessage,
	addVacationMessage,
	deleteVacationMessage,
	searchMemberMessage,
	searchMonthMessage,
	searchAllVacationListMessage,
	getGameList,
	searchVacationList
} = require('./model/message');
async function handleEvent(event) {
	// console.log(event);
	let returnMessage = '';
	if (
		event.type !== 'message' &&
		event.type !== 'postback'
	) {
		return Promise.resolve(null);
	}

	if (event.postback) {
		const addOrder = /新增休假/.test(event.postback.data);
		if (addOrder) {
			returnMessage = addVacationMessage(
				await addVacation(event.source.userId, event.postback.params.date),
			);
		}
	}
	if (event.message) {
		switch (event.message.text) {
			case '註冊帳號':
				returnMessage = registerMemberMessage(await addMember(event));
				break;
			case '停用帳號':
				returnMessage = deleteMemberMessage(await deleteMember(event));
				break;
			case '查詢':
				returnMessage = returnMessageHandle();
				break;
			case '查詢名單':
				returnMessage = searchMemberMessage(await searchMember());
				break;
			case '查詢休假':
				returnMessage = searchVacationList()
				break;
			case '查詢全部':
				returnMessage = searchAllVacationListMessage(
					await searchAllVacationList(),
				);
				break;
			case '刪除休假':
				returnMessage = {
					type: 'text',
					text: '請輸入刪除年/月/日，例如：刪除2024/2/1',
				};
				break;
			case '遊戲推薦':
				returnMessage = getGameList()
				break;

			default:
				const deleteOrder = /刪除(\d{4}\/\d{1,2}\/\d{1,2})/.test(
					event.message.text,
				);
				const searchMethOrder = /查詢(\d+)月/.test(event.message.text);
				if (deleteOrder) {
					const vacationDate = event.message.text.split('刪除');
					returnMessage = deleteVacationMessage(
						await updateVacationStatus(event.source.userId, vacationDate[1]),
					);
				}
				if (searchMethOrder) {
					const vacationDate = event.message.text.split(/\D+/);
					returnMessage = searchMonthMessage(
						await searchMonth(Number(vacationDate[1])),
					);
				}

				break;
		}
	}
	// use reply API
	return client.replyMessage({
		replyToken: event.replyToken,
		messages: [returnMessage],
	});
}

app.use('/images', express.static('images'));

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
