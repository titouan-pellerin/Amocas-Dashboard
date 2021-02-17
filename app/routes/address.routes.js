module.exports = app => {
    const addresses = require("../controllers/address.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.get("/", addresses.findAll);

    router.get("/:id", addresses.findOne);

    /*// Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);


    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
*/
    app.use('/api/users/adherents/addresses', router);
};