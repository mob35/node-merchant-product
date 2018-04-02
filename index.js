var app = require("./src/app");
const mongoose = require("mongoose");
var connStr = process.env.MONGO_DB_URI || 'mongodb://localhost/myappdatabase';
mongoose.connect(connStr);

app.listen(3000, function () {
    console.log("3000");
});
