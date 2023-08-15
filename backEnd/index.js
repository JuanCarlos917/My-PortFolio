const server = require("./src/app.js");
const { conn } = require("./src/index.js");


conn.sync({ force: true }).then(() => {
	server.listen(3001, () => {
		console.log('Server is listening at port 3001');
	});
});

