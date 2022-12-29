require("dotenv").config();
const express = require("express")
const app = express();
let seq;

//express app configuration

if (process.env.JAWSDB_URL) {
    console.log("There is a JAWS DB URL")
    seq = new Sequelize(process.env.JAWSDB_URL)
}
else {
    seq = require("./models").sequelize
}
seq.sync().then(() => {
  app.listen(PORT, () => console.log('server started on port ' + PORT));
})