module.exports = app => {
    const materials = require("../controllers/material.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", materials.create);
  
    // Retrieve all Tutorials
    router.get("/", materials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", materials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", materials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", materials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", materials.delete);
  
    // Delete all Tutorials
    router.delete("/", materials.deleteAll);
  
    app.use('/api/materials', router);
  };