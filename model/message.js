const order = {
	type: 'text',
	text: `👉 查詢\n\t查詢+月份：\n\t\t查詢該月份休假名單及天數\n（最多只可查當月往回一個月，往後不限）\n\t查詢名單：\n\t\t查詢現職員工名單\n\t查詢休假表：\n\t\t查詢已排休日期\n\t範本：\n\t\t查詢12月 -> 歆偊 2天
👉 新增\n\t註冊帳號：\n\t\t註冊員工資料\n\t休假年/月/日：\n\t\t新增休假\n\t範本：\n\t\t休假2023/12/15
👉 刪除\n\t停用帳號：\n\t\t刪除發員工資料\n\t刪除年/月/日：\n\t\t刪除休假\n\t範本：\n\t\t刪除2023/12/15
`,
};
const defaultMessage = {
	type: 'text',
	text: null,
};
function returnMessageHandle() {
	return {
		type: 'flex',
		altText: 'Menu',
		contents: {
			type: 'bubble',
			body: {
				type: 'box',
				layout: 'horizontal',
				contents: [
					{
						type: 'box',
						layout: 'vertical',
						contents: [
							{
								type: 'button',
								action: {
									type: 'message',
									label: '註冊帳號',
									text: "註冊帳號"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '停用帳號',
									text: "停用帳號"
								},
							},
							{
								type: 'button',
								action: {
									type: 'datetimepicker',
									label: '新增休假',
									data: "新增休假",
									mode: "date"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '刪除休假',
									text: "刪除休假",
								},
							},
						]
					},
					{
						type: 'box',
						layout: 'vertical',
						contents: [
							{
								type: 'button',
								action: {
									type: 'message',
									label: '查詢名單',
									text: "查詢名單"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '查詢休假',
									text: "查詢休假",
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '查詢月份',
									text: "查詢月份"
								}
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '遊戲推薦',
									text: "遊戲推薦"
								}
							}
						]
					}
				],
			},
		},
	};
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
		result += `${index + 1}. ${item.name}\n`;
		return result;
	}, '');
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
function searchVacationList() {
	return {
		type: 'flex',
		altText: 'Menu',
		contents: {
			type: 'bubble',
			body: {
				type: 'box',
				layout: 'horizontal',
				contents: [
					{
						type: 'box',
						layout: 'vertical',
						contents: [
							{
								type: 'button',
								action: {
									type: 'message',
									label: '1月',
									text: "查詢1月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '2月',
									text: "查詢2月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '3月',
									text: "查詢3月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '4月',
									text: "查詢4月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '5月',
									text: "查詢5月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '6月',
									text: "查詢6月"
								},
							},
						]
					},
					{
						type: 'box',
						layout: 'vertical',
						contents: [
							{
								type: 'button',
								action: {
									type: 'message',
									label: '7月',
									text: "查詢7月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '8月',
									text: "查詢8月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '9月',
									text: "查詢9月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '10月',
									text: "查詢10月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '11月',
									text: "查詢11月"
								},
							},
							{
								type: 'button',
								action: {
									type: 'message',
									label: '12月',
									text: "查詢12月"
								},
							},
						]
					}
				]
			},
		},
	};

}
function getGameList() {
	return {
		type: 'flex',
		altText: 'game',
		contents: {
			"type": "carousel",
			"contents": [
				{
					"type": "bubble",
					"body": {
						"type": "box",
						"layout": "vertical",
						"contents": [
							{
								"type": "box",
								"layout": "vertical",
								"contents": [
									{
										"type": "image",
										"url": "https://i.imgur.com/yz9LPuM.png",
										"size": "full",
										"aspectRatio": "20:13",
										"aspectMode": "cover",
										"action": {
											"type": "uri",
											"label": "action",
											"uri": "https://apps.apple.com/tw/app/down-down-game/id6470746104"
										}
									}
								]
							},
							{
								"type": "box",
								"layout": "vertical",
								"contents": [
									{
										"type": "text",
										"text": "Dwon Dwon Game",
										"weight": "bold",
										"size": "xl"
									},
									{
										"type": "box",
										"layout": "baseline",
										"contents": [
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "text",
												"text": "5.0",
												"size": "sm",
												"color": "#999999",
												"flex": 0,
												"margin": "md"
											}
										],
										"margin": "md"
									}
								],
								"paddingStart": "xxl",
								"paddingTop": "md"
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "簡介",
										"color": "#aaaaaa",
										"size": "sm"
									},
									{
										"type": "text",
										"text": "懷舊小遊戲",
										"flex": 5,
										"size": "sm",
										"color": "#666666"
									}
								],
								"paddingStart": "xxl",
								"paddingTop": "md"
							},
							{
								"type": "box",
								"layout": "vertical",
								"contents": [
									{
										"type": "button",
										"action": {
											"type": "uri",
											"label": "點我下載",
											"uri": "https://apps.apple.com/tw/app/down-down-game/id6470746104"
										},
										"style": "primary",
										"offsetTop": "none"
									}
								],
								"paddingTop": "xxl",
								"paddingStart": "xl",
								"paddingEnd": "xl"
							}
						],
						"margin": "none",
						"offsetTop": "none",
						"paddingTop": "none",
						"paddingStart": "none",
						"paddingEnd": "none",
						"paddingBottom": "md"
					}
				},
				{
					"type": "bubble",
					"body": {
						"type": "box",
						"layout": "vertical",
						"contents": [
							{
								"type": "box",
								"layout": "vertical",
								"contents": [
									{
										"type": "image",
										"url": "https://i.imgur.com/C5QdrFa.png",
										"size": "full",
										"aspectRatio": "20:13",
										"aspectMode": "cover",
										"action": {
											"type": "uri",
											"label": "action",
											"uri": "https://apps.apple.com/tw/app/%E8%A7%92%E9%AC%A5%E5%A3%AB%E6%A3%8B/id6476807195"
										}
									}
								]
							},
							{
								"type": "box",
								"layout": "vertical",
								"contents": [
									{
										"type": "text",
										"text": "Dwon Dwon Game",
										"weight": "bold",
										"size": "xl"
									},
									{
										"type": "box",
										"layout": "baseline",
										"contents": [
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "icon",
												"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
											},
											{
												"type": "text",
												"text": "5.0",
												"size": "sm",
												"color": "#999999",
												"flex": 0,
												"margin": "md"
											}
										],
										"margin": "md"
									}
								],
								"paddingStart": "xxl",
								"paddingTop": "md"
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "簡介",
										"color": "#aaaaaa",
										"size": "sm"
									},
									{
										"type": "text",
										"text": "益智小品",
										"flex": 5,
										"size": "sm",
										"color": "#666666"
									}
								],
								"paddingStart": "xxl",
								"paddingTop": "md"
							},
							{
								"type": "box",
								"layout": "vertical",
								"contents": [
									{
										"type": "button",
										"action": {
											"type": "uri",
											"label": "點我下載",
											"uri": "https://apps.apple.com/tw/app/%E8%A7%92%E9%AC%A5%E5%A3%AB%E6%A3%8B/id6476807195"
										},
										"style": "primary",
										"offsetTop": "none"
									}
								],
								"paddingTop": "xxl",
								"paddingStart": "xl",
								"paddingEnd": "xl"
							}
						],
						"margin": "none",
						"offsetTop": "none",
						"paddingTop": "none",
						"paddingStart": "none",
						"paddingEnd": "none",
						"paddingBottom": "md"
					}
				}
			]
		}
	};
	// return {
	// 	type: 'flex',
	// 	altText: 'game',
	// 	contents: {
	// 		"type": "bubble",
	// 		"body": {
	// 			"type": "box",
	// 			"layout": "vertical",
	// 			"contents": [
	// 				{
	// 					"type": "box",
	// 					"layout": "vertical",
	// 					"contents": [
	// 						{
	// 							"type": "image",
	// 							"url": "https://i.imgur.com/yz9LPuM.png",
	// 							"size": "full",
	// 							"aspectRatio": "20:13",
	// 							"aspectMode": "cover",
	// 							"action": {
	// 								"type": "uri",
	// 								"label": "action",
	// 								"uri": "https://apps.apple.com/tw/app/down-down-game/id6470746104"
	// 							}
	// 						}
	// 					]
	// 				},
	// 				{
	// 					"type": "box",
	// 					"layout": "vertical",
	// 					"contents": [
	// 						{
	// 							"type": "text",
	// 							"text": "Dwon Dwon Game",
	// 							"weight": "bold",
	// 							"size": "xl"
	// 						},
	// 						{
	// 							"type": "box",
	// 							"layout": "baseline",
	// 							"contents": [
	// 								{
	// 									"type": "icon",
	// 									"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
	// 								},
	// 								{
	// 									"type": "icon",
	// 									"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
	// 								},
	// 								{
	// 									"type": "icon",
	// 									"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
	// 								},
	// 								{
	// 									"type": "icon",
	// 									"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
	// 								},
	// 								{
	// 									"type": "icon",
	// 									"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
	// 								},
	// 								{
	// 									"type": "text",
	// 									"text": "5.0",
	// 									"size": "sm",
	// 									"color": "#999999",
	// 									"flex": 0,
	// 									"margin": "md"
	// 								}
	// 							],
	// 							"margin": "md"
	// 						}
	// 					],
	// 					"paddingStart": "xxl",
	// 					"paddingTop": "md"
	// 				},
	// 				{
	// 					"type": "box",
	// 					"layout": "horizontal",
	// 					"contents": [
	// 						{
	// 							"type": "text",
	// 							"text": "簡介",
	// 							"color": "#aaaaaa",
	// 							"size": "sm"
	// 						},
	// 						{
	// 							"type": "text",
	// 							"text": "懷舊小遊戲",
	// 							"flex": 5,
	// 							"size": "sm",
	// 							"color": "#666666"
	// 						}
	// 					],
	// 					"paddingStart": "xxl",
	// 					"paddingTop": "md"
	// 				},
	// 				{
	// 					"type": "box",
	// 					"layout": "vertical",
	// 					"contents": [
	// 						{
	// 							"type": "button",
	// 							"action": {
	// 								"type": "uri",
	// 								"label": "點我下載",
	// 								"uri": "https://apps.apple.com/tw/app/down-down-game/id6470746104"
	// 							},
	// 							"style": "primary",
	// 							"offsetTop": "none"
	// 						}
	// 					],
	// 					"paddingTop": "xxl",
	// 					"paddingStart": "xl",
	// 					"paddingEnd": "xl"
	// 				}
	// 			],
	// 			"margin": "none",
	// 			"offsetTop": "none",
	// 			"paddingTop": "none",
	// 			"paddingStart": "none",
	// 			"paddingEnd": "none",
	// 			"paddingBottom": "md"
	// 		}
	// 	}
	// };
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
	getGameList,
	searchVacationList
};
