module.exports = app => {
    const donations = require("../controllers/donation.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", donations.create);
  
    // Retrieve all Tutorials
    router.get("/", donations.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", donations.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", donations.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", donations.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", donations.delete);
  
    // Delete all Tutorials
    router.delete("/", donations.deleteAll);
  
    app.use('/api/donations', router);
  };