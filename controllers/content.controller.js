const db7= require("../models/index.contentManagers.js");
const ContentManager = db7.contentManagers;

// Create and Save a new ContentManager
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a ContentManager
    const contentmanager = new ContentManager({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
    
     
    });
  
    // Save ContentManager in the database
    contentmanager
      .save(contentmanager)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ContentManager."
        });
      });
  };

// Retrieve all ContentManagers from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};
   
  
    ContentManager.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contentManagers."
        });
      });

    
  };

// Find a single ContentManager with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ContentManager.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found ContentManager with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving ContentManager with id=" + id });
      });
  };

// Update a ContentManager by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    ContentManager.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update ContentManager with id=${id}. Maybe ContentManager was not found!`
          });
        } else res.send({ message: "ContentManager was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ContentManager with id=" + id
        });
      });
  };

// Delete a ContentManager with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ContentManager.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete ContentManager with id=${id}. Maybe ContentManager was not found!`
          });
        } else {
          res.send({
            message: "ContentManager was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ContentManager with id=" + id
        });
      });
  };

// Delete all ContentManagers from the database.
exports.deleteAll = (req, res) => {
    ContentManager.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ContentManagers were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all contentManagers."
        });
      });
  };

// Find all published ContentManagers
exports.findAllPublished = (req, res) => {
    ContentManager.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contentManagers."
        });
      });
  };