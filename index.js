require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const addMember = require('./controller/add');
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
		.then((res) => {
			console.log('res ---', res);
		})
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
] = require('./model/message');
async function handleEvent(event) {
	let returnMessage = '';
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}
	if (event.message.text === '註冊') {
		console.log('執行');
		returnMessage = registerMemberMessage(await addMember(event));
	}
	// returnMessage =
	// 	event.message.text === '註冊'
	// 		? returnMessageHandle(true)
	// 		: returnMessageHandle(event.message.text);

	// use reply API
	console.log('result', returnMessage);

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
