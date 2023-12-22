const db = require('./database/database');
const addVacationOrder = `INSERT INTO vacation_list (uid, date) VALUES ?`;

db.query(addVacationOrder, [
	[
		['U5a4bf29d9c2d9fc7b6f4b174fa8e1dab', '2023-12-21 00:00:00'],
		['U5a4bf29d9c2d9fc7b6f4b174fa8e1dab', '2023-12-21 00:00:00'],
	],
]);
