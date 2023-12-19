const searchDb = require('../uitls/selectDb');

async function searchMember() {
	const result = await searchDb('status', 0);
	console.log('result', result);
	return result;
}

module.exports = [searchMember];
