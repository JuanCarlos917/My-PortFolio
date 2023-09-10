const server = require("./src/app.js");
const { conn } = require("./src/index.js");
require('dotenv').config();


const PORT = process.env.PORT || 3001  // Si process.env.PORT no está definido, usa 3001 como valor predeterminado

conn.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server is listening at port ${PORT}`);
	});
});

