const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require('express-validator');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require("./app/models");
db.sequelize.sync()

// simple route
require("./app/routes/adherent.routes")(app);
require("./app/routes/trainer.routes")(app);
require("./app/routes/address.routes")(app);

/*app.get("/", (req, res) => {
    db.adherents.findByPk(1).then(data => {
        res.send(data)
    })
});*/

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});