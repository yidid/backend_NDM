module.exports = app => {
    const responders = require("../controllers/responder.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", responders.create);
  
    // Retrieve all Tutorials
    router.get("/", responders.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", responders.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", responders.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", responders.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", responders.delete);
  
    // Delete all Tutorials
    router.delete("/", responders.deleteAll);
  
    app.use('/api/responders', router);
  };