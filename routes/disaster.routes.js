module.exports = app => {
    const disasters = require("../controllers/disaster.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", disasters.create);
  
    // Retrieve all Tutorials
    router.get("/", disasters.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", disasters.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", disasters.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", disasters.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", disasters.delete);
  
    // Delete all Tutorials
    router.delete("/", disasters.deleteAll);
  
    app.use('/api/disasters', router);
  };