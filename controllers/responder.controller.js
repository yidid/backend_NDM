const db6= require("../models/index.responders.js");
const Responder =db6.responders;

// Create and Save a new Responder
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
   
  
    // Create a Responder
    const responder = new Responder({
        name:req.body.name,
        phone:req.body.phone,
        department:req.body.department,
        address:req.body.address,
    
     
    });
  
    // Save Responder in the database
    responder
      .save(responder)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Responder."
        });
      });
  };

// Retrieve all Responders from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};
   
  
    Responder.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving responders."
        });
      });

    
  };

// Find a single Responder with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Responder.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Responder with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Responder with id=" + id });
      });
  };

// Update a Responder by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Responder.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Responder with id=${id}. Maybe Responder was not found!`
          });
        } else res.send({ message: "Responder was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Responder with id=" + id
        });
      });
  };

// Delete a Responder with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Responder.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Responder with id=${id}. Maybe Responder was not found!`
          });
        } else {
          res.send({
            message: "Responder was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Responder with id=" + id
        });
      });
  };

// Delete all Responders from the database.
exports.deleteAll = (req, res) => {
    Responder.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Responders were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all responders."
        });
      });
  };

// Find all published Responders
exports.findAllPublished = (req, res) => {
    Responder.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving responders."
        });
      });
  };