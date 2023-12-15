require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const db = require('./database/database');
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
		.then(async (result) => {
			await searchDb();
		})
		.catch((err) => {
			res.status(500).end();
		});
});

async function searchDb() {
	try {
		const [rows, fields] = await db.execute('SELECT * FROM user');
	} catch (err) {
		console.log('失敗了', err);
	}
}
searchDb();
// event handler
const [
	returnMessageHandle,
	registerMember,
	deleteMember,
	addVacation,
	deleteVacation,
] = require('./model/message');
function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	const returnMessage = (() => {
		if (event.message.text === '註冊') {
			return registerResultMessage(true);
		}
		return returnMessageHandle(event.message.text);
	})();
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
