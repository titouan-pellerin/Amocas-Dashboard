module.exports = app => {
    const adherents = require("../controllers/adherent.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", adherents.validate('create'), adherents.create);

    router.get("/", adherents.findAll);
    /*
        // Retrieve all published Tutorials
        router.get("/published", tutorials.findAllPublished);

        // Retrieve a single Tutorial with id
        router.get("/:id", tutorials.findOne);

        // Update a Tutorial with id
        router.put("/:id", tutorials.update);

        // Delete a Tutorial with id
        router.delete("/:id", tutorials.delete);

        // Delete all Tutorials
        router.delete("/", tutorials.deleteAll);
    */
    app.use('/api/users/adherents', router);
};