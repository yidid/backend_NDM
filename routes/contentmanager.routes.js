module.exports = app => {
    const contentmanagers = require("../controllers/content.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", contentmanagers.create);
  
    // Retrieve all Tutorials
    router.get("/", contentmanagers.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", contentmanagers.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", contentmanagers.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", contentmanagers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", contentmanagers.delete);
  
    // Delete all Tutorials
    router.delete("/", contentmanagers.deleteAll);
  
    app.use('/api/contentmanagers', router);
  };