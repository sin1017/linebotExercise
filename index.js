require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const [addMember, deleteMember] = require('./controller/updateMember');
const [searchMember] = require('./controller/search');
const [addVacation] = require('./controller/updateVacation');
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
			res.status(500).end();
		});
});

// event handler
const [
	returnMessageHandle,
	registerMemberMessage,
	deleteMemberMessage,
	addVacationMessage,
	deleteVacationMessage,
	searchMemberMessage,
] = require('./model/message');
async function handleEvent(event) {
	let returnMessage = '';
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}
	switch (event.message.text) {
		case '註冊會員':
			returnMessage = registerMemberMessage(await addMember(event));
			break;
		case '停用會員':
			returnMessage = deleteMemberMessage(await deleteMember(event));
			break;
		case '查詢':
			returnMessage = returnMessageHandle();
			break;
		case '查詢名單':
			returnMessage = searchMemberMessage(await searchMember());

			break;

		default:
			// const searchMethPattern = /查詢(\d+)月/;
			// const targetMonth = event.message.text.match(searchMethPattern);
			await addVacation();
			break;
	}
	// use reply API
	return client.replyMessage({
		replyToken: event.replyToken,
		messages: [returnMessage],
	});
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
